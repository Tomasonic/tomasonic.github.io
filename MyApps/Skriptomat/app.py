"""
Skriptomat — AI study script generator.
Gradio UI · Claude API · LlamaParse PDF extraction.
"""

import os
import re
import tempfile

import anthropic
import gradio as gr
from dotenv import load_dotenv
from llama_cloud_services import LlamaParse

from prompts import get_generate_prompt, get_edit_prompt, get_chat_prompt
from styles import get_style_choices, get_style_by_name, DEFAULT_STYLE, PRESETS

load_dotenv()

# ── State ────────────────────────────────────────────────────────────────────

_state = {
    "parsed_text": None,
    "pdf_name": None,
    "current_html": None,
    "history_api": [],      # messages sent to Claude API
}

MODELS = [
    ("Sonnet 4.6", "claude-sonnet-4-6"),
    ("Opus 4.6", "claude-opus-4-6"),
    ("Haiku 4.5", "claude-haiku-4-5"),
    ("Sonnet 3.5", "claude-3-5-sonnet-20241022"),
]

# ── Helpers ──────────────────────────────────────────────────────────────────

def clean_html(raw: str) -> str:
    c = re.sub(r"^```html\s*\n?", "", raw.strip(), flags=re.IGNORECASE)
    c = re.sub(r"^```\s*\n?", "", c, flags=re.MULTILINE)
    c = re.sub(r"\n?```\s*$", "", c).strip()
    m = re.search(r"(?is)(<!doctype\s+html|<html\b|<head\b|<body\b)", c)
    return c[m.start():].strip() if m else c.strip()


def is_html(text: str) -> bool:
    if not text or not text.strip():
        return False
    t = text.strip()
    if re.match(r"^```html", t, re.IGNORECASE):
        return True
    c = clean_html(t).lower()
    if re.match(r"(<!doctype\s+html|<html\b|<head\b)", c):
        return True
    tags = re.findall(
        r"<\s*(html|head|body|div|section|article|main|style|script|"
        r"table|tr|td|th|h1|h2|h3|p|ul|ol|li|blockquote|details|summary|span)\b", c)
    return len(tags) >= 8 and len(set(tags)) >= 5


def parse_pdf(file_path: str, llama_key: str, extract_images: bool = False) -> str:
    parser = LlamaParse(
        api_key=llama_key,
        result_type="markdown",
        extract_images=extract_images,
    )
    docs = parser.load_data(file_path)
    return "\n\n".join(d.text for d in docs)


def call_claude(api_key: str, model: str, system: str, messages: list,
                max_tokens: int = 64000) -> str:
    client = anthropic.Anthropic(api_key=api_key)
    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        system=system,
        messages=messages,
    )
    return response.content[0].text


def make_preview_html(html: str) -> str:
    """Wrap HTML for safe iframe preview."""
    return f'<iframe srcdoc="{gr.utils.sanitize_html_for_iframe(html)}" style="width:100%;height:600px;border:1px solid #e5e7eb;border-radius:8px;" sandbox="allow-scripts allow-same-origin"></iframe>'


# ── Core actions ─────────────────────────────────────────────────────────────

def upload_pdf(file, llama_key, extract_images):
    """Parse an uploaded PDF and store the text."""
    if file is None:
        return "No file selected.", _state["pdf_name"] or "No PDF loaded"
    if not llama_key:
        return "LlamaParse API key required. Enter it in Settings.", _state["pdf_name"] or "No PDF loaded"

    try:
        text = parse_pdf(file.name, llama_key, extract_images)
        _state["parsed_text"] = text
        _state["pdf_name"] = os.path.basename(file.name)
        return f"PDF '{_state['pdf_name']}' loaded — {len(text):,} characters extracted.", _state["pdf_name"]
    except Exception as e:
        return f"Error parsing PDF: {e}", _state["pdf_name"] or "No PDF loaded"


def remove_pdf():
    _state["parsed_text"] = None
    _state["pdf_name"] = None
    return "PDF removed.", "No PDF loaded"


def generate_script(api_key, model, style_name, chat_history):
    """Generate an HTML script from the loaded PDF."""
    if not api_key:
        chat_history.append(("", "Please enter your Anthropic API key in Settings."))
        return chat_history, None, None

    if not _state["parsed_text"]:
        chat_history.append(("", "Upload a PDF first so I have material to work with."))
        return chat_history, None, None

    system = get_generate_prompt(style_name)
    system += f"\n\n[MATERIAL]\n{_state['parsed_text']}"

    messages = [{"role": "user", "content": "Generate an HTML study script from the provided material."}]

    chat_history.append(("Generate script", "Generating your script..."))

    try:
        raw = call_claude(api_key, model, system, messages)
        html = clean_html(raw)
        _state["current_html"] = html
        _state["history_api"] = messages + [{"role": "assistant", "content": raw}]

        chat_history[-1] = ("Generate script", f"Script generated — {len(html):,} characters. Use the Preview and Download tabs to view/save it.")
        return chat_history, html, html
    except Exception as e:
        chat_history[-1] = ("Generate script", f"Error: {e}")
        return chat_history, None, None


def chat_message(user_msg, api_key, model, style_name, chat_history):
    """Handle a chat message — either fine-tune or normal conversation."""
    if not user_msg.strip():
        return chat_history, "", None, None
    if not api_key:
        chat_history.append((user_msg, "Please enter your Anthropic API key in Settings."))
        return chat_history, "", None, None

    # Detect generation intent
    gen_words = {"generiraj", "generate", "napravi", "create", "idi", "go", "potvrdi", "confirm"}
    is_gen = any(w in user_msg.lower().split() for w in gen_words) and _state["parsed_text"]

    # Detect edit intent
    has_script = _state["current_html"] is not None
    edit_words = {"izmijeni", "promijeni", "dodaj", "makni", "edit", "change", "add", "remove",
                  "update", "fix", "azuriraj", "ažuriraj", "povecaj", "smanji", "bold", "font"}
    is_edit = has_script and any(w in user_msg.lower() for w in edit_words)

    if is_gen and not has_script:
        # Generate from PDF
        return _do_generate(user_msg, api_key, model, style_name, chat_history)
    elif is_edit:
        # Edit existing script
        return _do_edit(user_msg, api_key, model, chat_history)
    else:
        # Normal chat
        return _do_chat(user_msg, api_key, model, chat_history)


def _do_generate(user_msg, api_key, model, style_name, chat_history):
    chat_history.append((user_msg, "Generating your script..."))

    system = get_generate_prompt(style_name)
    system += f"\n\n[MATERIAL]\n{_state['parsed_text']}"
    messages = [{"role": "user", "content": user_msg}]

    try:
        raw = call_claude(api_key, model, system, messages)
        html = clean_html(raw)
        _state["current_html"] = html
        _state["history_api"] = messages + [{"role": "assistant", "content": raw}]
        chat_history[-1] = (user_msg, f"Script generated — {len(html):,} characters. Check Preview and Download tabs.")
        return chat_history, "", html, html
    except Exception as e:
        chat_history[-1] = (user_msg, f"Error: {e}")
        return chat_history, "", None, None


def _do_edit(user_msg, api_key, model, chat_history):
    chat_history.append((user_msg, "Editing your script..."))

    system = get_edit_prompt(_state["current_html"])
    # Send only the edit instruction, not full history — saves tokens
    messages = [{"role": "user", "content": user_msg}]

    try:
        raw = call_claude(api_key, model, system, messages)
        if is_html(raw):
            html = clean_html(raw)
            _state["current_html"] = html
            chat_history[-1] = (user_msg, f"Script updated. Check Preview tab to see the changes.")
            return chat_history, "", html, html
        else:
            chat_history[-1] = (user_msg, raw.strip())
            return chat_history, "", None, None
    except Exception as e:
        chat_history[-1] = (user_msg, f"Error: {e}")
        return chat_history, "", None, None


def _do_chat(user_msg, api_key, model, chat_history):
    system = get_chat_prompt()
    if _state["parsed_text"]:
        # Send only first 2000 chars of PDF for context in chat — saves tokens
        system += f"\n\n[MATERIAL EXCERPT]\n{_state['parsed_text'][:2000]}"

    # Keep last 6 messages for chat context
    recent = _state["history_api"][-6:] if _state["history_api"] else []
    messages = recent + [{"role": "user", "content": user_msg}]

    try:
        raw = call_claude(api_key, model, system, messages)
        reply = raw.strip()

        # Update conversation history
        _state["history_api"].append({"role": "user", "content": user_msg})
        _state["history_api"].append({"role": "assistant", "content": reply})
        # Keep history bounded
        if len(_state["history_api"]) > 20:
            _state["history_api"] = _state["history_api"][-12:]

        chat_history.append((user_msg, reply))
        return chat_history, "", None, None
    except Exception as e:
        chat_history.append((user_msg, f"Error: {e}"))
        return chat_history, "", None, None


def save_html_file(html):
    """Save current HTML to a temp file for download."""
    if not html:
        return None
    tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".html",
                                      delete=False, encoding="utf-8",
                                      prefix="Skripta_")
    tmp.write(html)
    tmp.close()
    return tmp.name


def clear_chat():
    _state["history_api"] = []
    return [], None, None


def reset_all():
    _state["parsed_text"] = None
    _state["pdf_name"] = None
    _state["current_html"] = None
    _state["history_api"] = []
    return [], None, None, "No PDF loaded"


# ── Gradio UI ────────────────────────────────────────────────────────────────

THEME = gr.themes.Soft(
    primary_hue=gr.themes.colors.orange,
    secondary_hue=gr.themes.colors.purple,
    neutral_hue=gr.themes.colors.stone,
    font=gr.themes.GoogleFont("DM Sans"),
    font_mono=gr.themes.GoogleFont("DM Mono"),
)

with gr.Blocks(title="Skriptomat") as app:

    gr.Markdown("# Skriptomat\nAI study script generator — upload a PDF, pick a style, generate & fine-tune.")

    with gr.Row():
        # ── Left column: Settings ────────────────────────────────────────
        with gr.Column(scale=1, min_width=260):
            gr.Markdown("### Settings")

            with gr.Accordion("API Keys", open=True):
                api_key = gr.Textbox(
                    label="Anthropic API Key",
                    type="password",
                    placeholder="sk-ant-...",
                    value=os.getenv("ANTHROPIC_KEY", ""),
                )
                llama_key = gr.Textbox(
                    label="LlamaParse Key",
                    type="password",
                    placeholder="llx-... (for PDF parsing)",
                    value=os.getenv("LLAMA_KEY", ""),
                )

            with gr.Accordion("Model", open=True):
                model = gr.Dropdown(
                    choices=[name for name, _ in MODELS],
                    value="Sonnet 4.6",
                    label="Model",
                )

            with gr.Accordion("Script Style", open=True):
                style_choice = gr.Dropdown(
                    choices=get_style_choices(),
                    value=PRESETS[DEFAULT_STYLE]["name"],
                    label="Visual theme",
                )
                style_desc = gr.Markdown(
                    value=f"*{PRESETS[DEFAULT_STYLE]['description']}*"
                )

                def update_style_desc(name):
                    s = get_style_by_name(name)
                    return f"*{s['description']}*"

                style_choice.change(update_style_desc, style_choice, style_desc)

            with gr.Accordion("PDF Upload", open=True):
                pdf_upload = gr.File(
                    label="Upload PDF",
                    file_types=[".pdf"],
                    type="filepath",
                )
                extract_imgs = gr.Checkbox(
                    label="Extract images from PDF",
                    value=False,
                )
                with gr.Row():
                    load_pdf_btn = gr.Button("Load PDF", variant="primary", size="sm")
                    remove_pdf_btn = gr.Button("Remove PDF", size="sm")
                pdf_status = gr.Textbox(
                    label="PDF Status",
                    value="No PDF loaded",
                    interactive=False,
                )

            with gr.Row():
                clear_btn = gr.Button("Clear Chat", size="sm")
                reset_btn = gr.Button("Reset All", size="sm")

        # ── Right column: Chat + Output ──────────────────────────────────
        with gr.Column(scale=3):
            with gr.Tabs():
                with gr.TabItem("Chat"):
                    chatbot = gr.Chatbot(
                        label="Skriptomat",
                        height=480,
                        placeholder="Upload a PDF and chat to generate & fine-tune your script.",
                    )
                    with gr.Row():
                        msg_input = gr.Textbox(
                            label="Message",
                            placeholder="Ask a question, say 'generiraj' to create a script, or request changes...",
                            scale=5,
                            show_label=False,
                        )
                        send_btn = gr.Button("Send", variant="primary", scale=1)
                    gen_btn = gr.Button("Generate Script from PDF", variant="primary")

                with gr.TabItem("Preview"):
                    preview_html = gr.HTML(
                        label="Script Preview",
                        value="<p style='color:#999;text-align:center;padding:40px;'>No script generated yet.</p>",
                    )

                with gr.TabItem("Download"):
                    download_html = gr.Code(
                        label="HTML Source",
                        language="html",
                        interactive=True,
                    )
                    download_btn = gr.Button("Download .html", variant="primary")
                    download_file = gr.File(label="Your file", visible=True)

    # ── Helper to resolve model ID ───────────────────────────────────────
    model_map = {name: mid for name, mid in MODELS}

    def resolve_model(display_name):
        return model_map.get(display_name, "claude-sonnet-4-6")

    # ── Wire events ──────────────────────────────────────────────────────

    # PDF
    load_pdf_btn.click(
        fn=lambda f, lk, ei: upload_pdf(f, lk, ei),
        inputs=[pdf_upload, llama_key, extract_imgs],
        outputs=[pdf_status, pdf_status],
    )
    remove_pdf_btn.click(
        fn=remove_pdf,
        outputs=[pdf_status, pdf_status],
    )

    # Generate
    def on_generate(ak, m, s, history):
        mid = resolve_model(m)
        return generate_script(ak, mid, s, history)

    gen_btn.click(
        fn=on_generate,
        inputs=[api_key, model, style_choice, chatbot],
        outputs=[chatbot, preview_html, download_html],
    )

    # Chat / Edit
    def on_send(user_msg, ak, m, s, history):
        mid = resolve_model(m)
        new_history, cleared_input, new_preview, new_download = chat_message(
            user_msg, ak, mid, s, history
        )
        outputs = [new_history, cleared_input]
        if new_preview is not None:
            outputs.extend([new_preview, new_download])
        else:
            # Keep existing preview/download — return current state
            outputs.extend([gr.update(), gr.update()])
        return outputs

    send_btn.click(
        fn=on_send,
        inputs=[msg_input, api_key, model, style_choice, chatbot],
        outputs=[chatbot, msg_input, preview_html, download_html],
    )
    msg_input.submit(
        fn=on_send,
        inputs=[msg_input, api_key, model, style_choice, chatbot],
        outputs=[chatbot, msg_input, preview_html, download_html],
    )

    # Download
    download_btn.click(
        fn=save_html_file,
        inputs=[download_html],
        outputs=[download_file],
    )

    # Clear / Reset
    clear_btn.click(fn=clear_chat, outputs=[chatbot, preview_html, download_html])
    reset_btn.click(fn=reset_all, outputs=[chatbot, preview_html, download_html, pdf_status])


if __name__ == "__main__":
    app.launch(
        theme=THEME,
        css=".contain { max-width: 900px !important; margin: 0 auto !important; } footer { display: none !important; }",
    )

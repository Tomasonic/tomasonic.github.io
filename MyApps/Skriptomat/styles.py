"""
Style presets for generated HTML scripts.
Each preset is a dict with: name, description, css, and font_link.
"""

PRESETS = {
    "clean-academic": {
        "name": "Clean Academic",
        "description": "Classic textbook look — serif headings, clean spacing, blue accents",
        "font_link": '<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">',
        "css": """
body { max-width:860px; margin:0 auto; padding:36px 24px; font-family:'Inter',sans-serif; line-height:1.75; background:#fdfdfc; color:#1a1a1a; }
h1 { font-family:'Merriweather',serif; font-size:1.9rem; border-bottom:3px solid #2563eb; padding-bottom:10px; margin-top:32px; }
h2 { font-family:'Merriweather',serif; font-size:1.35rem; border-left:4px solid #7c3aed; padding-left:12px; margin-top:28px; }
h3 { font-size:1.1rem; color:#4338ca; margin-top:22px; }
.kljucni { color:#2563eb; font-weight:700; }
.koncept { color:#7c3aed; }
.primjer { color:#16a34a; font-style:italic; }
.definicija { color:#d9534f; font-weight:700; }
blockquote { background:#f0f4ff; border-left:5px solid #2563eb; padding:16px 20px; margin:20px 0; border-radius:6px; font-style:italic; }
table { width:100%; border-collapse:collapse; margin:20px 0; }
th { background:#2563eb; color:white; padding:11px 14px; text-align:left; font-size:0.9rem; }
td { padding:10px 14px; border-bottom:1px solid #e2e8f0; font-size:0.9rem; }
tr:nth-child(even) { background:#f8fafc; }
details { background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:12px 16px; margin:10px 0; }
summary { font-weight:700; cursor:pointer; color:#2563eb; }
.mermaid { overflow-x:auto; text-align:center; padding:20px; background:#fff; border-radius:10px; border:1px solid #e2e8f0; margin:24px 0; }
.print-btn { background:#2563eb; color:white; border:none; padding:8px 20px; border-radius:6px; cursor:pointer; font-size:0.85rem; margin-bottom:20px; }
.print-btn:hover { background:#1d4ed8; }
@media print { .print-btn { display:none; } }
""",
    },
    "warm-notes": {
        "name": "Warm Notes",
        "description": "Warm tones, rounded cards, cozy notebook feel",
        "font_link": '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">',
        "css": """
body { max-width:860px; margin:0 auto; padding:36px 24px; font-family:'DM Sans',sans-serif; line-height:1.75; background:#faf8f5; color:#1c1917; }
h1 { font-size:1.8rem; font-weight:700; border-bottom:3px solid #c4612a; padding-bottom:10px; margin-top:32px; color:#92400e; }
h2 { font-size:1.3rem; font-weight:600; border-left:4px solid #d97706; padding-left:12px; margin-top:28px; color:#78350f; }
h3 { font-size:1.05rem; color:#b45309; margin-top:22px; }
.kljucni { color:#c4612a; font-weight:700; }
.koncept { color:#7c3aed; }
.primjer { color:#15803d; font-style:italic; }
.definicija { color:#dc2626; font-weight:700; }
blockquote { background:#fef3c7; border-left:5px solid #d97706; padding:16px 20px; margin:20px 0; border-radius:8px; }
table { width:100%; border-collapse:collapse; margin:20px 0; }
th { background:#c4612a; color:white; padding:11px 14px; text-align:left; font-size:0.9rem; border-radius:0; }
td { padding:10px 14px; border-bottom:1px solid #e7e0d6; font-size:0.9rem; }
tr:nth-child(even) { background:#fdf8f0; }
details { background:#fffbf5; border:1px solid #e7e0d6; border-radius:10px; padding:12px 16px; margin:10px 0; }
summary { font-weight:700; cursor:pointer; color:#c4612a; }
.mermaid { overflow-x:auto; text-align:center; padding:20px; background:#fffbf5; border-radius:10px; border:1px solid #e7e0d6; margin:24px 0; }
.print-btn { background:#c4612a; color:white; border:none; padding:8px 20px; border-radius:8px; cursor:pointer; font-size:0.85rem; margin-bottom:20px; }
.print-btn:hover { background:#a84f22; }
@media print { .print-btn { display:none; } }
""",
    },
    "minimal-dark": {
        "name": "Minimal Dark",
        "description": "Dark background, high contrast, modern monospace accents",
        "font_link": '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">',
        "css": """
body { max-width:860px; margin:0 auto; padding:36px 24px; font-family:'IBM Plex Sans',sans-serif; line-height:1.75; background:#0f172a; color:#e2e8f0; }
h1 { font-size:1.8rem; font-weight:700; border-bottom:2px solid #38bdf8; padding-bottom:10px; margin-top:32px; color:#f0f9ff; }
h2 { font-size:1.3rem; font-weight:600; border-left:4px solid #818cf8; padding-left:12px; margin-top:28px; color:#c7d2fe; }
h3 { font-size:1.05rem; color:#67e8f9; margin-top:22px; }
.kljucni { color:#38bdf8; font-weight:700; }
.koncept { color:#a78bfa; }
.primjer { color:#4ade80; font-style:italic; }
.definicija { color:#fb923c; font-weight:700; }
blockquote { background:#1e293b; border-left:5px solid #38bdf8; padding:16px 20px; margin:20px 0; border-radius:6px; color:#cbd5e1; }
table { width:100%; border-collapse:collapse; margin:20px 0; }
th { background:#1e40af; color:white; padding:11px 14px; text-align:left; font-size:0.9rem; }
td { padding:10px 14px; border-bottom:1px solid #334155; font-size:0.9rem; color:#cbd5e1; }
tr:nth-child(even) { background:#1e293b; }
details { background:#1e293b; border:1px solid #334155; border-radius:8px; padding:12px 16px; margin:10px 0; }
summary { font-weight:700; cursor:pointer; color:#38bdf8; }
.mermaid { overflow-x:auto; text-align:center; padding:20px; background:#1e293b; border-radius:10px; border:1px solid #334155; margin:24px 0; }
.print-btn { background:#38bdf8; color:#0f172a; border:none; padding:8px 20px; border-radius:6px; cursor:pointer; font-size:0.85rem; font-weight:600; margin-bottom:20px; }
.print-btn:hover { background:#0ea5e9; }
@media print { .print-btn { display:none; } body { background:white; color:black; } }
""",
    },
    "colorful-cards": {
        "name": "Colorful Cards",
        "description": "Vibrant sections with colored card blocks, great for visual learners",
        "font_link": '<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">',
        "css": """
body { max-width:860px; margin:0 auto; padding:36px 24px; font-family:'Nunito',sans-serif; line-height:1.75; background:#fafafa; color:#1a1a1a; }
h1 { font-size:1.9rem; font-weight:800; background:linear-gradient(135deg,#6366f1,#8b5cf6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; padding-bottom:10px; margin-top:32px; }
h2 { font-size:1.3rem; font-weight:700; background:#f0f0ff; border-left:5px solid #6366f1; padding:10px 14px; border-radius:0 8px 8px 0; margin-top:28px; color:#3730a3; }
h3 { font-size:1.05rem; color:#7c3aed; margin-top:22px; font-weight:700; }
.kljucni { color:#2563eb; font-weight:700; }
.koncept { color:#7c3aed; }
.primjer { color:#059669; font-style:italic; }
.definicija { color:#dc2626; font-weight:700; }
blockquote { background:linear-gradient(135deg,#eff6ff,#f5f3ff); border-left:5px solid #6366f1; padding:16px 20px; margin:20px 0; border-radius:8px; }
table { width:100%; border-collapse:separate; border-spacing:0; margin:20px 0; border-radius:10px; overflow:hidden; box-shadow:0 1px 8px rgba(0,0,0,0.06); }
th { background:linear-gradient(135deg,#6366f1,#8b5cf6); color:white; padding:12px 14px; text-align:left; font-size:0.9rem; }
td { padding:10px 14px; border-bottom:1px solid #e5e7eb; font-size:0.9rem; }
tr:nth-child(even) { background:#f9fafb; }
details { background:#fff; border:1px solid #e5e7eb; border-radius:10px; padding:12px 16px; margin:10px 0; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
summary { font-weight:700; cursor:pointer; color:#6366f1; }
.mermaid { overflow-x:auto; text-align:center; padding:20px; background:#fff; border-radius:12px; border:1px solid #e5e7eb; margin:24px 0; box-shadow:0 1px 6px rgba(0,0,0,0.04); }
.print-btn { background:linear-gradient(135deg,#6366f1,#8b5cf6); color:white; border:none; padding:8px 22px; border-radius:8px; cursor:pointer; font-size:0.85rem; font-weight:600; margin-bottom:20px; }
.print-btn:hover { opacity:0.9; }
@media print { .print-btn { display:none; } }
""",
    },
    "textbook": {
        "name": "Textbook",
        "description": "Traditional textbook layout — numbered sections, formal, print-ready",
        "font_link": '<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet">',
        "css": """
body { max-width:860px; margin:0 auto; padding:36px 24px; font-family:'Source Sans 3',sans-serif; line-height:1.8; background:#fff; color:#111; }
h1 { font-family:'Source Serif 4',serif; font-size:2rem; font-weight:700; border-bottom:2px solid #111; padding-bottom:8px; margin-top:36px; }
h2 { font-family:'Source Serif 4',serif; font-size:1.4rem; font-weight:600; margin-top:30px; padding-bottom:4px; border-bottom:1px solid #ccc; }
h3 { font-size:1.1rem; font-weight:600; margin-top:22px; color:#333; }
.kljucni { color:#1e40af; font-weight:700; }
.koncept { color:#5b21b6; }
.primjer { color:#166534; font-style:italic; }
.definicija { color:#991b1b; font-weight:700; }
blockquote { background:#f9fafb; border-left:4px solid #6b7280; padding:14px 20px; margin:20px 0; border-radius:2px; color:#374151; font-style:italic; }
table { width:100%; border-collapse:collapse; margin:20px 0; border:1px solid #d1d5db; }
th { background:#f3f4f6; color:#111; padding:10px 14px; text-align:left; font-size:0.9rem; border:1px solid #d1d5db; font-weight:600; }
td { padding:9px 14px; border:1px solid #d1d5db; font-size:0.9rem; }
tr:nth-child(even) { background:#f9fafb; }
details { background:#fafafa; border:1px solid #d1d5db; border-radius:4px; padding:10px 16px; margin:10px 0; }
summary { font-weight:600; cursor:pointer; color:#1e40af; }
.mermaid { overflow-x:auto; text-align:center; padding:20px; background:#fafafa; border-radius:4px; border:1px solid #d1d5db; margin:24px 0; }
.print-btn { background:#111; color:white; border:none; padding:8px 20px; border-radius:4px; cursor:pointer; font-size:0.85rem; margin-bottom:20px; }
.print-btn:hover { background:#333; }
@media print { .print-btn { display:none; } }
""",
    },
}

DEFAULT_STYLE = "clean-academic"


def get_style_names() -> list[str]:
    return list(PRESETS.keys())


def get_style_choices() -> list[str]:
    """Return display names for the dropdown."""
    return [p["name"] for p in PRESETS.values()]


def get_style_by_name(display_name: str) -> dict:
    """Look up a preset by its display name."""
    for preset in PRESETS.values():
        if preset["name"] == display_name:
            return preset
    return PRESETS[DEFAULT_STYLE]


def get_style_by_key(key: str) -> dict:
    """Look up a preset by its dict key."""
    return PRESETS.get(key, PRESETS[DEFAULT_STYLE])


def build_style_block(preset: dict) -> str:
    """Return the font link + <style> block for injection into HTML."""
    return f'{preset["font_link"]}\n<style>\n{preset["css"].strip()}\n</style>'

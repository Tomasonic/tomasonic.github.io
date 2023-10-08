// const questionBTNS = document.querySelectorAll('.question-btn');


const questions = document.querySelectorAll('.question');

questions.forEach(function (question) {
    const btn = question.querySelector('.question-btn');
    btn.addEventListener('click', () => {
        questions.forEach((article) => {
            if (article !== question) {
                article.classList.remove('show-text');
            }
        })
        question.classList.toggle('show-text');
    })
});

// questionBTNS.forEach((btns) => {
//     btns.addEventListener('click', (e) => {
//         const question = e.currentTarget.parentElement.parentElement;
//         question.classList.toggle('show-text');
//     })
// })
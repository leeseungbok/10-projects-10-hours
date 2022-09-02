const quizData_d_l = [
    {
        question: 'what color is the sith lightsaber?',
        a: 'green',
        b: 'blue',
        c: 'red',
        d: 'purple',
        correct:'c' 
    },
    {
        question: "what is the minbok lee real name?",
        a: "manbok",
        b: "chijill",
        c: "minbook",
        d: "ddongko",
        correct: "d"
    }
]

let curQuiz_i = 0;
let score_i = 0;

const app = document.querySelector(".quiz_app");
const question_h2 = app.querySelector(".question_h2");
const a_lab = app.querySelector(".example_a_label");
const b_lab = app.querySelector(".example_b_label");
const c_lab = app.querySelector(".example_c_label");
const d_lab = app.querySelector(".example_d_label");

const submit_btn = app.querySelector(".quizSubmit_btn");
const answer_rb_l = app.querySelectorAll(".answer_rb");

function makeup_question() {
    // LSB
    const quiz_d = quizData_d_l[curQuiz_i];
    question_h2.innerText = quiz_d.question;
    a_lab.innerText = quiz_d.a;
    b_lab.innerText = quiz_d.b;
    c_lab.innerText = quiz_d.c;
    d_lab.innerText = quiz_d.d;

    clearUserSelect();
}

function clearUserSelect() {
    answer_rb_l.forEach((answer_rb) => {
        answer_rb.checked = false;
    });
}

function getUserSelect() {
    let answer_s = undefined;
    answer_rb_l.forEach((answer_rb) => {
        if(answer_rb.checked) {
            answer_s = answer_rb.id;
        }
    });
    return answer_s;
}

submit_btn.addEventListener("click", (event) => {
    const userAnswer_s = getUserSelect();
    if (userAnswer_s === undefined) {
        alert("답을 먼저 선택하시오");
        return;
    }

    const quiz_d = quizData_d_l[curQuiz_i];
    if (userAnswer_s === quiz_d.correct) {
        console.log("맞았어요!!");
        score_i++;
    } else {
        console.log("틀렸어요!!");
    }

    curQuiz_i++;

    if (curQuiz_i < quizData_d_l.length) {
        makeup_question();
    } else {
        const quiz_div = document.querySelector(".quiz_app");
        quiz_div.innerHTML = `
        <h2>You answered correctly at ${score_i}/${quizData_d_l.length} question </h2>
        <button onclick="location.reload()">Reload</button>
        `;
    }   
});

makeup_question();
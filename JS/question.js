const questionNumber = document.querySelector(".questionNumber");
const timer = document.querySelector(".timer");
const questionHeading = document.querySelector(".questionHeading");
const choiceContainer = document.querySelector(".choice-container");
const optionWarning = document.querySelector(".option-warning");
const progressBar = document.getElementById("progress-bar");
const nextButton = document.querySelector(".next");
const secret = "quiz-app";

const questionData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Machine Language"],
        answer: CryptoJS.AES.encrypt("Hyper Text Markup Language", secret).toString()
    },
    {
        question: "What is the correct HTML element for the largest heading?",
        options: ["<h1>", "<head>", "<heading>", "<h6>"],
        answer: CryptoJS.AES.encrypt("<h1>", secret).toString()
    },
    {
        question: "Is JavaScript case-sensitive?",
        options: ["True", "False"],
        answer: CryptoJS.AES.encrypt("True", secret).toString()
    },
    {
        question: "Which CSS property is used to change the background color?",
        options: ["background-color", "color", "bgcolor", "background"],
        answer: CryptoJS.AES.encrypt("background-color", secret).toString()
    },
    {
        question: "Does CSS stand for 'Cascading Style Sheets'?",
        options: ["True", "False"],
        answer: CryptoJS.AES.encrypt("True", secret).toString()
    },
    {
        question: "Which is the correct CSS syntax?",
        options: ["body {color: black;}", "{body;color:black;}", "body:color=black;", "{body:color=black;}"],
        answer: CryptoJS.AES.encrypt("body {color: black;}", secret).toString()
    },
    {
        question: "Is HTML a programming language?",
        options: ["True", "False"],
        answer: CryptoJS.AES.encrypt("False", secret).toString()
    },
    {
        question: "Is CSS used to style web pages?",
        options: ["True", "False"],
        answer: CryptoJS.AES.encrypt("True", secret).toString()
    },
    {
        question: "How do you add a background color for all <h1> elements?",
        options: ["h1 {background-color:#FFFFFF;}", "h1.all {background-color:#FFFFFF;}", "all.h1 {background-color:#FFFFFF;}", "h1 {bgcolor:#FFFFFF;}"],
        answer: CryptoJS.AES.encrypt("h1 {background-color:#FFFFFF;}", secret).toString()
    },
    {
        question: "Is HTML5 the latest version of HTML?",
        options: ["True", "False"],
        answer: CryptoJS.AES.encrypt("True", secret).toString()
    }
];


let currentQuestion = 0;
let maxTimerCounter = 15;
let score = 0;
let timerInterval;
let answers = [];

nextButton.addEventListener("click", (e) => {
    const inputSelector = document.querySelector('input[name="option"]:checked');
    
    if (!inputSelector) {
        optionWarning.hidden = false;
        return;
    }
    optionWarning.hidden = true;
    updateProgressBar();
    updateScore(inputSelector.value);
    currentQuestion++;
    if (currentQuestion < questionData.length) {
        showQuestion();
        resetTimer();
    } else {
        endQuiz();
    }
});

function showQuestion() {
    const question = questionData[currentQuestion];
    questionNumber.innerText = currentQuestion + 1;
    questionHeading.innerText = question.question;
    choiceContainer.innerHTML = '';

    const options = question.options;

    options.forEach((option, index) => {
        const choice = document.createElement('label');
        choice.setAttribute('for', `option-${index}`);
        choice.classList.add('choice');

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.value = index;
        input.id = `option-${index}`;
        input.classList.add('choice-input');

        const text = document.createElement('div');
        text.classList.add('choice-text');
        text.textContent = option;

        choice.appendChild(input);
        choice.appendChild(text);

        choiceContainer.appendChild(choice);
    });
}

function setTimer() {
    let time = maxTimerCounter;
    timerInterval = setInterval(() => {
        if (time <= 0) {
            timer.innerText = time;
            clearInterval(timerInterval);
            updateScore(null);  // Treat as incorrect answer
            currentQuestion++;
            if (currentQuestion < questionData.length) {
                updateProgressBar();
                showQuestion();
                resetTimer();
            } else {
                endQuiz();
            }
        } else {
            timer.innerText = time;
            time--;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    setTimer();
}

function updateScore(selectedValue) {
    const encryptedAnswer = questionData[currentQuestion].answer;
    const decryptedAnswer = CryptoJS.AES.decrypt(encryptedAnswer, secret).toString(CryptoJS.enc.Utf8);
    if (selectedValue != null && questionData[currentQuestion].options[selectedValue] === decryptedAnswer) {
        score += 10;
    }
    
    const answerData = {
        question: questionData[currentQuestion].question,
        selected: selectedValue != null ? questionData[currentQuestion].options[selectedValue] : "Not Selected",
        answer: decryptedAnswer
    };
    answers.push(answerData);
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questionData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function endQuiz() {
    clearInterval(timerInterval);
    localStorage.setItem("score", score);
    localStorage.setItem("answers", JSON.stringify(answers));
    window.location.assign('../HTML/score.html');
}

function start() {
    localStorage.clear();
    showQuestion();
    setTimer();
}

start();

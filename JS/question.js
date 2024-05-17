const questionNumber = document.querySelector(".questionNumber");
const timer = document.querySelector(".timer");
const questionHeading = document.querySelector(".questionHeading");
const choiceContainer = document.querySelector(".choice-container");
const optionWarning = document.querySelector(".option-warning");
const progressBar= document.getElementById("progress-bar");

const nextButton = document.querySelector(".next");
const questionData = [
    {
        question: "Is the Earth flat?",
        options: ["True", "False"],
        answer: "False"
    },
    {
        question: "Is JavaScript a programming language?",
        options: ["True", "False"],
        answer: "True"
    },
    {
        question: "Is Paris the capital of France?",
        options: ["True", "False"],
        answer: "True"
    },
    {
        question: "Is the sun a planet?",
        options: ["True", "False"],
        answer: "False"
    },
    {
        question: "Is 2 + 2 equal to 5?",
        options: ["True", "False"],
        answer: "False"
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which of the following is a programming language?",
        options: ["HTML", "CSS", "JavaScript", "JSON"],
        answer: "JavaScript"
    },
    {
        question: "Who is the CEO of Tesla?",
        options: ["Elon Musk", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"],
        answer: "Elon Musk"
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        options: ["Tiger", "Lion", "Elephant", "Giraffe"],
        answer: "Lion"
    },
    {
        question: "What is the capital city of Japan?",
        options: ["Beijing", "Tokyo", "Seoul", "Shanghai"],
        answer: "Tokyo"
    }
];


let currentQuestion = 0;
let maxTimerCounter = 15;
let score = 0;
let timerInterval;
let answers=[];

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
        const choice = document.createElement('div');
        choice.classList.add('choice');

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.value = index;
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
    if (selectedValue != null && questionData[currentQuestion].options[selectedValue] === questionData[currentQuestion].answer) {
        score += 10;
        const answerData ={
            question:questionData[currentQuestion].question,
            selected:questionData[currentQuestion].options[selectedValue],
            answer:questionData[currentQuestion].answer,
        }
        answers.push(answerData );
    }
    else if(selectedValue != null && questionData[currentQuestion].options[selectedValue] !== questionData[currentQuestion].answer){
        const answerData ={
            question:questionData[currentQuestion].question,
            selected:questionData[currentQuestion].options[selectedValue],
            answer:questionData[currentQuestion].answer,
        }
        answers.push(answerData );
    }
    else {
        const answerData ={
            question:questionData[currentQuestion].question,
            selected:"Not Selected",
            answer:questionData[currentQuestion].answer,
        }
        answers.push(answerData );
    }
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questionData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function endQuiz() {
    clearInterval(timerInterval);
    localStorage.setItem("score",score);
    localStorage.setItem("answers", JSON.stringify(answers));
    window.location.assign('../HTML/end.html');
}

function start() {
    localStorage.clear();
    showQuestion();
    setTimer();
}

start();

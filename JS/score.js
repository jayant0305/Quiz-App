const restartButton=document.querySelector(".restart");
const scoreText=document.getElementById("score");
const showAnswer=document.querySelector(".show-answer");
const answersElement = document.getElementById('answers');
const answerSection=document.querySelector(".answer-section");
const answers = JSON.parse(localStorage.getItem('answers'));
const container = document.querySelector('.container');
const body = document.querySelector('body');
const exit=document.querySelector('.exit');

let isShowed=false;
restartButton.addEventListener("click" ,()=>{
    window.location.assign('../index.html');
})

showAnswer.addEventListener("click",()=>{
    if(isShowed)return;
    answers.forEach(answer => {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer-item');
        answerDiv.innerHTML = `<p>Question: ${answer.question}</p>
                               <p>Your Answer: ${answer.selected}</p>
                               <p>Correct Answer: ${answer.answer}</p>`;
        answersElement.appendChild(answerDiv);
    });
    answerSection.hidden=false;
    isShowed=true;
    container.classList.add('full-width');
    body.classList.add('update-body');
})

exit.addEventListener("click", ()=>{
    window.location.assign('./end.html')
})
function score(){
    console.log(window.localStorage.getItem('score'))
    scoreText.innerText = window.localStorage.getItem('score');
}
score();
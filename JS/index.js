const startButton = document.querySelector(".start-button");
const quit=document.querySelector(".quit");
const infoBox = document.querySelector(".instruction-box");
const continueButton=document.querySelector(".continue");
const h1=document.querySelector('h1');

startButton.addEventListener("click", (e) => {
    infoBox.classList.add("activeInfo");
    startButton.hidden=true;
    h1.hidden=true;
});

quit.addEventListener("click",(e)=>{
    window.location.reload();
})

continueButton.addEventListener("click",(e)=>{
    window.location.assign('../HTML/questions.html');
})
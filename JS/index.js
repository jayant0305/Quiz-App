const startButton = document.querySelector(".start-button");
const quit=document.querySelector(".quit");
const infoBox = document.querySelector(".instruction-box");
const continueButton=document.querySelector(".continue");

startButton.addEventListener("click", (e) => {
    infoBox.classList.add("activeInfo");
    startButton.hidden=true;
});

quit.addEventListener("click",(e)=>{
    window.location.reload();
})

continueButton.addEventListener("click",(e)=>{
    window.location.assign('../HTML/questions.html');
})
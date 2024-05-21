export const secret = "quiz-app";
export const questionData = [
    {
        question: "A function must return a value in Javascript?",
        options: ["True", "False"],
        answer: CryptoJS.AES.encrypt("False", secret).toString()
    },
    {
        question: "Javascript is an _______ language?",
        options: ["Object-Oriented", "Object-Based", "Procedural", "None of these"],
        answer: CryptoJS.AES.encrypt("Object-Oriented", secret).toString()
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
        question: "Which function is used to serialize an object into a JSON string in Javascript?",
        options: ["stringify()", "parse()","convert()","None of these"],
        answer: CryptoJS.AES.encrypt("stringify()", secret).toString()
    },
    {
        question: "Is CSS used to style web pages?",
        options: ["True", "False"],
        answer: CryptoJS.AES.encrypt("True", secret).toString()
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        options: ["const", "var","let","constant"],
        answer: CryptoJS.AES.encrypt("const", secret).toString()
    },
    {
        question: "Is HTML5 the latest version of HTML?",
        options: ["True", "False"],
        answer: CryptoJS.AES.encrypt("True", secret).toString()
    }
];
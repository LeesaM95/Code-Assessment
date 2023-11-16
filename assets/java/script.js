//Variables
var timerElm = document.getElementById("time");
var myScores = document.getElementById("score");
var startBtn = document.getElementById("btn-start");
var winCount = 0;
var LossCount = 0;
var isWin = false;
var sec = 30;
var qNum = 0;
var answers = [];

//Consts
const output = [];
const quizContainer = document.querySelector('.quiz-info');
const resultBtn = document.getElementById('results');
const submitBtn = document.getElementById('submit');
const myQuestions = [
    {
        question: "Arrays in Javascript can be used to store: ",
        answers: {
            a: "Numbers and strings",
            b: "Other arrays",
            c: "Booleans",
            d: "All of the above"
        },
        correctAnswer: "d",
    },
    {
        question: "Commonly used data types do NOT include: ",
        answers: {
            a: "Strings",
            b: "Booleans",
            c: "Alerts",
            d: "Numbers",
        },
        correctAnswer: "c",
    },
    {
        question: "The condition of an if/else statement is contained within: ",
        answers: {
            a: "Quotes",
            b: "Curly Brackets",
            c: "Parentheses",
            d: "Square Brackets",
        },
        correctAnswer: "c",
    },
    {
        question: "String values must be enclosed within ____ when being assigned variables.",
        answers: {
            a: "Commas",
            b: "Curly Brackets",
            c: "Parentheses",
            d: "Quotations",
        },
        correctAnswer: "c",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is",
        answers: {
            a: "Javascript",
            b: "Terminal/GitBash",
            c: "for Loops",
            d: "console.log",
        },
        correctAnswer: "d",
    },
];

//Functions


//function for the timer
function startTimer() {
    //set the timer
    timer = setInterval(function () {
        timerCount--;
        timerElm.textContent = timerCount;
        if (timerCount >= 0) {
            //tests if win condit is met
            if (isWin && timerCount > 0) {
                clearInterval(timer);
                winGame();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            // loseGame();
        }
    }, 1000);
}


//start the test. calls it when the start button is pressed
function startQuiz() {
    isWin = false;
    timerCount = 30;
    console.log('startQuiz');
    //prevent the start button from being clicked when the quiz starts

    startBtn.disabled = true;
    buildQuiz();
    startTimer();
};


//function for the quiz
function buildQuiz() {
    //variable to store the HTML output


    //for each question
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            // qNum++;
            // variable to store the list of possible answers
            answers = []
            // and for each available answer
            for (letter in currentQuestion.answers) {

                // add an HTML radio button
                answers.push(
                    `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}" onclick="showNextQuestion('${letter}')">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`,
                );

            };

            // adding this question and its answers to the output
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>
                <div class="feedbackCont"></div>`
            );

        }
    );
    //finally combine our output list into one string of HTML to put it on the page
    // quizContainer.innerHTML = output[0];
    showNextQuestion();
};

function showNextQuestion(value) {


    if (output.length === qNum) {
        // run End Quiz Logic
        // show highscore and input to enter initials
    } else {
        //if not last question, we want it to go to the next question
        quizContainer.innerHTML = output[qNum];
        //if the answer is correct

        if (!value) return;
        if (value === myQuestions[qNum].correctAnswer) {
            //add to the number of right answers
            winCount++;

            document.querySelector(".feedbackCont").textContent = "Correct!"
            document.querySelector(".feedbackCont").setAttribute("style", "font-size: 11px; font-style: italic; color: #D3D3D3;");
        } else {
            document.querySelector(".feedbackCont").textContent = "Wrong!"
            document.querySelector(".feedbackCont").setAttribute("style", "font-size: 11px; font-style: italic; color: #D3D3D3;");
            timerCount -= 5;
        };
    };
    qNum++;
};


startBtn.addEventListener('click', startQuiz);
// //on submit, show results
// submitButton.addEventListener('click', showResults);
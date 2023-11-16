//Variables
var timerElm = document.querySelector(".time");
var myScores = document.getElementById("score");
var startBtn = document.getElementById("btn-start");
// var wins
// var losses
var winCount = 0;
var LossCount = 0;
var isWin = false;
var timer;
var timerCount
var sec = 30;


//Consts
const quizContainer = document.getElementById('quiz');
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
            loseGame();
        }
    }, 3000);
}


//start the test. calls it when the start button is pressed
function startQuiz() {
    isWin = false;
    timerCount = 30;

    //prevent the start button from being clicked when the quiz starts

    startBtn.disabled = true;
    buildQuiz();
    startTimer();
};


//function for the quiz
function buildQuiz() {
    //variable to store the HTML output
    const output = [];

    //for each question
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            // variable to store the list of possible answers
            const answers = [];

            // and for each available answer
            for (letter in currentQuestion.answers) {

                // add an HTML radio button
                answers.push(
                    `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`,
                );
            }
            // adding this question and its answers to the output
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );
    //finally combine our output list into one string of HTML to put it on the page
    quizContainer.innerHTML = output.join('');
};


//Showing the results
function showResults(event) {
    event.preventDefault();
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    
    myQuestions.forEach((currentQuestion, questionNumber) => {
        //code to run for each question
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        //if the answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            //add to the number of right answers
            numCorrect++;

            answerContainers[questionNumber].textContent = "Correct!".setAttribute("style", "font-size: 11px; font-style: italic; color: #D3D3D3;");
        } else {
            answerContainers[questionNumber].textContent = "Wrong!".setAttribute("style", "font-size: 11px; font-style: italic; color: #D3D3D3;");
            count = count - 10;
        }
    });

    resultsContainer.innerHTML = `&{numCorrect} out of &{myQuestions.length}`;
};


// //on submit, show results
// submitButton.addEventListener('click', showResults);
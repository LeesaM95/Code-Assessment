//Variables
var timerElm = document.getElementById("time");
var startBtn = document.getElementById("btn-start");
var winCount = 0;
var isWin = false;
var sec = 30;
var qNum = 0;
var answers = [];


//Consts
const output = [];
const quizContainer = document.querySelector('.quiz-info');
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




//function for the timer
function startTimer() {
  
    timer = setInterval(function () {
        timerCount--;
        timerElm.textContent = timerCount;
        if (timerCount >= 0) {
           
            if (isWin && timerCount > 0) {
                clearInterval(timer);
                winGame();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
        }
    }, 1000);
}


//start the test. calls it when the start button is pressed
function startQuiz() {
    isWin = false;
    timerCount = 30;
    console.log('startQuiz');

    startBtn.disabled = true;
    buildQuiz();
    startTimer();
};


//function for the quiz
function buildQuiz() {

    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
           
            answers = []
      
            for (letter in currentQuestion.answers) {

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
    showNextQuestion();
};

function showNextQuestion(value) {

    if (output.length === qNum) {
        endGame();
        return;
    } else {
        quizContainer.innerHTML = output[qNum];

        if (!value) return;
        if (value === myQuestions[qNum].correctAnswer) {
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
    setTimeout(showNextQuestion, 600)
};

function endGame() {
    let initScore = {
        initials: document.getElementById("#userInitials").value,
        score: winCount
    };

        var template = `<h4>Your score is ${winCount}</h4> <input type= "text" id="userInitials" placeholder="Submit your Initials" /> 
        <button class="initialBtn" onclick="userScore()">Submit</button>`
        quizContainer.innerHTML = template;

        localStorage.setItem('User Initials and Score', JSON.stringify(initScore));
 }       

function userScore() {
          if(isWin == true) {
            return endGame();
          } else {
            return startQuiz();
          }
        };


startBtn.addEventListener('click', startQuiz);



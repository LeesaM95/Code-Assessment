var scoreBoard = document.getElementById("scoreBoard");
var backBtn = document.getElementById("btn-bk");

// Retrieve the saved scores
var highScores = localStorage.getItem("highScores");
highScores = JSON.parse(highScores);

if (highScores !== null) {
    for (var i = 0; i < highScores.length; i++) {
        var scoreList = document.createElement("li");
        scoreList.textContent = highScores[i].initials + " " + highScores[i].score;
        highScores.appendChild(scoreList);
    }
};

backBtn.addEventListener("click", function () {
    window.location.replace("./index.html");
});
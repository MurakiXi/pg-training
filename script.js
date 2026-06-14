//1.配列の作成
const questions = [
    {
    statement: "水を熱し続けると、水は何になって空気中へ出ていくでしょうか？",
    correctAnswer: "水蒸気",
    reasonText: "水を熱し続けると、水は気体になって空気中へ出ていきます。この気体になった水を水蒸気と呼びます。",
    choices: ["氷", "水蒸気", "砂", "光"]
},
    {
    statement: "乾電池の＋極と－極を導線でつなぎ、回路ができると何が流れるでしょうか？",
    correctAnswer: "電気",
    reasonText: "乾電池の＋極と－極をつなぐと電気の通り道ができ、電気が流れます。",
    choices: ["電気", "水", "空気", "光"],
    }
];
const questionCount = questions.length;

//2.変数の作成
let currentQuestionIndex = 0;
let isAnswered = false;
let score = 0;
let answeredCount = 0;

//3.要素の取得
const answerButtons = document.querySelectorAll(".answer-button");
const statement = document.querySelector("#statement")
const result = document.querySelector("#result");
const reason = document.querySelector("#reason");
const nextButton = document.querySelector("#next-button");
const progress = document.querySelector("#progress");
const quizScore = document.querySelector("#quiz-score");


//4.関数の自作
function renderQuestion(question) {
    statement.textContent = question.statement;
    answerButtons.forEach(function (answerButton, index) {
        answerButton.textContent = question.choices[index];
    });
    renderProgress();
}

function renderProgress() {
    const progressMessage = `第${currentQuestionIndex + 1}問／全${questions.length}問`;
    progress.textContent = progressMessage;
}

function renderScore() {
    const scoreMessage = `現在：${score}点／回答：${answeredCount}問`;
    quizScore.textContent = scoreMessage;
}

function getCurrentQuestion() {
    return questions[currentQuestionIndex];
}

function hasNextQuestion() {
    if (currentQuestionIndex < questionCount - 1) {
        return true;
    } else {
        return false;
    }
}

function isCorrectAnswer(answerText, question) {
    if (answerText === question.correctAnswer) {
        return true;
    } else {
        return false;
    }
}

function showResult(judge, explanation) {
    result.textContent = judge;
    reason.textContent = explanation;
}

function clearFeedback() {
    result.textContent = "";
    reason.textContent = "";
}

function disableAnswerButtons() {
    answerButtons.forEach(function (answerButton) {
        answerButton.disabled = true;
    });
}

function enableAnswerButtons() {
    answerButtons.forEach(function (answerButton) {
        answerButton.disabled = false;
    });
}

//5.関数の呼び出し
renderQuestion(getCurrentQuestion());
renderScore();

//6.イベントリスナー設定
answerButtons.forEach(function (answerButton) {
    answerButton.addEventListener("click", function (event) {
        if (!isAnswered){
            const answerText = event.target.textContent.trim();
            const currentQuestion = getCurrentQuestion();
            const isCorrect = isCorrectAnswer(answerText, currentQuestion);
            
            if (isCorrect) {
                showResult("正解！", currentQuestion.reasonText);
                score++;
            } else {
                showResult("残念！", currentQuestion.reasonText);
            }

            isAnswered = true;
            answeredCount++;
            disableAnswerButtons();
            renderScore();
        }
    });
});

nextButton.addEventListener("click", function () {
    if (isAnswered) {
        if (hasNextQuestion()) {
            currentQuestionIndex++;
            renderQuestion(getCurrentQuestion());
            clearFeedback();
            isAnswered = false;
            enableAnswerButtons();
        } else {
            showResult("クイズ終了！", "おつかれさまでした。");
        }
    } else {
        reason.textContent = "回答してから次に進んでください";
    }
});

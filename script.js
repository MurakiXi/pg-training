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
const questionCount = questions.length

//2.変数の作成
let currentQuestionIndex = 0;

//3.要素の取得
const answerButtons = document.querySelectorAll(".answer-button");
const statement = document.querySelector("#statement")
const result = document.querySelector("#result");
const reason = document.querySelector("#reason");
const nextButton = document.querySelector("#next-button");

//4.関数の自作
function renderQuestion(question) {
    statement.textContent = question.statement;
    answerButtons.forEach(function (answerButton, index) {
        answerButton.textContent = question.choices[index];
    });
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

//5.関数の呼び出し
renderQuestion(questions[currentQuestionIndex]);

//5.イベントリスナー設定
answerButtons.forEach(function (answerButton) {
    answerButton.addEventListener("click", function (event) {
        const answerText = event.target.textContent.trim();
        const isCorrect = isCorrectAnswer(answerText, questions[currentQuestionIndex]);
        if (isCorrect) {
            showResult("正解！", questions[currentQuestionIndex].reasonText);
        } else {
            showResult("残念！", questions[currentQuestionIndex].reasonText);
        }
    });
});

nextButton.addEventListener("click", function () {
    if (currentQuestionIndex < questionCount - 1) {
        currentQuestionIndex++;
        renderQuestion(questions[currentQuestionIndex]);
        clearFeedback();
    } else {
        reason.textContent = "最後の問題です";
    }
});

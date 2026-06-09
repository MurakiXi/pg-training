//1.オブジェクトの作成
const questionData = {
    statement: "水を熱し続けると、水は何になって空気中へ出ていくでしょうか？",
    correctAnswer: "水蒸気",
    reasonText: "水を熱し続けると、水は気体になって空気中へ出ていきます。この気体になった水を水蒸気と呼びます。",
    choices: ["氷", "水蒸気", "砂", "光"],
};

//2.要素の取得
const answerButtons = document.querySelectorAll(".answer-button");
const statement = document.querySelector("#statement")
const result = document.querySelector("#result");
const reason = document.querySelector("#reason");

//3.関数の自作
function renderQuestion(question) {
    statement.textContent = question.statement;
    answerButtons.forEach(function (answerButton, index) {
        answerButton.textContent = question.choices[index]
    });
}

function showResult(judge, explanation) {
    result.textContent = judge;
    reason.textContent = explanation;
}

//4.関数の呼び出し
renderQuestion(questionData);

//5.イベントリスナー設定
answerButtons.forEach(function (answerButton) {
    answerButton.addEventListener("click", function (event) {
        if (event.target.textContent.trim() === questionData.correctAnswer) {
            showResult("正解！", questionData.reasonText);
        } else {
            showResult("残念！", questionData.reasonText);
        }
    });
});
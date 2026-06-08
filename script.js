//1.オブジェクトの作成
const questionData = {
    statement: "水を熱し続けると、水は何になって空気中へ出ていくでしょうか？",
    correctAnswer: "水蒸気",
    reasonText: "水を熱し続けると、水は気体になって空気中へ出ていきます。この気体になった水を水蒸気と呼びます。",
    choice1: "氷",
    choice2: "水蒸気",
    choice3: "砂",
    choice4: "光",
};

//2.要素の取得
const answerButtons = document.querySelectorAll(".answer-button");
const statement = document.querySelector("#statement")
const result = document.querySelector("#result");
const reason = document.querySelector("#reason");

//3.関数の自作
function showStatement(text) {
    statement.textContent = text;
}

function showResult(judge, explanation) {
    result.textContent = judge;
    reason.textContent = explanation;
}

//4.イベントリスナー設定
answerButtons[0].textContent = questionData.choice1;
answerButtons[1].textContent = questionData.choice2;
answerButtons[2].textContent = questionData.choice3;
answerButtons[3].textContent = questionData.choice4;

showStatement(questionData.statement);

answerButtons.forEach(function (answerButton) {
    answerButton.addEventListener("click", function (event) {
        if (event.target.textContent.trim() === questionData.correctAnswer) {
            showResult("正解！", questionData.reasonText);
        } else {
            showResult("残念！", questionData.reasonText);
        }
    });
});
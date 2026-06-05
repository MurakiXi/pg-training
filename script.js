//1.要素の取得

const answerButtons = document.querySelectorAll(".answer-button");
const result = document.querySelector("#result");
const correctAnswer = '電気';
const reason = document.querySelector("#reason");
const reasonText = "乾電池は電圧(電気を押し出す力)を持っています。乾電池の＋極と－極を導線でつなぐと、電気の通り道ができ、電気が流れます。";
//2.関数自作
function showResult(msg, explanation) {
    result.textContent = msg;
    reason.textContent = explanation;
}

//3.イベントリスナー設定

answerButtons.forEach(function (answerButton) {
    answerButton.addEventListener("click", function (event) {
        if (event.target.textContent === correctAnswer) {
            showResult("正解！", reasonText);
        } else {
            showResult("残念！", reasonText);
        }
    });
});

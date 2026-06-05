//1.要素の取得

const answer = document.querySelector("#correct-button");
const incorrectButtons = document.querySelectorAll(".incorrect-button");
const result = document.querySelector("#result");
const reason = document.querySelector("#reason");
const reasonText = "乾電池は電圧(電気を押し出す力)を持っています。乾電池の＋極と－極を導線でつなぐと、電気の通り道ができ、電気が流れます。";
console.log(incorrectButtons);
//2.関数自作
function showResult(msg, explanation) {
    result.textContent = msg;
    reason.textContent = explanation;
}

//3.イベントリスナー設定

answer.addEventListener('click', function () {
    showResult('正解！', reasonText)
});

incorrectButtons.forEach(function (incorrectButton) {
incorrectButton.addEventListener("click", function (event) {
console.log(event.target);
showResult("残念！", reasonText);
    })
});

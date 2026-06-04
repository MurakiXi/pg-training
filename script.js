//1.要素の取得

const answer = document.querySelector("#correct-button");
const water = document.querySelector("#water-button");
const air = document.querySelector("#air-button");
const result = document.querySelector("#result");
const reason = document.querySelector("#reason");
const reasonText = "乾電池は電圧(電気を押し出す力)を持っています。乾電池の＋極と－極を導線でつなぐと、電気の通り道ができ、電気が流れます。";

//2.関数自作
function showResult(msg, explanation) {
    result.textContent = msg;
    reason.textContent = explanation;
}

//3.イベントリスナー設定

answer.addEventListener('click', function () {
    showResult('正解！', reasonText)
});

water.addEventListener('click', function () {
    showResult('残念！', reasonText)
});

air.addEventListener('click', function () {
    showResult('残念！', reasonText)
});

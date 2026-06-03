//1.要素の取得

const answer = document.querySelector("#correct-button");
const result = document.querySelector("#result");
const water = document.querySelector("#water-button");
const air = document.querySelector("#air-button");
const reason = document.querySelector("#reason");
const reasonText = "乾電池は電圧(電気を押し出す力)を持っています。乾電池の＋極と－極を導線でつなぐと、電気の通り道ができ、電気が流れます。";

//2.イベントリスナー設定

//以下3つのイベントは、resultに表示する文言以外が共通している
//reasonの表示は完全一致
//現在は練習中のためベタ打ちで進行
answer.addEventListener('click', function(){
    result.textContent = '正解！';
    reason.textContent = reasonText;
});

water.addEventListener('click', function () {
    result.textContent = '残念！';
    reason.textContent = reasonText;
});

air.addEventListener('click', function () {
    result.textContent = '残念！';
    reason.textContent = reasonText;
});
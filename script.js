//1.要素の取得

const answer = document.querySelector("#correct-button");
const result = document.querySelector("#result");
const water = document.querySelector("#water-button");
const air = document.querySelector("#air-button");

//2.イベントリスナー設定
answer.addEventListener('click', function(){
    result.textContent = '正解！';
});

water.addEventListener('click', function () {
    result.textContent = '残念！';
});

air.addEventListener('click', function () {
result.textContent = '残念！';
});
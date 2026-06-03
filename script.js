//1.要素の取得

const answer = document.querySelector("#correct-button");
const result = document.querySelector("#result");

//2.イベントリスナー設定
answer.addEventListener('click', function(){
    result.textContent = '正解！';
});

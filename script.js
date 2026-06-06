//1.要素の取得
const answerButtons = document.querySelectorAll(".answer-button");
const result = document.querySelector("#result");
const reason = document.querySelector("#reason");

//2.変数の宣言
const correctAnswer = "水蒸気";
const reasonText = "水を熱し続けると、水は気体になって空気中へ出ていきます。この気体になった水を水蒸気と呼びます。ちなみに「湯気」は「水蒸気が空気中で冷やされて細かい水の粒になり、人の目に見えるようになったもの」で、水蒸気とは違うものです。";


//3.関数の自作
function showResult(judge, explanation) {
    result.textContent = judge;
    reason.textContent = explanation;
}

//4.イベントリスナー設定
answerButtons.forEach(function (answerButton) {
    answerButton.addEventListener("click", function (event) {
        if (event.target.textContent.trim() === correctAnswer) {
            showResult("正解！", reasonText);
        } else {
            showResult("残念！", reasonText);
        }
    });
});
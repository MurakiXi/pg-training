function QuizHeader() {
  return (
      <header>
        <div className="header__logo">Science Quiz</div>
      </header>
  )
}
function App() {

  return (
    <>
      <QuizHeader />
      <main>
        <div id="progress">第1問／全3問</div>
        <div className="question-title">問題：</div>
        <div id="statement">水を熱し続けると、水は何になって空気中へ出ていくでしょうか？</div>
        <div className="choices">
            <button className="answer-button">氷</button>
            <button className="answer-button">水蒸気</button>
            <button className="answer-button">砂</button>
            <button className="answer-button">光</button>
        </div>
        <p id="result">ここに結果が表示されます</p>
        <p id="reason">ここに解説が表示されます</p>
        <button id="next-button">次の問題</button>
      </main>
    </>
  )
}

export default App

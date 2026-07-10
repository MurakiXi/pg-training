type QuizHeaderProps = {
  title: string
}

type Question = {
  statement: string
}

type QuestionViewProps = {
  current: number
  total: number
  question: Question
}

function QuizHeader({ title }: QuizHeaderProps) {
  return (
      <header>
      <div className="header__logo">{title}</div>
      </header>
  )
}

function QuestionView({ current, total, question }: QuestionViewProps) {
  return (
    <>
      <div id="progress">第{current}問／全{total}問</div>
      <div className="question-title">問題：</div>
      <div id="statement">{question.statement}</div>
    </>
  )
}

function App() {
const firstQuestion: Question = {
  statement: "水を熱し続けると、水は何になって空気中へ出ていくでしょうか？"
}
  return (
    <>
      <QuizHeader title="Science Quiz"/>
      <main>
        <QuestionView current={1} total={3} question={firstQuestion} />
        
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

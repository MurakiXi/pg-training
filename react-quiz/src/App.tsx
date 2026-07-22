import { useState } from 'react'

type QuizHeaderProps = {
  title: string
}

type Question = {
  statement: string
  choices: string[]
}

type QuestionViewProps = {
  current: number
  total: number
  question: Question
}

type AnswerChoicesProps = {
  choices: string[]
  onSelectAnswer: (choice: string) => void;
};

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

function AnswerChoices({ choices, onSelectAnswer }: AnswerChoicesProps) {
  return (
    <div className="choices">
      {choices.map((choice) => (
        <button
          key={choice}
          className="answer-button"
          onClick={() => onSelectAnswer(choice)}
        >
          {choice}
        </button>
      ))}
    </div>
  )
}

function App() {
const firstQuestion: Question = {
  statement: "水を熱し続けると、水は何になって空気中へ出ていくでしょうか？",
  choices: ["氷","水蒸気","砂","光"]
}

const [selectedAnswer, setSelectedAnswer] =
  useState<string | null>(null)

function handleSelectAnswer(choice: string) {
  setSelectedAnswer(choice)
}
  
  return (
    <>
      <QuizHeader title="Science Quiz"/>
      <main>
        <QuestionView current={1} total={3} question={firstQuestion} />
        
        <AnswerChoices
          choices={firstQuestion.choices}
          onSelectAnswer={handleSelectAnswer}
        />

        <p id="result">ここに結果が表示されます</p>
        <p id="reason">ここに解説が表示されます</p>
        <button id="next-button">次の問題</button>
      </main>
    </>
  )
}

export default App

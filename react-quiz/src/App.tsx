import { useState } from 'react'

type QuizHeaderProps = {
  title: string
}

type Question = {
  statement: string
  choices: string[]
  correctAnswer: string
  reasonText: string
}

type QuestionViewProps = {
  current: number
  total: number
  question: Question
}

type AnswerChoicesProps = {
  choices: string[]
  onSelectAnswer: (choice: string) => void;
  disabled: boolean
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

function AnswerChoices({ choices, onSelectAnswer, disabled }: AnswerChoicesProps) {
  return (
    <div className="choices">
      {choices.map((choice) => (
        <button
          key={choice}
          className="answer-button"
          onClick={() => onSelectAnswer(choice)}
          disabled={disabled}
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
  choices: ["氷", "水蒸気", "砂", "光"],
  correctAnswer: "水蒸気",
  reasonText: "水を熱し続けると、水は気体になって空気中へ出ていきます。この気体になった水を水蒸気と呼びます。"
}

const [selectedAnswer, setSelectedAnswer] =
  useState<string | null>(null)

function handleSelectAnswer(choice: string) {
  setSelectedAnswer(choice)
}

function handleNextQuestion() {
  setSelectedAnswer(null)
  }
  
  return (
    <>
      <QuizHeader title="Science Quiz"/>
      <main>
        <QuestionView current={1} total={3} question={firstQuestion} />
        
        <AnswerChoices
          choices={firstQuestion.choices}
          onSelectAnswer={handleSelectAnswer}
          disabled={selectedAnswer !== null}
        />

        <p id="result">
          {selectedAnswer === null
            ? "答えを選んでください"
            : selectedAnswer === firstQuestion.correctAnswer
              ? "正解！"
              : "残念！"}
        </p>
        <p id="reason">
          {selectedAnswer === null
            ? ""
            : firstQuestion.reasonText}
        </p>
        <button onClick={handleNextQuestion} id="next-button">次の問題</button>
      </main>
    </>
  )
}

export default App

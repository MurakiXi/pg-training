import { useState } from 'react'
import ResultView from './components/ResultView'
import QuizHeader from './components/QuizHeader'

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

  const questions: Question[] = [
    {
      statement: "水を熱し続けると、水は何になって空気中へ出ていくでしょうか？",
      correctAnswer: "水蒸気",
      reasonText: "水を熱し続けると、水は気体になって空気中へ出ていきます。この気体になった水を水蒸気と呼びます。",
      choices: ["氷", "水蒸気", "砂", "光"]
    },
    {
      statement: "乾電池の＋極と－極を導線でつなぎ、回路ができると何が流れるでしょうか？",
      correctAnswer: "電気",
      reasonText: "乾電池の＋極と－極をつなぐと電気の通り道ができ、電気が流れます。",
      choices: ["電気", "水", "空気", "光"]
    },
    {
    statement: "夜空で光る星にはさまざまな色がありますが、次の中で一番温度が高い星の色はどれでしょうか？",
    correctAnswer: "青",
    reasonText:"星は温度が低いと赤っぽく光り、温度が上がるにつれて黄色、白と色が変わっていき、最も温度が高い星は青白く光ります。",
    choices:["白", "黄", "赤", "青"]
    }
  ]


  const [selectedAnswer, setSelectedAnswer] =
    useState<string | null>(null)

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState<number>(0)

  const currentQuestion = questions[currentQuestionIndex]

  const [score, setScore] =
    useState<number>(0)

  const [isQuizFinished, setIsQuizFinished] =
    useState<boolean>(false)
  
  const isLastQuestion =
    currentQuestionIndex === questions.length - 1
  
    const correctRate: string =
    ((score / questions.length) * 100).toFixed(1)
  
  function handleSelectAnswer(choice: string) {
    setSelectedAnswer(choice)
    if (choice === currentQuestion.correctAnswer) {
      setScore(
        (previousScore) => previousScore + 1
      )
    }
  }
    
  function handleNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedAnswer(null)
      setCurrentQuestionIndex(
        (previousIndex) => previousIndex + 1
      )
    } else {
      setIsQuizFinished(true)
    }
  }

  function handleRetryQuiz() {
    setSelectedAnswer(null)
    setCurrentQuestionIndex(0)
    setScore(0)
    setIsQuizFinished(false)
  }


  return (
    <>
      <QuizHeader title="Science Quiz"/>
      <main>
        {isQuizFinished
          ? <ResultView
            score={score}
            total={questions.length}
            correctRate={correctRate}
            onRetry={handleRetryQuiz}
            />
          :(
          <>
            <QuestionView current={currentQuestionIndex + 1} total={questions.length} question={currentQuestion} />
        
            <AnswerChoices
              choices={currentQuestion.choices}
              onSelectAnswer={handleSelectAnswer}
              disabled={selectedAnswer !== null}
            />

          <p id="result">
            {selectedAnswer === null
              ? "答えを選んでください"
              : selectedAnswer === currentQuestion.correctAnswer
                ? "正解！"
                : "残念！"}
          </p>
          <p id="reason">
            {selectedAnswer === null
              ? ""
              : currentQuestion.reasonText}
          </p>
          <button
            onClick={handleNextQuestion}
            id="next-button"
            disabled={selectedAnswer === null}>
            {isLastQuestion
            ? "結果を見る"
            : "次の問題"}
            </button>
          </>
          )}
      </main>
    </>
  )
}

export default App
import { useState } from 'react'
import ResultView from './components/ResultView'
import QuizHeader from './components/QuizHeader'
import AnswerChoices from './components/AnswerChoices'
import type { Question } from './types/question'
import QuestionView from './components/QuestionView'
import AnswerFeedback from './components/AnswerFeedback'
import QuestionForm from './components/QuestionForm'


function App() {

  const [questions, setQuestions] =
    useState<Question[]>([
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
        reasonText: "星は温度が低いと赤っぽく光り、温度が上がるにつれて黄色、白と色が変わっていき、最も温度が高い星は青白く光ります。",
        choices: ["白", "黄", "赤", "青"]
      }
    ])
  
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
  
  const [isAddFormVisible, setIsAddFormVisible] =
    useState<boolean>(false)

  const questionLimit = 4
  
  const remainingQuestionCount = questionLimit - questions.length
  
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

  function handleAddQuestion(newQuestion: Question) {
    setQuestions(
      (previousQuestions) =>
        [...previousQuestions, newQuestion]
      )  
  }

  function handleToggleAddForm() {
    setIsAddFormVisible(
      (previousIsAddFormVisible) => !previousIsAddFormVisible
    )
  }

  return (
    <>
      <QuizHeader title="Science Quiz"
        isAddFormVisible={isAddFormVisible}
        onToggleAddForm={handleToggleAddForm}
        questionsLength={questions.length}
        remainingQuestionCount={remainingQuestionCount}
      />
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
              <div className={isAddFormVisible ? "hidden" : ""}>
                <QuestionView current={currentQuestionIndex + 1} total={questions.length} question={currentQuestion} />
                <AnswerChoices
                  choices={currentQuestion.choices}
                  onSelectAnswer={handleSelectAnswer}
                  disabled={selectedAnswer !== null}
                />
                <AnswerFeedback
                  selectedAnswer={selectedAnswer}
                  currentQuestion={currentQuestion}
                  isLastQuestion={isLastQuestion}
                  handleNextQuestion={handleNextQuestion}
                />
              </div>
              <div className={isAddFormVisible ? "" : "hidden"}>
                <QuestionForm
                  questionsLength={questions.length}
                  onAddQuestion={handleAddQuestion}
                  questionLimit={questionLimit}
                />
              </div>
          </>
          )}
      </main>
    </>
  )
}

export default App
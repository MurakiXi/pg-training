import type { Question } from '../types/question'
import { useState } from 'react'

type QuestionFormProps = { onAddQuestion: (newQuestion: Question) => void; }

export default function QuestionForm({ onAddQuestion }: QuestionFormProps) {
  const [inputStatement, setInputStatement] =
    useState<string>("")
  
  const [inputChoice1, setInputChoice1] =
    useState<string>("")

  const [inputChoice2, setInputChoice2] =
    useState<string>("")

  const [inputChoice3, setInputChoice3] =
    useState<string>("")

  const [inputChoice4, setInputChoice4] =
    useState<string>("")

  const [inputCorrectAnswer, setInputCorrectAnswer] =
    useState<string>("")

  const [inputReasonText, setInputReasonText] =
    useState<string>("")

  const choices = [
  inputChoice1,
  inputChoice2,
  inputChoice3,
  inputChoice4,
  ]
  
  const newQuestion: Question = {
    statement: inputStatement,
    choices: choices,
    correctAnswer: inputCorrectAnswer,
    reasonText: inputReasonText
  }

  return (
      <>
        <input
          value={inputStatement}
          onChange={(event) => {
            setInputStatement(event.target.value)
          }}
        />
        <input
          value={inputChoice1}
          onChange={(event) => {
            setInputChoice1(event.target.value)
          }}
        />
        <input
          value={inputChoice2}
          onChange={(event) => {
            setInputChoice2(event.target.value)
          }}
        />
        <input
          value={inputChoice3}
          onChange={(event) => {
            setInputChoice3(event.target.value)
          }}
        />
        <input
          value={inputChoice4}
          onChange={(event) => {
            setInputChoice4(event.target.value)
          }}
        />
        <input
          value={inputCorrectAnswer}
          onChange={(event) => {
            setInputCorrectAnswer(event.target.value)
          }}
        />
        <textarea
          value={inputReasonText}
          onChange={(event) => {
            setInputReasonText(event.target.value)
          }}
        />
        
        <p>現在の入力：
          問題文：{inputStatement}
          選択肢1：{inputChoice1}
          選択肢2：{inputChoice2}
          選択肢3：{inputChoice3}
          選択肢4：{inputChoice4}
          正解：{inputCorrectAnswer}
          解説：{ inputReasonText }
        </p>
        <button
          onClick={() => onAddQuestion(newQuestion)}
          id="add-question">
          問題を追加する
        </button>
      </>
    )
}
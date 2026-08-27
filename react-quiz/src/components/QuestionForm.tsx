import type { Question } from '../types/question'
import { useState } from 'react'

type QuestionFormProps = {
  onAddQuestion:
  (newQuestion: Question) => void;
  questionsLength:number
}

export default function QuestionForm({ onAddQuestion,questionsLength }: QuestionFormProps) {
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

  const [errorMessage, setErrorMessage] =
    useState<string>("")

  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = 
    useState<boolean>(false)
  
  function handleAddQuestionClick() {
    const trimmedChoices = choices.map(choice => choice.trim())
    const trimmedStatement = inputStatement.trim()
    const trimmedCorrectAnswer = inputCorrectAnswer.trim()
    const trimmedReasonText = inputReasonText.trim()
    setIsSuccessMessageVisible(false)
    if (isQuestionLimitReached)
      {
      return
    }
    if (
      trimmedStatement === "" ||
      trimmedChoices.includes("") ||
      trimmedCorrectAnswer === "" ||
      trimmedReasonText === ""
    ) {
      setErrorMessage("追加する問題に、空白または未入力の項目があります")
      return
    }
    if (
      new Set(trimmedChoices).size !== trimmedChoices.length
    ) {
      setErrorMessage("追加する問題の選択肢が、一部または全て重複しています")
      return
    }
    if (
      !trimmedChoices.includes(trimmedCorrectAnswer)
    ) {
      setErrorMessage("追加する問題の選択肢に、正解が含まれていません")
      return
    }
    const newQuestion: Question = {
      statement: trimmedStatement,
      choices: trimmedChoices,
      correctAnswer: trimmedCorrectAnswer,
      reasonText: trimmedReasonText
    }
    onAddQuestion(newQuestion)
    setIsSuccessMessageVisible(true)
    setErrorMessage("")
    setInputStatement("")
    setInputChoice1("")
    setInputChoice2("")
    setInputChoice3("")
    setInputChoice4("")
    setInputCorrectAnswer("")
    setInputReasonText("")
  }
  
  const questionLimit = 10

  const isQuestionLimitReached = questionsLength >= questionLimit ;

  return (
    <>
      <div>追加する問題の問題文、選択肢4つ、正解、解説文を入力してください。</div>
      <div>
      問題文：
      <input
        className="border-1 py-2 px-3 rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputStatement}
          onChange={(event) => {
            setInputStatement(event.target.value)
          }}
        />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
      選択肢1：
      <input
        className="border-1 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputChoice1}
          onChange={(event) => {
            setInputChoice1(event.target.value)
          }}
          />
        </div>
        <div>
      選択肢2：
      <input
        className="border-1 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputChoice2}
          onChange={(event) => {
            setInputChoice2(event.target.value)
          }}
          />
        </div>
        <div>
      選択肢3：
      <input
        className="border-1 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputChoice3}
          onChange={(event) => {
            setInputChoice3(event.target.value)
          }}
          />
        </div>
        <div>
      選択肢4：
      <input
        className="border-1 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputChoice4}
          onChange={(event) => {
            setInputChoice4(event.target.value)
          }}
          />
        </div>
      </div>
      <div>
      正答：
      <input
        className="border-1 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
          value={inputCorrectAnswer}
          onChange={(event) => {
            setInputCorrectAnswer(event.target.value)
          }}
        />
      </div>
      <div>
      解説文：
      <textarea
        className="border-1 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputReasonText}
          onChange={(event) => {
            setInputReasonText(event.target.value)
          }}
        />
      </div>        
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
        onClick={handleAddQuestionClick}
        disabled={isQuestionLimitReached}
        id="add-question" className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-blue-600 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400">
          問題を追加する
      </button>
      <p>{errorMessage}</p>
      {isSuccessMessageVisible && (
        <p className="text-green-600">
          問題を追加しました。現在の問題数：{questionsLength}問
        </p>
      )}
      {isQuestionLimitReached
        ? (
          <p>
            これ以上問題を追加できません。
          </p>)
        : (
          <p>
            問題は全{questionLimit}問になるまで追加可能です。現在、全{questionsLength}問です。
          </p>
        )}
      </>
    )
}
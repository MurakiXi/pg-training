import type { Question } from '../types/question'

type AnswerFeedbackProps = {
    selectedAnswer: string | null
    currentQuestion: Question
    isLastQuestion: boolean
    handleNextQuestion: () => void
}

export default function AnswerFeedback({ selectedAnswer, currentQuestion, isLastQuestion, handleNextQuestion }: AnswerFeedbackProps) {
    return (
        <>
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
    )
}
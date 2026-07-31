import type { Question } from '../types/question'

type QuestionViewProps = {
    current: number
    total: number
    question: Question
}

export default function QuestionView({ current, total, question }: QuestionViewProps) {
    return (
    <>
        <div id="progress">第{current}問／全{total}問</div>
        <div className="question-title">問題：</div>
        <div id="statement">{question.statement}</div>
    </>
    )
}
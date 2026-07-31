type ResultViewProps = {
    score: number
    total: number
    correctRate: string
    onRetry:() => void
}

export default function ResultView(
    { score, total, correctRate, onRetry }: ResultViewProps
) {
    return (
        <>
            <p>おつかれさまでした！</p>
            <p>全{total}問中{score}問正解！
                正答率は{correctRate}%です！
            </p>
            <button onClick={onRetry}>
                もう一度挑戦！
            </button>
        </>
        )
}
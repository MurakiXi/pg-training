type AnswerChoicesProps = {
    choices: string[]
    onSelectAnswer: (choice: string) => void;
    disabled: boolean
}

export default function AnswerChoices({ choices, onSelectAnswer, disabled }: AnswerChoicesProps) {
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
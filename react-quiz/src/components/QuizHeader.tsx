type QuizHeaderProps = {
    title: string
    onToggleAddForm: () => void
    isAddFormVisible: boolean
    remainingQuestionCount: number
    questionsLength: number
}

export default function QuizHeader({title, onToggleAddForm, isAddFormVisible, remainingQuestionCount, questionsLength}: QuizHeaderProps) {
    return (
        <header>
            {remainingQuestionCount <= 0
                ? <p>現在{questionsLength}問です。これ以上は問題を追加できません。</p>
                : <p>現在{questionsLength}問です。あと{remainingQuestionCount}問追加できます。</p>
            }
            
            <button
                disabled={!isAddFormVisible && remainingQuestionCount === 0}
                onClick={onToggleAddForm}>
                {isAddFormVisible
                    ? "問題の追加フォームを隠す"
                    : "問題の追加フォームを表示する"
                }
                </button>
            <div className="header__logo">{title}</div>
        </header>
    )
}
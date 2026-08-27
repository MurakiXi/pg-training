type QuizHeaderProps = {
    title: string
    onToggleAddForm: () => void
    isAddFormVisible: boolean
}

export default function QuizHeader({title, onToggleAddForm, isAddFormVisible }: QuizHeaderProps) {
    return (
        <header>
            <button
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
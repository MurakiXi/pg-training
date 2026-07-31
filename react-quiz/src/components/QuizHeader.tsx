type QuizHeaderProps = {
    title: string
}

export default function QuizHeader({ title }: QuizHeaderProps) {
    return (
        <header>
        <div className="header__logo">{title}</div>
        </header>
    )
}
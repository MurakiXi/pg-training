type Question = {
    id: string;
    statement: string;
    correctAnswer: string;
    reasonText: string;
    choices: string[];
};
const QUIZ_MODE = {
    ANSWERING: "answering",
    READY_TO_RESULT: "readyToResult",
    RESULT: "result",
    LOADING: "loading",
    LOAD_ERROR: "loadError"
} as const;

type QuizMode =
    | "answering"
    | "readyToResult"
    | "result"
    | "loading"
    | "loadError";

let quizMode: QuizMode = QUIZ_MODE.LOADING;

let currentQuestionIndex: number = 0;
let isAnswered: boolean = false;
let score: number = 0;
let questions: Question[] = [];

function setQuizMode(newMode: QuizMode): void {
    quizMode = newMode;
    updateNextButtonText();
    updateScreenByQuizMode();
}

function resetQuizState(): void{
    currentQuestionIndex = 0;
    isAnswered = false;
    score = 0;
}

function getCurrentQuestion(): Question {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion === undefined) {
        throw new Error("現在の問題が見つかりません。");
    }

    return currentQuestion;
}

function hasNextQuestion(): boolean {
    return currentQuestionIndex < questions.length - 1;
}

function isCorrectAnswer(answerText: string, question: Question): boolean {
    return answerText === question.correctAnswer;
}

function isNonEmptyString(value: unknown): boolean {
    if (typeof value !== "string") {
        return false;
    }

    if (value.trim() === "") {
        return false;
    }

    return true;
}

function findDuplicateQuestionIds(questions: Question[]): string[] {
    const checkedIds: string[] = [];
    const duplicateIds: string[] = [];

    questions.forEach(function (question) {
        if (!isNonEmptyString(question.id)) {
            return;
        }

        if (checkedIds.includes(question.id)) {
            if (!duplicateIds.includes(question.id)) {
                duplicateIds.push(question.id);
            }
        } else {
            checkedIds.push(question.id);
        }
    });

    return duplicateIds;
}

function getRequiredElement(selector: string): HTMLElement {
    const element = document.querySelector(selector);

    if (element === null) {
        throw new Error(`${selector} が見つかりません。`);
    }

    return element as HTMLElement;
}

const result = getRequiredElement("#result");
const reason = getRequiredElement("#reason");

function showResult(judge: string, explanation: string): void {
    result.textContent = judge;
    reason.textContent = explanation;
}

function clearFeedback(): void {
    result.textContent = "";
    reason.textContent = "";
}

const progress = getRequiredElement("#progress");

function renderProgress(): void {
    const progressMessage = `第${currentQuestionIndex + 1}問／全${questions.length}問`;
    progress.textContent = progressMessage;
}

const nextButton = getRequiredElement("#next-button");

function updateNextButtonText(): void {
    if (quizMode === QUIZ_MODE.ANSWERING) {
        nextButton.textContent = "次の問題";
    } else if (quizMode === QUIZ_MODE.READY_TO_RESULT) {
        nextButton.textContent = "結果を見る";
    } else if (quizMode === QUIZ_MODE.RESULT) {
        nextButton.textContent = "もう一度挑戦！";
    }
}

const statement = getRequiredElement("#statement");
const quizScore = getRequiredElement("#quiz-score");
const questionTitle = getRequiredElement(".question-title");
const choices = getRequiredElement(".choices");

const hideElements: HTMLElement[] = [
    progress,
    questionTitle,
    choices,
    result,
    reason,
];

function updateScreenByQuizMode(): void {
    if (quizMode === QUIZ_MODE.LOADING || quizMode === QUIZ_MODE.LOAD_ERROR) {
        hideElements.forEach(function (element) {
            element.style.display = "none";
        });

        statement.style.display = "";
        nextButton.style.display = "none";
        quizScore.style.display = "none";
        return;
    }

    if (quizMode === QUIZ_MODE.RESULT) {
        hideElements.forEach(function (element) {
            element.style.display = "none";
        });

        statement.style.display = "none";
        nextButton.style.display = "";
        quizScore.style.display = "";
        return;
    }

    hideElements.forEach(function (element) {
        element.style.display = "";
    });

    statement.style.display = "";
    nextButton.style.display = "";
    quizScore.style.display = "none";
}

const answerButtons = document.querySelectorAll<HTMLButtonElement>(".answer-button");

function renderQuestion(question: Question): void {
    statement.textContent = question.statement;

    answerButtons.forEach(function (answerButton, index) {
        const choice = question.choices[index];

        if (choice === undefined) {
            throw new Error("選択肢ボタンが見つかりません。");
        }

        answerButton.textContent = choice;
    });

    renderProgress();
}

function renderFinalScore(): void {
    if (questions.length === 0) {
        throw new Error("問題数が0になっています。");
    }

    const correctRate: string = ((score / questions.length) * 100).toFixed(1);
    quizScore.textContent = `おつかれさまでした！ 全${questions.length}問中${score}問正解！ 正答率は${correctRate}%です！`;
}
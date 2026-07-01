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

function setQuizMode(newMode: QuizMode): void {
    quizMode = newMode;
    // TODO: 後で updateNextButtonText() と updateVisibilityByMode() を追加する
}
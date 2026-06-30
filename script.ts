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

let quizMode : QuizMode = QUIZ_MODE.LOADING;

type QuizMode =
    | "answering"
    | "readyToResult"
    | "result"
    | "loading"
    | "loadError";
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

function disableAnswerButtons(): void {
    answerButtons.forEach(function (answerButton) {
        answerButton.disabled = true;
    });
}

function enableAnswerButtons(): void {
    answerButtons.forEach(function (answerButton) {
        answerButton.disabled = false;
    });
}

function getQuestionValidationErrors(question: unknown):string[] {
    const errors:string[] = [];
    if (typeof question !== "object" || question === null) {
        errors.push('問題データが空か、またはオブジェクトになっていません。');
        return errors;
    }
    const questionRecord = question as Record<string, unknown>;
    if (!isNonEmptyString(questionRecord.id)) {
        errors.push("IDが空か、または文字列になっていません。");
    }
    if (!isNonEmptyString(questionRecord.statement)) {
        errors.push("問題文が空か、または文字列になっていません。");
    }
    if (!isNonEmptyString(questionRecord.correctAnswer)) {
        errors.push("正解が空か、または文字列になっていません。")
    }
    if (!isNonEmptyString(questionRecord.reasonText)) {
        errors.push("解説文が空か、または文字列になっていません。");
    }
    if (!Array.isArray(questionRecord.choices)) {
        errors.push("選択肢が配列になっていません。");
    } else {
        if (questionRecord.choices.length !== answerButtons.length) {
            errors.push("選択肢の数がボタンの数と一致していません。");
        }
        if (!questionRecord.choices.every(isNonEmptyString)) {
            errors.push("選択肢の中に空、または文字列ではない値があります。");
        }
        const areChoicesValid = questionRecord.choices.every(isNonEmptyString);
        const isCorrectAnswerValid = isNonEmptyString(questionRecord.correctAnswer);

        if (areChoicesValid && isCorrectAnswerValid) {
            if (!questionRecord.choices.includes(questionRecord.correctAnswer)) {
            errors.push("正解が選択肢の中に含まれていません。");
            }
        }
    }

    return errors;
}

function isValidQuestion(question: unknown): question is Question {
    return getQuestionValidationErrors(question).length === 0;
}

function showLoadError(message:string):void {
    statement.textContent = message;
}

function showErrorScreen(errorDetail: string):void {
    setQuizMode(QUIZ_MODE.LOAD_ERROR);
    showLoadError(errorDetail);
}

async function loadQuestionsData():Promise<void> {
    try {
        setQuizMode(QUIZ_MODE.LOADING);
        statement.textContent = "問題を読み込んでいます……";
        const response = await fetch("questions.json");
        if (!response.ok) {
            showErrorScreen("データ読み込みに失敗しました。");
            return;
        }

        const loadedQuestions: unknown = await response.json();

        if (!Array.isArray(loadedQuestions)) {
            showErrorScreen("読み込んだデータが配列になっていません。");
            return;
        }

        if (loadedQuestions.length === 0) {
            showErrorScreen("読み込んだデータに問題が入っていません。");
            return;
        }

        if (!loadedQuestions.every(isValidQuestion)) {
            loadedQuestions.forEach(function (question: unknown, index: number) {
                const errors = getQuestionValidationErrors(question);

                const questionRecord =
                    typeof question === "object" && question !== null
                        ? question as Record<string, unknown>
                        : null;

                if (errors.length > 0) {
                    const questionLabel =
                        questionRecord !== null && isNonEmptyString(questionRecord.id)
                            ? questionRecord.id
                            : `${index + 1}問目`;

                    console.error(`${questionLabel} のデータに問題があります。`);

                    errors.forEach(function (errorMessage) {
                        console.error(`- ${errorMessage}`);
                    });
                }
            });

            showErrorScreen("読み込んだデータに問題が発見されました。");
            return;
        }

        const duplicateIds = findDuplicateQuestionIds(loadedQuestions);
        
        if (duplicateIds.length > 0) {
            duplicateIds.forEach(function (duplicateId) {
                console.error(`id: ${duplicateId} が重複しています。`);
            });
            showErrorScreen("読み込んだデータに問題が発見されました。");
            return;
        }

        questions = loadedQuestions;
        renderQuestion(getCurrentQuestion());
        enableAnswerButtons();
        setQuizMode(QUIZ_MODE.ANSWERING);
    } catch (error) {
        showErrorScreen("データ読み込み中にエラーが発生しました。");
        console.error(error);
    }
}

function showResultView():void {
    renderFinalScore();
    setQuizMode(QUIZ_MODE.RESULT);
}

function retryQuiz(): void {
    resetQuizState();
    quizScore.textContent = "";
    clearFeedback();
    renderQuestion(getCurrentQuestion());
    enableAnswerButtons();
    setQuizMode(QUIZ_MODE.ANSWERING);
}

answerButtons.forEach(function (answerButton) {
    answerButton.addEventListener("click", function () {
        if (!isAnswered){
            const answerText = answerButton.textContent;
            if (answerText === null) {
                return;
            }
            const trimmedAnswerText = answerText.trim();
            const currentQuestion = getCurrentQuestion();
            const isCorrect = isCorrectAnswer(trimmedAnswerText, currentQuestion);
            
            if (isCorrect) {
                showResult("正解！", currentQuestion.reasonText);
                score++;
            } else {
                showResult("残念！", currentQuestion.reasonText);
            }

            isAnswered = true;
            disableAnswerButtons();
            if (!hasNextQuestion()) {
                setQuizMode(QUIZ_MODE.READY_TO_RESULT);
            }
        }
    });
});
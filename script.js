//1.配列・定数・変数の作成
const QUIZ_MODE = {
    ANSWERING: "answering",
    READY_TO_RESULT: "readyToResult",
    RESULT: "result",
    LOADING: "loading",
    LOAD_ERROR: "loadError"
};

let currentQuestionIndex = 0;
let isAnswered = false;
let score = 0;
let quizMode = QUIZ_MODE.LOADING;
let questions = [];
const questionCount = questions.length;

//2.要素の取得
const answerButtons = document.querySelectorAll(".answer-button");
const statement = document.querySelector("#statement")
const result = document.querySelector("#result");
const reason = document.querySelector("#reason");
const nextButton = document.querySelector("#next-button");
const progress = document.querySelector("#progress");
const quizScore = document.querySelector("#quiz-score");
const questionTitle = document.querySelector(".question-title");
const choices = document.querySelector(".choices")

const hideElements = [
    progress,
    questionTitle,
    choices,
    result,
    reason,
];

//2.関数の自作
function renderQuestion(question) {
    statement.textContent = question.statement;
    answerButtons.forEach(function (answerButton, index) {
        answerButton.textContent = question.choices[index];
    });
    renderProgress();
}

function renderProgress() {
    const progressMessage = `第${currentQuestionIndex + 1}問／全${questions.length}問`;
    progress.textContent = progressMessage;
}

function updateNextButtonText() {
    if (quizMode === QUIZ_MODE.ANSWERING) {
        nextButton.textContent = "次の問題";
    } else if (quizMode === QUIZ_MODE.READY_TO_RESULT) {
        nextButton.textContent = "結果を見る";
    } else if (quizMode === QUIZ_MODE.RESULT)
        { nextButton.textContent = "もう一度挑戦！" };
}

function updateScreenByQuizMode() {
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

function setQuizMode(newMode) {
    quizMode = newMode;
    updateNextButtonText();
    updateScreenByQuizMode();
}

function getCurrentQuestion() {
    return questions[currentQuestionIndex];
}

function hasNextQuestion() {
    return currentQuestionIndex < questions.length - 1;
}

function isCorrectAnswer(answerText, question) {
    if (answerText === question.correctAnswer) {
        return true;
    } else {
        return false;
    }
}

function showResult(judge, explanation) {
    result.textContent = judge;
    reason.textContent = explanation;
}

function clearFeedback() {
    result.textContent = "";
    reason.textContent = "";
}

function disableAnswerButtons() {
    answerButtons.forEach(function (answerButton) {
        answerButton.disabled = true;
    });
}

function enableAnswerButtons() {
    answerButtons.forEach(function (answerButton) {
        answerButton.disabled = false;
    });
}

function renderFinalScore() {
    const correctRate = ((score / questions.length) * 100).toFixed(1);
    quizScore.textContent = `おつかれさまでした！ 全${questions.length}問中${score}問正解！ 正答率は${correctRate}%です！`;
}

function resetQuizState() {
    currentQuestionIndex = 0;
    isAnswered = false;
    score = 0;
}

function showResultView() {
    setQuizMode(QUIZ_MODE.RESULT);
    renderFinalScore();
}

function retryQuiz() {
    resetQuizState();
    setQuizMode(QUIZ_MODE.ANSWERING);
    quizScore.textContent = "";
    clearFeedback();
    enableAnswerButtons();
    renderQuestion(getCurrentQuestion());
}

function isNonEmptyString(value) {
    if (typeof value !== "string") {
        return false;
    }

    if (value.trim() === "") {
        return false;
    }

    return true;
}

function isValidQuestion(question) {
    return getQuestionValidationErrors(question).length === 0;
}

function showLoadError(message) {
    statement.textContent = message;
}

function findDuplicateQuestionIds(questions) {
    const checkedIds = [];
    const duplicateIds = [];

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

function getQuestionValidationErrors(question) {
    const errors = [];
    if (typeof question !== "object") {
        errors.push('問題データがオブジェクトになっていません。');
        return errors;
    }
    if (!isNonEmptyString(question.id)) {
        errors.push("IDが空か、または文字列になっていません。");
    }
    if (!isNonEmptyString(question.statement)) {
        errors.push("問題文が空か、または文字列になっていません。");
    }
    if (!isNonEmptyString(question.correctAnswer)) {
        errors.push("正解が空か、または文字列になっていません。")
    }
    if (!isNonEmptyString(question.reasonText)) {
        errors.push("解説文が空か、または文字列になっていません。");
    }
    if (!Array.isArray(question.choices)) {
        errors.push("選択肢が配列になっていません。");
    } else {
        if (question.choices.length !== answerButtons.length) {
            errors.push("選択肢の数がボタンの数と一致していません。");
        }
        if (!question.choices.every(isNonEmptyString)) {
            errors.push("選択肢の中に空、または文字列ではない値があります。");
        }
        if (!question.choices.includes(question.correctAnswer)) {
            errors.push("正解が選択肢の中に含まれていません。")
        }
    }

    return errors;
}

async function loadQuestionsData() {
    try {
        setQuizMode(QUIZ_MODE.LOADING);
        statement.textContent = "問題を読み込んでいます……";
        hideNextButton();
        hideChoicesArea();
        disableAnswerButtons();
        const response = await fetch("questions.json");
        if (!response.ok) {
            setQuizMode(QUIZ_MODE.LOAD_ERROR);
            showLoadError("データ読み込みに失敗しました。");
            return;
        }

        const loadedQuestions = await response.json();

        if (!Array.isArray(loadedQuestions)) {
            setQuizMode(QUIZ_MODE.LOAD_ERROR);
            showLoadError("読み込んだデータが配列になっていません。");
            return;
        }

        if (loadedQuestions.length === 0) {
            setQuizMode(QUIZ_MODE.LOAD_ERROR);
            showLoadError("読み込んだデータに問題が入っていません。");
            return;
        }

        if (!loadedQuestions.every(isValidQuestion)) {
            loadedQuestions.forEach(function (question, index) {
                const errors = getQuestionValidationErrors(question);

                if (errors.length > 0) {
                    const questionLabel =
                        typeof question === "object" && question !== null && isNonEmptyString(question.id)
                            ? question.id
                            : `${index + 1}問目`;

                    console.error(`${questionLabel} のデータに問題があります。`);

                    errors.forEach(function (errorMessage) {
                        console.error(`- ${errorMessage}`);
                    });
                }
            });
            setQuizMode(QUIZ_MODE.LOAD_ERROR);
            showLoadError("読み込んだデータに問題が発見されました。");
            return;
        }

        const duplicateIds = findDuplicateQuestionIds(loadedQuestions);
        
        if (duplicateIds.length > 0) {
            duplicateIds.forEach(function (duplicateId) {
                console.error(`id: ${duplicateId} が重複しています。`);
            });
            setQuizMode(QUIZ_MODE.LOAD_ERROR);
            showLoadError("読み込んだデータに問題が発見されました。");
            return;
        }

        questions = loadedQuestions;
        renderQuestion(getCurrentQuestion());
        enableAnswerButtons();
        showNextButton();
        showChoicesArea();
        setQuizMode(QUIZ_MODE.ANSWERING);
    } catch (error) {
        setQuizMode(QUIZ_MODE.LOAD_ERROR);
        showLoadError("データ読み込み中にエラーが発生しました。");
        console.error(error);
    }
};

function hideNextButton() {
    nextButton.style.display = "none";
}

function showNextButton() {
    nextButton.style.display = "";
}

function hideChoicesArea() {
    choices.style.display = "none";
}

function showChoicesArea() {
    choices.style.display = "";
}

function hideQuizContentDuringLoad() { }
    const quizContent = 

function showQuizContentDuringLoad(){}

//3.関数の呼び出し
loadQuestionsData();

//4.イベントリスナー設定
answerButtons.forEach(function (answerButton) {
    answerButton.addEventListener("click", function (event) {
        if (!isAnswered){
            const answerText = event.target.textContent.trim();
            const currentQuestion = getCurrentQuestion();
            const isCorrect = isCorrectAnswer(answerText, currentQuestion);
            
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

nextButton.addEventListener("click", function () {
    if (quizMode === QUIZ_MODE.RESULT) {
        retryQuiz();
        return;
    }

    if (quizMode === QUIZ_MODE.READY_TO_RESULT) {
        showResultView();
        return;
    };

    if (!isAnswered) {
        reason.textContent = "回答してから次に進んでください";
        return;
    }

    if (hasNextQuestion()) {
        currentQuestionIndex++;
        renderQuestion(getCurrentQuestion());
        clearFeedback();
        isAnswered = false;
        enableAnswerButtons();
        return;
    } 
        showResultView();
    });

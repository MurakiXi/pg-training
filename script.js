//1.配列・定数・変数の作成
const QUIZ_MODE = {
    ANSWERING: "answering",
    READY_TO_RESULT: "readyToResult",
    RESULT: "result",
};

let currentQuestionIndex = 0;
let isAnswered = false;
let score = 0;
let quizMode = QUIZ_MODE.ANSWERING;
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
    statement,
    choices,
    result,
    reason,
];

//5.関数の自作
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
    if (quizMode === QUIZ_MODE.RESULT) {
        hideElements.forEach(function (element) {
            element.style.display = "none";
        });

        quizScore.style.display = "";
        return;
    }

    hideElements.forEach(function (element) {
        element.style.display = "";
    });

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

async function loadQuestionsData() {
    try {
        statement.textContent = "問題を読み込んでいます……";
        disableAnswerButtons();
        const response = await fetch("questions.json");
        if (!response.ok) {
            statement.textContent = "データ読み込みに失敗しました"
            return;
        }
        questions = await response.json();
        renderQuestion(getCurrentQuestion());
        enableAnswerButtons();
    } catch (error) {
        statement.textContent = "データ読み込み中にエラーが発生しました";
        console.error(error);
    }
};


//6.関数の呼び出し
loadQuestionsData();

//7.イベントリスナー設定
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

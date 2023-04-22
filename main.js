const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const startBtn = $('.start-btn')
const startPart = $('.start-part')
const loaddingPart = $('.loadding-part')
const gamePart = $('.game-part')
const questionsList = $('.questions')
const prevQuesBtn = $('.prev')
const nextQuesBtn = $('.next')
const checkBtn = $('.check-btn')
const gameMessage = $('.game-message')



const app = {
    currentIndex: 0,
    isCorrect: false,
    isChoosed: false,
    translateX: 0,
    questions: [
        {
            id: 1,
            question: '1 + 2 = ?',
            answers: [
                {
                    isCorrect: true,
                    answer: '3'
                },
                {
                    isCorrect: false,
                    answer: '12'
                },
                {
                    isCorrect: false,
                    answer: '13'
                },
                {
                    isCorrect: false,
                    answer: '4'
                },
            ],
        },
        {
            id: 2,
            question: '3! = ?',
            answers: [
                {
                    isCorrect: false,
                    answer: '3'
                },
                {
                    isCorrect: true,
                    answer: '6'
                },
                {
                    isCorrect: false,
                    answer: '9'
                },
                {
                    isCorrect: false,
                    answer: '12'
                },
            ],
        },
        {
            id: 3,
            question: '6 + 9 x 12 : 12 = ?',
            answers: [
                {
                    isCorrect: false,
                    answer: '0'
                },
                {
                    isCorrect: false,
                    answer: '69'
                },
                {
                    isCorrect: true,
                    answer: '54'
                },
                {
                    isCorrect: false,
                    answer: '51'
                },
            ],
        },
        {
            id: 4,
            question: '4 + 65 - 23 = ?',
            answers: [
                {
                    isCorrect: false,
                    answer: '86'
                },
                {
                    isCorrect: true,
                    answer: '46'
                },
                {
                    isCorrect: false,
                    answer: '42'
                },
                {
                    isCorrect: false,
                    answer: '82'
                },
            ],
        },
        {
            id: 5,
            question: '56 - 33 = ?',
            answers: [
                {
                    isCorrect: false,
                    answer: '32'
                },
                {
                    isCorrect: false,
                    answer: '33'
                },
                {
                    isCorrect: true,
                    answer: '23'
                },
                {
                    isCorrect: false,
                    answer: '25'
                },
            ],
        },
        {
            id: 6,
            question: ' 62 + _____ = 65',
            answers: [
                {
                    isCorrect: false,
                    answer: '5'
                },
                {
                    isCorrect: false,
                    answer: '4'
                },
                {
                    isCorrect: true,
                    answer: '3'
                },
                {
                    isCorrect: false,
                    answer: '6'
                },
            ],
        },
        {
            id: 7,
            question: 'The number preceding the number 15 is:',
            answers: [
                {
                    isCorrect: false,
                    answer: '16'
                },
                {
                    isCorrect: false,
                    answer: '17'
                },
                {
                    isCorrect: true,
                    answer: '14'
                },
                {
                    isCorrect: false,
                    answer: '12'
                },
            ],
        },
        {
            id: 8,
            question: '12 + 5 - 7 = ?',
            answers: [
                {
                    isCorrect: true,
                    answer: '10'
                },
                {
                    isCorrect: false,
                    answer: '17'
                },
                {
                    isCorrect: false,
                    answer: '15'
                },
                {
                    isCorrect: false,
                    answer: '19'
                },
            ],
        },
    ],
    renderQuestions() {
        let htmls = this.questions.map(ques => {
            let answer = ques.answers.map((ans, index) => {
                return `
                    <li class="answer">
                        <span class="answer-index">${index + 1}. </span>
                        <span class="answer-text">${ans.answer}</span>
                    </li>
                `
            }).join('')
            return `
            <li class="question">
                <h3 class="question-tilte">
                    <span class="question-index">Question ${ques.id}: </span>
                    <span class="question-text">${ques.question}</span>
                </h3>
                <ul class="answers">
                    ${answer}
                </ul>
            </li>
            `
        })
        questionsList.innerHTML = htmls.join('')
    },
    handleEvents() {
        const _this = this;

        //start game
        startBtn.onclick = () => {
            startPart.classList.add('hide')
            loaddingPart.classList.remove('hide')
            setTimeout(() => {
                loaddingPart.classList.add('hide')
            }, 1000)
            setTimeout(() => {
                gamePart.classList.remove('hide')
            }, 1000)
            _this.renderQuestions();
        }

        // next question
        nextQuesBtn.onclick = function () {
            _this.handleClickNextQuestion();
        }
        //prev question
        prevQuesBtn.onclick = function () {
            _this.handleClickPrevQuestion();
        }
        // handle click answer the question
        questionsList.onclick = e => {
            let answer = e.target.closest('.answer');
            if (answer) {
                let parent = answer.parentElement;
                parent.querySelectorAll('.answer').forEach(item => item.classList.remove('active'))
                answer.classList.add('active');
            }
        }
        //handle submit the answer
        checkBtn.onclick = () => {
            let currentQuesElm = $$('.question')[this.currentIndex]
            let answersElm = currentQuesElm.querySelectorAll('.answer')
            let indexActive = null;
            for (let i = 0; i < answersElm.length; i++) {
                if (answersElm[i].classList.contains('active')) {
                    _this.isChoosed = true;
                    indexActive = i;
                    break;
                }
            }
            if (!_this.isChoosed) {
                gameMessage.classList.remove('hide', 'error', 'success');
                gameMessage.innerText = 'Please choose your answer'
            } else {
                gameMessage.classList.add('hide')
                gameMessage.innerText = '';
                let answerValue = answersElm[indexActive].querySelector('.answer-text').innerText;
                if (_this.checkCorrectAnswer(answerValue)) {
                    setTimeout(() => {
                        answersElm.forEach(ans => ans.classList.remove('correct', 'incorrect', 'active'));
                        answersElm[indexActive].classList.add('correct')
                        gameMessage.classList.remove('hide', 'error')
                        gameMessage.classList.add('success')
                        gameMessage.innerText = 'Correct answer!!'
                    }, 500)
                } else {
                    setTimeout(() => {
                        answersElm.forEach(ans => ans.classList.remove('correct', 'incorrect', 'active'));
                        gameMessage.classList.remove('hide', 'success')
                        gameMessage.classList.add('error')
                        gameMessage.innerText = 'Incorrect answer!!'
                        answersElm[indexActive].classList.add('incorrect')
                    }, 500)
                }
            }
        }

    },
    checkCorrectAnswer(val) {
        let curAnswer = this.currentQuestion.answers.find(answer => {
            return answer.isCorrect == true;
        })
        return curAnswer.answer === val;
    },
    handleClickPrevQuestion() {
        const questions = $$('.question');
        let quesWidth = questions[0].offsetWidth
        prevQuesBtn.classList.remove('disabled')
        nextQuesBtn.classList.remove('disabled')
        gameMessage.classList.add('hide')
        this.isChoosed = false
        if (this.currentIndex > 0) {
            this.translateX += quesWidth
            this.currentIndex--;
            if (this.currentIndex <= 0) {
                prevQuesBtn.classList.add('disabled')
            }
        } else {
            return
        }
        questionsList.style.transform = `translateX(${this.translateX}px)`
    },
    handleClickNextQuestion() {
        const questions = $$('.question');
        let quesWidth = questions[0].offsetWidth
        prevQuesBtn.classList.remove('disabled')
        nextQuesBtn.classList.remove('disabled')
        gameMessage.classList.add('hide')
        this.isChoosed = false
        if (this.currentIndex < questions.length - 1) {
            this.translateX -= quesWidth
            prevQuesBtn.classList.remove('disabled')
            this.currentIndex++;
            if (this.currentIndex >= questions.length - 1) {
                nextQuesBtn.classList.add('disabled')
            }
        } else {
            return
        }
        questionsList.style.transform = `translateX(${this.translateX}px)`
    },
    defindProperties() {
        Object.defineProperty(this, 'currentQuestion', {
            get: function () {
                return this.questions[this.currentIndex]
            }
        })
    },
    start() {
        this.defindProperties();
        this.handleEvents();
    }
}

app.start();


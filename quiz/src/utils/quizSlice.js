import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
    name: "quiz",
    initialState: {
        questions: [],
        currentQuestionIndex: 0,
        selectedAnswers: [],
        score: 0
    },
    reducers: {
        setQuestions: (state, action) => { state.questions = action.payload },
        selectAnswer: (state, action) => { state.selectedAnswers[action.payload.questionIndex] = action.payload.answer },
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1
            }
        },
        prevQuestion: (state) => {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex--
            }
        },
        calculateScore: (state, action) => { state.score = action.payload },
        resetQuiz: (state) => {
            state.questions = []
            state.currentQuestionIndex = 0
            state.selectedAnswers = []
            state.score = 0
        }
    }
})

export const {
    setQuestions,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    calculateScore,
    resetQuiz
} = quizSlice.actions

export default quizSlice.reducer
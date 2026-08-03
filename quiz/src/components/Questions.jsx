import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextQuestion, prevQuestion, setQuestions, selectAnswer, calculateScore } from "../utils/quizSlice";

function Questions() {
    const dispatch = useDispatch()
    const questions = useSelector((store) => store.quiz.questions)
    const currentQuestionIndex = useSelector((store) => store.quiz.currentQuestionIndex)
    const selectedAnswers = useSelector((store) => store.quiz.selectedAnswers)
    const score = useSelector((store) => store.quiz.score)
    const selectedAnswer = selectedAnswers[currentQuestionIndex]
    const correctAnswer = questions[currentQuestionIndex]?.correctAnswer

    console.log(questions);

    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5)
    }

    const calculateFinalScore = () => {

        let score = 0;

        questions.forEach((question, index) => {

            if (question.correctAnswer === selectedAnswers[index]) {
                score++;
            }

        });

        dispatch(calculateScore(score));
    };

    const getQuestions = async () => {
        const res = await fetch(`https://the-trivia-api.com/v2/questions?categories=technology&difficulty=hard&limit=10`)
        const data = await res.json()
        // console.log(data);
        const formattedQuestions = data.map((item) => {

            const options = [
                item.correctAnswer,
                ...item.incorrectAnswers
            ]
            return {
                question: item.question.text,
                options: shuffleArray(options),
                correctAnswer: item.correctAnswer,
                difficulty: item.difficulty,
                category: item.category
            }
        })
        dispatch(setQuestions(formattedQuestions))
    }

    useEffect(() => {
        getQuestions()
    }, [])
    // if (currentQuestionIndex < 0) return
    return (
        <div className="h-screen bg-pink-200 text-gray-600 p-4 font-bold ">
            <div>

                {
                    questions[currentQuestionIndex]?.question
                }
            </div>
            <div className="flex flex-col my-2 p-2 ">{questions[currentQuestionIndex]?.options.map((option, index) => <p onClick={() => dispatch(selectAnswer({
                questionIndex: currentQuestionIndex,
                answer: option
            }))} key={index} className={`
                                    my-2 p-2 w-[50%] rounded-xl border cursor-pointer

                                    ${selectedAnswer === option
                    ? selectedAnswer === correctAnswer
                        ? "bg-green-400 border-green-600"
                        : "bg-red-400 border-red-600"
                    : "bg-gray-300 border-black"
                }
                                `}>{option}</p>)} </div>

            <div className="flex justify-between">
                <button onClick={() => dispatch(prevQuestion())}>Previous</button>
                <button onClick={() => {
                    if (currentQuestionIndex === questions.length - 1) {
                        calculateFinalScore();
                    }
                    else {
                        dispatch(nextQuestion());
                    }
                }}>{currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}</button>
            </div>

            <div>
                {
                    currentQuestionIndex === questions.length - 1
                        ? `Score:${score}`
                        : ""
                }
            </div>
        </div>
    )
}

export default Questions

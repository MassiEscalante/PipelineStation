import { useState } from "react";
import type { Question } from "../models/Question";
import { getQuestions } from "../services/questionApi";

interface QuizProps {
  questions?: Question[]; // Allow injecting questions via props (useful for tests)
}

const Quiz = ({ questions: propQuestions = [] }: QuizProps) => {
  const [questions, setQuestions] = useState<Question[]>(propQuestions); // Use injected questions or fetch them
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const fetchQuestions = async () => {
    try {
      const fetchedQuestions = await getQuestions();
      if (!fetchedQuestions) {
        throw new Error("Failed to fetch questions.");
      }
      setQuestions(fetchedQuestions);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = async () => {
    if (!propQuestions.length) {
      await fetchQuestions();
    }
    setQuizStarted(true);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const handleRestartQuiz = () => {
    setQuizCompleted(false);
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  if (!quizStarted) {
    return (
      <div className="p-4 text-center">
        <button className="btn btn-primary" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="card p-4 text-center">
        <h2>Quiz Completed</h2>
        <div className="alert alert-success">
          Your score: {score}/{questions.length}
        </div>
        <button className="btn btn-primary" onClick={handleRestartQuiz}>
          Take New Quiz
        </button>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="card p-4">
      <h2>{currentQuestion.question}</h2>
      <div className="mt-3">
        {currentQuestion.answers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <button
              className="btn btn-primary"
              onClick={() => handleAnswerClick(answer.isCorrect)}
            >
              {index + 1}
            </button>
            <div className="alert alert-secondary mb-0 ms-2 flex-grow-1">
              {answer.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

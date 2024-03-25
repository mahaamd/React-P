import { useQuestion } from "../context/QuestionProvider";

export default function StartScreen() {
  // numQuestions={questions.length} dispatch={dispatch}

  const { questions, start } = useQuestion();

  const numQuestions = questions.length;

  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button onClick={() => start()} className="btn btn-ui">
        Let's start
      </button>
    </div>
  );
}

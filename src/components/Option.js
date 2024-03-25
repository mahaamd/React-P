import React from "react";
import { useQuestion } from "../context/QuestionProvider";

export default function Option() {
  // { answare, questions, dispatch }
  const { questions, answare, newAnsware, index } = useQuestion();
  console.log("answare", answare);
  const hasAnswared = answare !== null;
  // const hasAnswared = null;
  console.log("hasans", hasAnswared);
  console.log(questions[index].options);

  return (
    <div className="options">
      {questions[index].options.map((option, QIndex) => (
        <button
          onClick={() => newAnsware(QIndex)}
          key={option}
          disabled={hasAnswared}
          className={`btn btn-option ${QIndex === answare ? "answer" : ""} ${
            hasAnswared
              ? QIndex === questions[index].correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

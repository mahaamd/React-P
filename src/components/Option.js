import React from "react";

export default function Option({ answare, questions, dispatch }) {
  const hasAnswared = answare !== null;
  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={option}
          disabled={hasAnswared}
          className={`btn btn-option ${index === answare ? "answer" : ""} ${
            hasAnswared
              ? index === questions.correctOption
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

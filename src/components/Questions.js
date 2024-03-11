import React from "react";
import Option from "./Option";
export default function Questions({ answare, questions, i, dispatch }) {
  const isContinued = i < questions.length - 1;
  return (
    <div>
      <h4>{questions[i].question}</h4>
      <div>
        <Option
          questions={questions[i]}
          dispatch={dispatch}
          answare={answare}
        />
      </div>

      {answare !== null && (
        <button
          className="btn btn-ui"
          onClick={() => {
            isContinued
              ? dispatch({ type: "newQuestion" })
              : dispatch({ type: "allAnswered" });
          }}
        >
          {isContinued ? "Next" : "finished "}
        </button>
      )}
    </div>
  );
}

import React from "react";
import Option from "./Option";
import Timer from "./Timer";

export default function Questions({
  answare,
  questions,
  i,
  dispatch,
  appTimer,
}) {
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
      <Timer appTimer={appTimer} />
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

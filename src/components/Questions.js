import React from "react";
import Option from "./Option";
import Timer from "./Timer";
import { useQuestion } from "../context/QuestionProvider";

export default function Questions() {
  const { questions, index, answare, appTimer, allAnswered, newQuestion } =
    useQuestion();

  // dispatch={dispatch}

  const isContinued = index < questions.length - 1;
  console.log(index);
  console.log(isContinued);
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <div>
        <Option />
      </div>
      <Timer appTimer={appTimer} />
      {answare !== null && (
        <button
          className="btn btn-ui"
          onClick={() => {
            isContinued ? newQuestion() : allAnswered();
          }}
        >
          {isContinued ? "Next" : "finished "}
        </button>
      )}
    </div>
  );
}

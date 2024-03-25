import React from "react";
import { useQuestion } from "../context/QuestionProvider";

export default function FinishScreen() {
  // dispatch={dispatch}

  const { highScore, points, questions, reset } = useQuestion();

  const maxPossiblePoints = questions.reduce(
    (PrevValue, currValue) => (PrevValue += currValue.points),
    0
  );

  const persentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <div className="result">
        Your socpred <strong>{points}</strong> out of {maxPossiblePoints}(
        {Math.ceil(persentage)}%)
      </div>
      <p className="highscore">highScore({highScore})</p>
      <button onClick={() => reset()} className="btn btn-ui">
        reset
      </button>
    </>
  );
}

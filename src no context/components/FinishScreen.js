import React from "react";

export default function FinishScreen({
  dispatch,
  highScore,
  points,
  maxPossiblePoints,
}) {
  const persentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <div className="result">
        Your socpred <strong>{points}</strong> out of {maxPossiblePoints}(
        {Math.ceil(persentage)}%)
      </div>
      <p className="highscore">highScore({highScore})</p>
      <button
        onClick={() => dispatch({ type: "reset" })}
        className="btn btn-ui"
      >
        reset
      </button>
    </>
  );
}

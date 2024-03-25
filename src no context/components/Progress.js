import React from "react";

export default function Progress({
  i,
  numOfQuestions,
  points,
  maxPossiblePoints,
  answare,
}) {
  return (
    <header className="progress">
      <progress
        value={i + Number(answare !== null)}
        max={numOfQuestions}
      ></progress>
      <p>
        <strong>{i}</strong> / {numOfQuestions}
      </p>

      <p>
        <strong>
          {points} / {maxPossiblePoints}
        </strong>
      </p>
    </header>
  );
}

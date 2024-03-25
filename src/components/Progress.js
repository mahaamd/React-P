import React from "react";
import { useQuestion } from "../context/QuestionProvider";

export default function Progress() {
  const { questions, points, index, answare } = useQuestion();

  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (PrevValue, currValue) => (PrevValue += currValue.points),
    0
  );

  return (
    <header className="progress">
      <progress
        value={index + Number(answare !== null)}
        max={numOfQuestions}
      ></progress>
      <p>
        <strong>{index}</strong> / {numOfQuestions}
      </p>

      <p>
        <strong>
          {points} / {maxPossiblePoints}
        </strong>
      </p>
    </header>
  );
}

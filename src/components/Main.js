import React, { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import { useQuestion } from "../context/QuestionProvider";

export default function Main() {
  // const [state, dispatch] = useReducer(reducer, initialState);

  const { status } = useQuestion();

  return (
    <main className="main">
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen />}

      {status === "active" && (
        <>
          <Progress />
          <Questions />
        </>
      )}
      {status === "finished" && (
        <FinishScreen
        // length={state.question.length}
        />
      )}
    </main>
  );
}

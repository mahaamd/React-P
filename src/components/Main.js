import React, { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  status: "loading",
  index: 13,
  answare: null,
  points: 0,
  highScore: 0,
  appTimer: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "datataFaild":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        appTimer: state.questions.length * 30,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answare: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "newQuestion":
      return { ...state, index: state.index + 1, answare: null };
    case "allAnswered":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
        appTimer: null,
      };
    case "timer":
      return {
        ...state,
        appTimer: state.appTimer > 0 ? state.appTimer - 1 : state.appTimer,
        status: state.appTimer === 0 ? "finished" : state.status,
      };
    case "reset":
      return { ...initialState, questions: state.questions, status: "ready" };
    default:
      throw new Error("unknown action type");
  }
}

export default function Main() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch(() => dispatch({ type: "datataFaild" }));
  }, []);

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(id);
    },
    [state.appTimer]
  );

  const maxPossiblePoints = state.questions.reduce(
    (PrevValue, currValue) => (PrevValue += currValue.points),
    0
  );

  return (
    <main className="main">
      {state.status === "loading" && <Loader />}
      {state.status === "error" && <Error />}
      {state.status === "ready" && (
        <StartScreen
          numQuestions={state.questions.length}
          dispatch={dispatch}
        />
      )}

      {state.status === "active" && (
        <>
          <Progress
            points={state.points}
            maxPossiblePoints={maxPossiblePoints}
            i={state.index}
            numOfQuestions={state.questions.length}
            answare={state.answare}
          />
          <Questions
            points={state.points}
            dispatch={dispatch}
            questions={state.questions}
            i={state.index}
            answare={state.answare}
            appTimer={state.appTimer}
          />
        </>
      )}
      {state.status === "finished" && (
        <FinishScreen
          // length={state.question.length}
          dispatch={dispatch}
          highScore={state.highScore}
          points={state.points}
          maxPossiblePoints={maxPossiblePoints}
        />
      )}
    </main>
  );
}

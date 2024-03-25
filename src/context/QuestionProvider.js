import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
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

const Questioncontext = createContext();

function QuestionProvider({ children }) {
  const [
    { highScore, answare, index, questions, status, points, appTimer },
    dispatch,
  ] = useReducer(reducer, initialState);

  //function getAllQuestions() {
  useEffect(function () {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // console.log(index);
        dispatch({ type: "dataRecieved", payload: data });
      })
      .catch(() => dispatch({ type: "datataFaild" }));
  }, []);
  //}

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(id);
    },
    [appTimer]
  );

  function allAnswered() {
    dispatch({ type: "allAnswered" });
  }

  function newQuestion() {
    dispatch({ type: "newQuestion" });
  }

  function newAnsware(newQindex) {
    dispatch({ type: "newAnswer", payload: newQindex });
  }

  function reset() {
    dispatch({ type: "reset" });
  }

  const start = () => {
    console.log("in the start of the application", index);
    dispatch({ type: "start" });
  };

  return (
    <Questioncontext.Provider
      value={{
        questions,
        appTimer,
        status,
        points,
        index,
        answare,
        highScore,
        allAnswered,
        newQuestion,
        newAnsware,
        reset,
        start,
      }}
    >
      {children}
    </Questioncontext.Provider>
  );
}

function useQuestion() {
  const context = useContext(Questioncontext);
  if (context === undefined) {
    throw new Error("not initilized in provider part");
  }
  return context;
}

export { QuestionProvider, useQuestion };

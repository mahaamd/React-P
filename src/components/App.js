import { QuestionProvider } from "../context/QuestionProvider";
import Header from "./Header";
import Main from "./Main";
export default function App() {
  return (
    <div className="app">
      <Header />
      <QuestionProvider>
        <Main />
      </QuestionProvider>
    </div>
  );
}
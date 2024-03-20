import React from "react";
import StartScreen from "./components/StartScreen";
import Header from "./components/Header";
import QuizContextProvider from "./components/Quiz Components/QuizContextProvider";
import ResultsScreen from "./components/Results Screen/ResultsScreen";

// TODO: SA FAC UN CONTEXT PENTRU TOATA APLICATIA IN CARE SA BAG CE E LA QUIZ CONTEXT

function App() {
    const [appState, setAppState] = React.useState("startScreen");

    let element = undefined;

    function handleOnStart(){
        setAppState("quizRunning");
    }

    if(appState === "startScreen")
        element = <StartScreen onStartClick={handleOnStart}/>
    else
        if(appState === "quizRunning")
            element = <QuizContextProvider appState={appState} setAppState={setAppState}/>
        else
            if(appState === "showResults")
                element = <ResultsScreen />

    return(
        <>
          <Header />
          {element}
        </>
    );    
}

export default App;

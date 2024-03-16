import React from "react";
import StartScreen from "./components/StartScreen";
import Header from "./components/Header";
import Quiz from "./components/Quiz Components/Quiz";


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
            element = <Quiz setAppState={setAppState}/>

    return(
        <>
          <Header />
          {element}
        </>
    );    
}

export default App;

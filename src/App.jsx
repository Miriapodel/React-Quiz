import React from "react";
import StartScreen from "./components/StartScreen";
import Header from "./components/Header";
import ResultsScreen from "./components/Results Screen/ResultsScreen";
import Quiz from "./components/Quiz Components/Quiz";
import questions from "./questions";

export const AppContext = React.createContext({
    currentQuestion: {},
    setTimerFinished: () => {},
    dispatchAnswers : () => {},
    answers: [],
    currentQuestions: [],
    resetApp: () => {}
});

function getRandomQuestions(){
    const randomNumber = Math.floor( (Math.random() * questions.length) )

    if(randomNumber == questions.length - 1)
        return [questions[randomNumber], questions[randomNumber - 1], questions[randomNumber - 2]];
    else
        if(randomNumber == 0)
            return [questions[randomNumber], questions[randomNumber + 1], questions[randomNumber + 2]];
        else
            return [questions[randomNumber], questions[randomNumber - 1], questions[randomNumber + 1]];
}

function shuffle(answers){
    const winner = answers[0];

    for(let i = answers.length - 1; i >= 0; i--){
        const j = Math.floor(Math.random() * (i + 1));

        [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    return answers;
}

function getWinnerIndex(answer, winner){
    for(let i = 0; i < answer.length; i++)
        if(answer[i] === winner)
            return i;

    return -1;
}

function handleAnswersDispatch(state, action){
    if(action.type === "append")
        return [...state, action.payload];
    
    if(action.type === "reset")
        return [];
}



function App() {
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [timerFinished, setTimerFinished] = React.useState(false);
    const [currentQuestions, setCurrentQuestions] = React.useState(0);
    const [answers, dispatchAnswers] = React.useReducer(handleAnswersDispatch, []);
    const [appState, setAppState] = React.useState("startScreen");

    let element = undefined;

    React.useEffect(()=>{ // efect care se declanseaza daca timerFinished se schimba
                          // anunta practic ca o intrebare s-a terminat si vedem ce se intampla mai departe
        if(questionIndex < 2 && timerFinished === true){ // daca mai sunt intrebari, trecem la urmatoarea
            setTimerFinished(false);
            setQuestionIndex(previousIndex => previousIndex + 1);
        }
        else if(questionIndex >= 2 && timerFinished === true){ // nu mai sunt intrebari si trecem la
            setTimerFinished(false);
            setAppState("showResults");                         // ecranul cu performantele utilizatorului
        }
    }, [timerFinished])

    React.useEffect(() =>{
        
        if(appState === "quizRunning" && questionIndex  === 0){
            const randomQuestions = getRandomQuestions();

            for(let i = 0; i < randomQuestions.length; i++){
                const winner = randomQuestions[i].answers[0];
                const shuffledAnswers = shuffle(randomQuestions[i].answers);
                const winnerIndex = getWinnerIndex(shuffledAnswers, winner);
            
                randomQuestions[i] = {
                    ...randomQuestions[i],
                    answers: shuffledAnswers,
                    winnerIndex: winnerIndex,
                    chosenAnswerIndex : - 1
                }
            }
            setCurrentQuestions(randomQuestions);
        }

    }, [appState])

    function resetApp(){

        dispatchAnswers({type:"reset"});
        setQuestionIndex(0);
        setCurrentQuestions(0);
        setAppState("startScreen");
    }

    const propForContext = {
        currentQuestion : currentQuestions[questionIndex],
        setTimerFinished: setTimerFinished,
        dispatchAnswers : dispatchAnswers,
        answers : answers,
        currentQuestions: currentQuestions,
        resetApp: resetApp
    }

    function handleOnStart(){
        setAppState("quizRunning");
    }

    if(appState === "startScreen")
        element = <StartScreen onStartClick={handleOnStart}/>
    else
        if(appState === "quizRunning")
            element = <Quiz/>
        else
            if(appState === "showResults")
                element = <ResultsScreen />

    return(
        <>
          <Header />

          <AppContext.Provider value={propForContext}>
            {element}
          </AppContext.Provider>

        </>
    );    
}

export default App;

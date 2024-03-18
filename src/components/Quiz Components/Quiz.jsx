import React from "react";
import QuizQuestion from "./QuizQuestion.jsx";
import questions from "../../questions.js";

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


function Quiz({appState, setAppState}){

    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [timerFinished, setTimerFinished] = React.useState(false);
    const [currentQuestions, setCurrentQuestions] = React.useState(0);

    React.useEffect(()=>{ // efect care se declanseaza daca timerFinished se schimba
                          // anunta practic ca o intrebare s-a terminat si vedem ce se intampla mai departe
        if(questionIndex < 2 && timerFinished === true){ // daca mai sunt intrebari, trecem la urmatoarea
            setTimerFinished(false);
            setQuestionIndex(previousIndex => previousIndex + 1);
        }
        else if(questionIndex >= 2 && timerFinished === true){ // nu mai sunt intrebari si trecem la
            setAppState("showResult");                         // ecranul cu performantele utilizatorului
}

    }, [timerFinished])


    React.useEffect(() =>{

        if(appState === "quizRunning" && questionIndex === 0){
            const randomQuestions = getRandomQuestions();

            for(let i = 0; i < randomQuestions.length; i++){
                const winner = randomQuestions[i].answers[0];
                const shuffledAnswers = shuffle(randomQuestions[i].answers);
                const winnerIndex = getWinnerIndex(shuffledAnswers, winner);
            
                randomQuestions[i] = {
                    ...randomQuestions[i],
                    answers: shuffledAnswers,
                    winnerIndex: winnerIndex
                }
            }

            setCurrentQuestions(randomQuestions);
            setQuestionIndex(0);
        }

    }, [appState])

    return(
        <div id="quiz">

        <QuizQuestion currentQuestion={currentQuestions[questionIndex]} setTimerFinished={setTimerFinished}/>

        </div>
    );
}

export default Quiz;
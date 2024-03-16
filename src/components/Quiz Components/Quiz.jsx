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

const randomQuestions = getRandomQuestions();

function Quiz({setAppState}){

    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [timerFinished, setTimerFinished] = React.useState(false);

    React.useEffect(()=>{
        
        if(questionIndex < 2 && timerFinished === true){
            setTimerFinished(false);
            setQuestionIndex(previousIndex => previousIndex + 1);
        }
        else if(questionIndex >= 2 && timerFinished === true){
            setAppState("showResult");
}

    }, [timerFinished])


    return(
        <div id="quiz">

        <QuizQuestion currentQuestion={randomQuestions[questionIndex]} setTimerFinished={setTimerFinished}/>

        </div>
    );
}

export default Quiz;
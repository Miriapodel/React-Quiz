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

function Quiz(){

    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [timerFinished, setTimerFinished] = React.useState(false);
    const randomQuestions = getRandomQuestions();

    // un useEffect pentru atunci cand se ghiceste o intrebare
    // sau cand expira timpul
    // sa fie aici o variabila de genul timeExpired

    return(
        <div id="quiz">

        <QuizQuestion currentQuestion={randomQuestions[questionIndex]} />

        </div>
    );
}

export default Quiz;
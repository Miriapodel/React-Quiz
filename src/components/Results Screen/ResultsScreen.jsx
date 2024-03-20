import React from "react";
import { QuizContext } from "../Quiz Components/QuizContextProvider";
import ResultProcents from "./ResultProcents";

function getCorrectAnswersIndexes(questions){
    
    const indexes = questions.map((question) => {return question.winnerIndex});

    return indexes;
}

function getNumSkiped(answers){
    let num = 0;

    answers.forEach(element => {
        if(element == -1)
            num += 1;
    });

    return num;
}

function getNumAnsCor(correctAnsInd, userAnsInd){
    let num = 0;

    for(let i = 0; i < correctAnsInd.length; i++)
        if(correctAnsInd[i] === userAnsInd[i])
            num += 1;

    return num
}

function ResultsScreen(){

    const quizContext = React.useContext(QuizContext);
    const currentQuestions = quizContext.currentQuestions;
    console.log(currentQuestions);
    const correctAnswersIndexes = getCorrectAnswersIndexes(currentQuestions);
    const userAnswersIndexes = quizContext.answers;

    const procSkiped = Math.floor(getNumSkiped(userAnswersIndexes) / currentQuestions.length);
    const procAnsCor = Math.floor(getNumAnsCor(correctAnswersIndexes, userAnswersIndexes) / currentQuestions.length);
    const procAnsInc = 100 - procAnsCor;



    return(
        <div id="summary">
            <img src="src/assets/quiz-complete.png"></img>
            <h2>QUIZ COMPLETED!</h2>
            <div className="summary-stats">
                <ResultProcents valProc={procSkiped} text="Skipped"/>
                <ResultProcents valProc={procAnsCor} text="Answered correctly"/>
                <ResultProcents valProc={procAnsInc} text="Answered incorrectly"/>
            </div>
        </div>
    );
}

export default ResultsScreen;
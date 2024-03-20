import React from "react";
import { AppContext } from "../../App";
import ResultPercentages from "./ResultPercentages";

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
    console.log("Usr: ", userAnsInd);
    console.log("Cor: ", correctAnsInd)

    for(let i = 0; i < correctAnsInd.length; i++)
        if(correctAnsInd[i] === userAnsInd[i])
            num += 1;


    console.log("Num: ",num);
    
    return num
}

function createListItem(item, index, answerInd){

    let className = "user-answer";

    if(answerInd[index] === item.winnerIndex)
        className += " correct";
    else
        if(answerInd[index] == -1)
            className += " skipped";
        else
            className += " wrong";

    const question = item.text;
    const chosenAnswer = answerInd[index] != -1 ? item.answers[answerInd[index]] : "Question skipped";

    return (
        <li key={index}>
            <h3>{index + 1}</h3>
            <p className="questions">{question}</p>
            <p className={className}>{chosenAnswer}</p>
        </li>
    );
}



function ResultsScreen(){

    const quizContext = React.useContext(AppContext);
    const currentQuestions = quizContext.currentQuestions;
    const correctAnswersIndexes = getCorrectAnswersIndexes(currentQuestions);
    const userAnswersIndexes = quizContext.answers;

    const procSkiped = Math.floor((getNumSkiped(userAnswersIndexes) / currentQuestions.length) * 100);
    const procAnsCor = Math.floor((getNumAnsCor(correctAnswersIndexes, userAnswersIndexes) / currentQuestions.length) * 100);
    const procAnsInc = 100 - procAnsCor - procSkiped;


    return(
        <div id="summary">
            <img src="src/assets/quiz-complete.png"></img>
            <h2>QUIZ COMPLETED!</h2>
            <div id="summary-stats">
                <ResultPercentages valProc={procSkiped} text="Skipped"/>
                <ResultPercentages valProc={procAnsCor} text="Answered correctly"/>
                <ResultPercentages valProc={procAnsInc} text="Answered incorrectly"/>
            </div>
                <ol>
                    {currentQuestions.map((item, index) => createListItem(item, index, userAnswersIndexes))}
                </ol>
            <button onClick={() => {quizContext.resetApp()}}>RESTART</button>
        </div>
    );
}

export default ResultsScreen;
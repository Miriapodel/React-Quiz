import React from "react";
import { QuizContext } from "./QuizContextProvider";

const TIMER = 1000;


function QuizQuestion(){
  const [timeRemaining, setTimeRemaining] = React.useState(TIMER);
  const [choseAnswer, setChoseAnswer] = React.useState(false);

  const context = React.useContext(QuizContext);

  React.useEffect( () => {           // intervalul pentru update-ul progresului
    let interval;
    let timeOut;
    
    if(context.currentQuestion){
      interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 50);
    }, 50);

     timeOut = setTimeout( () => {     // se anunta ca timer-ul a expirat 
      context.setTimerFinished(true);
    }, TIMER);

      setTimeRemaining(TIMER); 
      setChoseAnswer(false);
                                                                                  // cod pentru a reseta stilul butoanelor pentru fiecare intrebare
      Array.from(document.getElementsByTagName("button")).forEach(element => {   // daca a raspuns inainte corect, sa nu ramana stilizarea si la urm intrebare
        element.classList.remove("wrong", "correct");
      });
    }

    return () => {
        clearInterval(interval);
        clearTimeout(timeOut);
    }
  }, [context.currentQuestion]);

  function handleButtonOnClick(event, index){

    context.dispatchAnswers({type:"append", payload:index});

    if(!choseAnswer){
      if(index === context.currentQuestion.winnerIndex)
        event.target.className += " correct";
      else
        event.target.className += " wrong";

      setChoseAnswer(true);
    }
  }
  
  
  function createButtonsFromsAnswer(answer, index){
  
        return <button key={index} onClick={(event) => handleButtonOnClick(event, index)}>{answer}</button>
  }

  return (
    <div id="question">
      <progress value={timeRemaining} max={TIMER} />
      <h2>{context.currentQuestion ? context.currentQuestion.text : null}</h2>

      <div className="answer">
        {context.currentQuestion ? context.currentQuestion.answers.map((answer, index) => createButtonsFromsAnswer(answer, index, context.currentQuestion.winnerIndex)) : null}
      </div>
      
    </div>
  );
}

export default QuizQuestion;

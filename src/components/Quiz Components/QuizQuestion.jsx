import React from "react";
import { AppContext } from "../../App";

const TIMER = 2000;
const CHOSEN_ANSWER_TIMER = 1000;


function QuizQuestion(){
  const [timeRemaining, setTimeRemaining] = React.useState(TIMER);
  const [choseAnswer, setChoseAnswer] = React.useState(false);
  const intervalRef = React.useRef();
  const timeoutRef = React.useRef();

  const context = React.useContext(AppContext);

  React.useEffect( () => {           // intervalul pentru update-ul progresului
    let interval;
    let timeOut;
    
    console.log("àaaaaa");

    if(context.currentQuestion){
      intervalRef.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 50);
    }, 50);

     timeoutRef.current = setTimeout( () => {     // se anunta ca timer-ul a expirat 
      context.setTimerFinished(true);
      context.dispatchAnswers({type:"append", payload:-1});
    }, TIMER);

      setTimeRemaining(TIMER); 
      setChoseAnswer(false);
                                                                                  // cod pentru a reseta stilul butoanelor pentru fiecare intrebare
      Array.from(document.getElementsByTagName("button")).forEach(element => {   // daca a raspuns inainte corect, sa nu ramana stilizarea si la urm intrebare
        element.classList.remove("wrong", "correct");
      });
    }

    return () => {
        clearInterval(intervalRef.current);
        clearTimeout(timeoutRef.current);
    }
  },[context.currentQuestion]);

  function handleButtonOnClick(event, index){
   
    if(!choseAnswer){
      context.dispatchAnswers({type:"append", payload:index});

      if(index === context.currentQuestion.winnerIndex)
        event.target.className += " correct";
      else
        event.target.className += " wrong";

      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);

      setTimeRemaining(TIMER);

      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 50 * (TIMER / CHOSEN_ANSWER_TIMER));
      }, 50);
  
      timeoutRef.current = setTimeout( () => {     // se anunta ca timer-ul a expirat 
        clearInterval(intervalRef.current);
        context.setTimerFinished(true);
      }, CHOSEN_ANSWER_TIMER);

      setChoseAnswer(true);
      
    }
  }

  function handleSkip(){
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    context.setTimerFinished(true);
    context.dispatchAnswers({type:"append", payload:-1});
    console.log(context.currentQuestion);
  }
  
  function createButtonsFromsAnswer(answer, index){
  
        return <button key={index} onClick={(event) => handleButtonOnClick(event, index)}>{answer}</button>
  }

  return (
    <div id="question">
      <progress value={timeRemaining} max={TIMER} />
      <button onClick={handleSkip}>SKIP</button>
      <h2>{context.currentQuestion ? context.currentQuestion.text : null}</h2>

      <div className="answer">
        {context.currentQuestion ? context.currentQuestion.answers.map((answer, index) => createButtonsFromsAnswer(answer, index, context.currentQuestion.winnerIndex)) : null}
      </div>
      
    </div>
  );
}

export default QuizQuestion;

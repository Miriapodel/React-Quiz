import React from "react";

const TIMER = 5000;


function QuizQuestion({setTimerFinished, currentQuestion}){
  const [timeRemaining, setTimeRemaining] = React.useState(TIMER);
  const [choseAnswer, setChoseAnswer] = React.useState(false);

  React.useEffect( () => {                                             // intervalul pentru update-ul progresului
    let interval;
    let timeOut;
    
    if(currentQuestion){
      interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 50);
    }, 50);

     timeOut = setTimeout( () => {                                 // se anunta ca timer-ul a expirat 
      setTimerFinished(true)
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
  }, [currentQuestion]);

  function handleButtonOnClick(event, index){

    if(!choseAnswer){
      if(index === currentQuestion.winnerIndex)
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
      <h2>{currentQuestion ? currentQuestion.text : null}</h2>

      <div className="answer">
        {currentQuestion ? currentQuestion.answers.map((answer, index) => createButtonsFromsAnswer(answer, index, currentQuestion.winnerIndex)) : null}
      </div>
      
    </div>
  );
}

export default QuizQuestion;

import React from "react";

const TIMER = 5000;

function createButtonsFromsAnswer(answer, index){
    return <button key={index}>{answer}</button>
}

function QuizQuestion({setTimerFinished, currentQuestion}){
  const [timeRemaining, setTimeRemaining] = React.useState(TIMER);

  React.useEffect( () => {                                             // intervalul pentru update-ul progresului
    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 50);
    }, 50);

    return () => {
        clearInterval(interval);
    }
  }, [currentQuestion]);

  React.useEffect( () => {                                              // dupa ce trec TIMER secunde intrebarea expira
    const timeOut = setTimeout( () => {                                 // se anunta ca timer-ul a expirat 
        setTimerFinished(true)
    }, TIMER);

    setTimeRemaining(TIMER);                                            // resetez timer-ul la TIMER secunde
    console.log(currentQuestion);

    return () => {
        clearTimeout(timeOut);
    }
  }, [currentQuestion]);

  return (
    <div id="question">
      <progress value={timeRemaining} max={TIMER} />
      <h2>{currentQuestion.text}</h2>

      <div className="answer">
        {currentQuestion.answers.map(createButtonsFromsAnswer)}
      </div>
      
    </div>
  );
}

export default QuizQuestion;

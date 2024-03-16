import React from "react";

const TIMER = 5000;

function QuizQuestion(){
    const [timeRemaining, setTimeRemaining] = React.useState(TIMER);

 React.useEffect( () => {
        setInterval(() =>{
            setTimeRemaining( prevTimeRemaining => prevTimeRemaining - 10);
            console.log("merge");
        }, 10);
    }, []);

    return(
        <div >
            <progress value={timeRemaining} max={TIMER} />
            quiz
        </div>
    );
}

export default QuizQuestion;
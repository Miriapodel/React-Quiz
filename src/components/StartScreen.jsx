import React from "react";
import Button from "./Button";

function StartScreen({onStartClick}){
    return(
        <div className="start-component">
            <h2>Apasa pe butonul START pentru a incepe</h2>
            <Button text={"START"} onClick={onStartClick}/>
        </div>
    );
}

export default StartScreen;
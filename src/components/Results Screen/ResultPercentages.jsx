import React from "react";

function ResultProcents({valProc, text}){
    return(
        <div >
            <span className="number">
                {valProc}%
            </span>
            <p>{text}</p>
        </div>
    );
}

export default ResultProcents;
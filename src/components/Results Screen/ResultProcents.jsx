import React from "react";

function ResultProcents({valProc, text}){
    return(
        <span>
            <span className="number">
                {valProc}
            </span>
            <p>{text}</p>
        </span>
    );
}

export default ResultProcents;
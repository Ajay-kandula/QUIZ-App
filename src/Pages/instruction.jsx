import React from "react";
import {useNavigate, Link } from "react-router-dom";
const navigate=useNavigate()
function Instructions(){
    const Handle=(e)=>{
        e.preventSefault()
        navigate('/quiz')
    }
    return(
        <>
        <h1>📝 Quiz Instructions</h1>
        <ul>
            <li>📚 The exam contains a total of 30 questions.</li>
            <li>⏱️ Each question has a time limit of 30 seconds.</li>
            <li>🕒 Total duration of the exam is 1 hour and 30 minutes.</li>
            <li>🔁 Once you click "Next" or the timer runs out, you cannot go back to the previous question.</li>
            <li>❌ There are no negative marks for wrong answers.</li>
            <li>✅ After completing all questions, click on "Submit" to view your score.</li>
            <li>🔍 You can review the entire quiz after submission by clicking on the "Review" button.</li>
            
        </ul>
        <button onClick={Handle}>Start</button>
        </>
    )

}
export default Instructions;
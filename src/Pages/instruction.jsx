import React from "react";
import {useNavigate, Link } from "react-router-dom";
import inst from 'https://ibb.co/ZRLXyTGT'

function Instructions(){
    const navigate=useNavigate();
    const Handle=(e)=>{
        e.preventDefault()
        navigate('/quiz')
    }
    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",backgroundImage:`url(${inst})`,backgroundPosition:'center',backgroundSize:"cover",height:"100vh",width:'100vw'}}>
        <h1>📝 Quiz Instructions</h1>
        <ul style={{display:"flex",border:'2px solid #ccc',borderRadius:"6px",flexDirection:"column",justifyContent:"center",height:"300px",marginTop:"2px",gap:"5px"}}>
            <li>📚 The exam contains a total of 30 questions.</li>
            <li>⏱️ Each question has a time limit of 30 seconds.</li>
            <li>🕒 Total duration of the exam is 1 hour and 30 minutes.</li>
            <li>🔁 Once you click "Next" or the timer runs out, you cannot go back to the previous question.</li>
            <li>❌ There are no negative marks for wrong answers.</li>
            <li>✅ After completing all questions, click on "Submit" t  o view your score.</li>
            <li>🔍 You can review the entire quiz after submission by clicking on the "Review" button.</li>
            <li>Ckick 'Start' below to Start the Exam</li>
            <li>You need to answer atleast one question to submit the quiz</li>
            
        </ul>
        <button onClick={Handle} style={{width:"150px",backgroundColor:"#2a52be",color:"white",fontWeight:"bold"}}>Start</button>
        </div>
    )

}
export default Instructions;
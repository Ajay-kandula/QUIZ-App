import React from "react";
import {useNavigate, Link } from "react-router-dom";


function Instructions(){
    const navigate=useNavigate();
    const isMobile=window.innerWidth<768;
    const Handle=(e)=>{
        e.preventDefault()
        navigate('/quiz')
    }
    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",backgroundImage:`url("https://i.ibb.co/cSczX4KX/Whats-App-Image-2025-07-23-at-16-24-15-367184b6-compressed.webp")`,backgroundPosition:'center',backgroundSize:"cover",height:"100vh",width:'100vw'}}>
        <h1 style={{fontSize:isMobile?"40px":"60px",fontWeight:"bold"}}>📝 Quiz Instructions</h1>
        <ul style={{display:"flex",border:'2px solid #ccc',borderRadius:"6px",flexDirection:"column",justifyContent:"center",height:isMobile?"60%":"90%",width:isMobile?"70%":"50%",marginTop:"2px",gap:"5px"}}>
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
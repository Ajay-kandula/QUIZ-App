import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Review=()=>{
    const[reviewdata,setReviewdata]=useState([])
    const navigate=useNavigate()
    const token=localStorage.getItem('token');
    const isMobile=window.innerWidth<768;
    console.log('Token:',token);
    useEffect(()=>{
        axios.get('https://quiz-app-backend-quiz.onrender.com/api/result/review',{
            headers:{
                Authorization:`Bearer ${token}`
            }
            
        })
        .then(res=>{
            setReviewdata(res.data.answers)
        })
        .catch(err=>{
            console.error('failed  to fetch review ',err)
            navigate('/quiz')
        });
    },[navigate,token])
    if(!reviewdata) return<p>Loading Review....</p>
    const handleExit=(e)=>{
        e.preventDefault()
        navigate('/Login')

    }
    return(
        <div style={{backgroundColor:"#f3f3f3ff",display:'flex',flexDirection:"column",justifyContent:"center",width:"100vw",color:"white",fontSize:"30px",textAlign:'center'}}>
            <h1 style={{color:'red'}}> Review Page</h1>
            {reviewdata.map((ans,index)=>(
                <div key={index} style={{border:"2px solid black",borderRadius:"8px",padding:"8px",margin:'10px 20px',backgroundColor:"#6fa8dc"}}>
                    <p>Q{index+1}:<strong>{ans.question}</strong></p>
                    <p>Your Answer:{ans.selectedanswer}</p>
                    <p>{ans.isCorrect? "correct":`Wrong | correctAnswer :${ans.correctAnswer}`}</p>
                </div>
            ))};
            <button onClick={handleExit} style={{color:"white",backgroundColor:"red",padding:"8px 12px",width:isMobile?"50px":"100px",marginLeft:isMobile?'100px':'250px'}}>Exit</button>
        </div>
    )
}
export default Review;
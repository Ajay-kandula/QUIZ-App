import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Review=()=>{
    const[reviewdata,setReviewdata]=useState([])
    const navigate=useNavigate()
    const token=localStorage.getItem('token');
    console.log('Token:',token);
    useEffect(()=>{
        axios.get('http://localhost:5000/api/result/review',{
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
    return(
        <div>
            <h1> Review Page</h1>
            {reviewdata.map((ans,index)=>(
                <div key={index}>
                    <p>Q{index+1}:<strong>{ans.question}</strong></p>
                    <p>Your Answer:{ans.selectedanswer}</p>
                    <p>{ans.isCorrect? "correct":`Wrong | correctAnswer :${ans.correctAnswer}`}</p>
                </div>
            ))}
        </div>
    )
}
export default Review;
import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
const Scorepage=()=>{
    const[score,setScore]=useState()
    const[total,setTotal]=useState()
    const navigate=useNavigate()
    useEffect(()=>{
        const storedscore=localStorage.getItem('score');
        const totalQuestions = localStorage.getItem('total');
        if(storedscore !==null){
            setScore(storedscore)

        }else{
            navigate('/quiz')
        }
    },[navigate]);
    const handlechange=()=>{
        navigate('/Review')
    }
    return(
        <div>
            <h1>Congratulations , your Quiz completed</h1>
            <h2>your Score:{score}/{total}</h2>
            <p>You want to review the answers ? <button onClick={handlechange}>Review</button></p>
        </div>
    )
}
export default Scorepage;
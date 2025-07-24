import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'

const Scorepage=()=>{
    const[score,setScore]=useState()
    const[total,setTotal]=useState()
    const navigate=useNavigate()
    const isMobile=window.innerWidth<768;
    useEffect(()=>{
        const storedscore=localStorage.getItem('score');
        const totalQuestions = localStorage.getItem('total');
        if(storedscore !==null){
            setScore(storedscore)
            setTotal(totalQuestions)

        }else{
            navigate('/quiz')
        }
    },[navigate]);
    const handlechange=()=>{
        navigate('/Review')
    }
    return(
        <div style={{
      backgroundImage: `url("https://i.ibb.co/4wKbbgFf/Whats-App-Image-2025-07-23-at-16-24-29-a29f0fb2-compressed.webp")`,backgroundPosition:"center",backgroundSize:"cover",display:"flex",flexDirection:"column",justifyContent:"center",height:"100vh",width:"100vw",alignItems:"center",gap:"4px"}}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:'center',height:isMobile?"45%":"70%",width:isMobile?"93%":"45%",border:"2px solid black",borderRadius:"8px",alignItems:"center",marginTop:"40px"}}>
                <h1 style={{marginTop:isMobile?"50px":"50px",marginBottom:isMobile?"10px":'10px',color:'#006b3c',fontWeight:"bold",fontStyle:"italic"}}>Congratulations</h1>
                <h3 style={{marginBottom:"10px",color:"#daa520",fontWeight:"bold"}}>Your Quiz completed</h3>
                <h4 style={{marginTop:"3px",marginBottom:"10px",fontSize:"50px",color:"#ff2800",fontWeight:"bold"}}>Score</h4>
                <h2 style={{marginTop:"2px",fontSize:"30px",color:"#03c03c",fontWeight:"bold"}}>{score}/{total}</h2>
                <p style={{marginTop:isMobile?"18px":"35px",marginBottom:"20px"}}>You want to review the answers ? <button onClick={handlechange} style={{color:"white",backgroundColor:"#2a52be",padding:"3px",width:"80px"}}>Review</button></p>
            </div>
        </div>
    )
}
export default Scorepage;
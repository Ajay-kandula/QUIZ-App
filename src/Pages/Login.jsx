import React,{useState} from "react";
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom';



const Login =()=>{

    const[user,setUser]=useState({email:"",password:""})
    const navigate=useNavigate();
    const isMobile = window.innerWidth < 768;
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post("https://quiz-app-backend-quiz.onrender.com/api/auth/login",user);
            if(!user.email){
                alert(`pls register , click on register `)
            }else{
                localStorage.setItem("token",res.data.token)
                alert(`Login Sucessfull`)
                navigate('/instructions')
            }
            
        }catch(err){
            alert(`Login failed`)
        }

    }
    const handlechange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    };
    return( 
        <div style={{display:'flex',justifyContent:"flex-start",flexDirection:"column",minHeight:"100vh",width:"100vw",alignItems:"flex-start",backgroundImage:`url("https://i.ibb.co/QvGWFSXJ/log-compressed.webp")`,backgroundPosition:'center',backgroundSize:"cover"}} >
            <h1 style={{color:"white",marginLeft:isMobile ? "50px" : "250px",marginTop:isMobile? '250px':"80px",width:isMobile ? "90%" : "40%",fontSize:isMobile ? "40px" : "40px",marginBottom:isMobile?"1px":"1px",fontWeight:"bold"}}>Login Form</h1>
            <div  style={{display:"flex",justifyContent:'center',alignItems:"center",marginBottom:"18px",height:"30%",width:isMobile ?"50%":"35%",flexDirection:"column",border:"1px solid #ccc",borderRadius:"6px",padding:"30px",textAlign:'center',marginLeft:isMobile?"20px":"100px",marginTop:isMobile?"20px":"30px"}}>
                <form onSubmit={handleSubmit} >
                    <input type="email" value={user.email} name="email" placeholder="Enter your email..." onChange={handlechange}  style={{marginBottom:"20px",border:'none',borderRadius:"6px",width:isMobile?"90%":'90%',padding:"10px"}}/>
                    <input type="password" value={user.password} name="password" placeholder="Enter your password..." onChange={handlechange} required style={{ marginBottom:"20px",border:"none",borderRadius:"6px",padding:"10px",width:isMobile?"90%":"90%"}} /><br/>
                    <button type="submit" style={{  padding: "10px",color:"white",backgroundColor:"#2a52be  ",width:"50%" }}>Submit</button>
            </form>
            </div>


            <h4 style={{marginTop: '10px',color:"green",marginLeft:isMobile?"20px":'190px',width:isMobile?"90%":"30%"}}>Don’t have an account? <Link to='/Register'>Register</Link></h4></div>
            )


}
export default Login
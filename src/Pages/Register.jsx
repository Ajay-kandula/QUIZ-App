import React,{useState} from "react";
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';
const Register= ()=>{
    const[form,setForm]=useState({name:'',email:'',password:""})
    const isMobile=window.innerWidth<768;
    const navigate=useNavigate()
    const handleregister = async (e) => {
        e.preventDefault();
        if (!form.name) {
            return alert("Name field is required");
        }
        if (!form.email) {
            return alert("Email field is required");
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            return alert("Email is not valid");
        }
        if (!form.password) {
            return alert("Password is required");
        };
        try {
            const res = await axios.post('https://quiz-app-backend-quiz.onrender.com/api/auth/register', form);
            alert("Successfully registered, please click on login");
            navigate('/Login');
        } catch (err) {
            alert("Registration failed: " + err.response?.data?.message || err.message);
        }
    };
    const handlChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    return(
        <div  style={{display:'flex',justifyContent:"flex-start",flexDirection:"column",minHeight:"100vh",width:"100vw",alignItems:"flex-start",backgroundImage:`url("https://i.ibb.co/QvGWFSXJ/log-compressed.webp")`,backgroundPosition:'center',backgroundSize:"cover"}}>
            <h1 style={{color:"white",marginBottom:isMobile?"2px":"1px",marginLeft:isMobile?"10%":'15%',marginTop:isMobile?"50%":"60px",width:isMobile?"90%":"30%",fontWeight:"bold",fontSize:isMobile?'60px':'60px'}}>Register Page</h1>
            <div  style={{display:"flex",justifyContent:'center',alignItems:"center",marginBottom:"18px",height:"30%",width:isMobile?"50%":"35%",flexDirection:"column",border:"1px solid #ccc",borderRadius:"6px",padding:"30px",textAlign:'center',marginLeft:isMobile?"20px":"100px",marginTop:"50px"}}>
                <form onSubmit={handleregister} >
                    <input type="name" name="name" value={form.name} placeholder="Enter your name..." onChange={handlChange} required style={{marginTop:"20px",marginBottom:"18px",border:"none",padding:"10px",borderRadius:"6px",width:isMobile?"90%":"350px"}}/><br/>
                    <input type="email" name="email" value={form.email} placeholder="Enter your email..." onChange={handlChange} required  style={{marginBottom:"20px",border:'none',borderRadius:"6px",width:isMobile?"90%":'350px',padding:"10px"}}/><br/>
                    <input type="password" name="password" value={form.password} placeholder="Enter your password..." onChange={handlChange} required   style={{marginBottom:"20px",border:'none',borderRadius:"6px",width:isMobile?"90%":'350px',padding:"10px"}}/><br/>
                    <button type="submit" style={{  padding: "10px",color:"white",backgroundColor:"#2a52be  ",width:isMobile?"50%":"150px" }}> Submit</button>
                </form>
            </div>
            <h4 style={{color:"green",marginTop:"20px",marginLeft:isMobile?"20px":"170px",width:isMobile?"90%":"30%"}}>already have an account ? <Link to ='/Login' style={{color: "#2a52be" }}> Login here</Link></h4>
        </div>
    )
}
export default Register;
import React,{useState} from "react";
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';
import register from '../Images/register.jpg'
const Register= ()=>{
    const[form,setForm]=useState({name:'',email:'',password:""})
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
        <div style={{backgroundImage:`url(${register})`,backgroundPosition:'center',backgroundSize:'cover',minHeight:"100vh",width:'100vw',display:"flex",justifyContent:"flex-start",flexDirection:"column",alignItems:"flex-start"}}>
            <h1 style={{marginBottom:"10px",color:"white",marginLeft:"160px"}}>Register Page</h1>
            <div  style={{display:"flex",flexDirection:"column",color:"white",border:"1px solid #ccc", borderRadius:"6px",padding:"30px",width:"35%",height:"30%",alignItems:"center",marginTop:"40px",textAlign:"center",marginLeft:"100px"}}>
                <form onSubmit={handleregister} >
                    <input type="name" name="name" value={form.name} placeholder="Enter your name..." onChange={handlChange} required style={{marginTop:"20px",marginBottom:"18px",border:"none",padding:"10px",borderRadius:"6px",width:"90%"}}/><br/>
                    <input type="email" name="email" value={form.email} placeholder="Enter your email..." onChange={handlChange} required style={{ marginBottom:"18px",border:"none",padding:"10px",borderRadius:"6px",width:"90%"}}/><br/>
                    <input type="password" name="password" value={form.password} placeholder="Enter your password..." onChange={handlChange} required style={{ marginBottom:"18px",padding:"10px",borderRadius:"6px",border:"none",width:"90%"}}/><br/>
                    <button type="submit" style={{backgroundColor:"#2a52be",color:"white",border :"none",borderRadius:"6px",fontWeight:"bold",width:"50%",padding:"10px"}}> Submit</button>
            </form>
            </div>
            <h4 style={{color:"green",marginTop:"20px",marginLeft:"170px"}}>already have an account ? <Link to ='/Login' style={{color: "#2a52be" }}> Login here</Link></h4>
        </div>
    )
}
export default Register;
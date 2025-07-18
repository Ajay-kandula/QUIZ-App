import React,{useState} from "react";
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom';

const Login =()=>{
    const[user,setUser]=useState({email:"",password:""})
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post('http://localhost:5000/api/auth/login',user);
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
        <div style={{display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",height:"100vh",width:"100vw", padding:"20px"}}>
            <h1 style={{font: "initial",fontWeight: 'bold',fontSize: "60px",textAlign: "center"}}>Login form</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: 'column',alignItems: 'center',border: "1px solid #ccc",borderRadius: "7px",padding: "16px",width: "300px"}}>
                <input type="email" value={user.email} name="email" placeholder="Enter your email..." onChange={handlechange} required style={{ marginBottom: "10px", padding: "8px", width: "100%" }}/>
                <input type="password" value={user.password} name="password" placeholder="Enter your password..." onChange={handlechange} required style={{ marginBottom: "10px", padding: "8px", width: "100%" }}/>
                <button type="submit" style={{ padding: "8px 16px" }}>Submit</button>
            </form>
            <h5 style={{textAlign: 'center',marginTop: '16px'}}>Don’t have an account? <Link to='/Register'>Register</Link></h5></div>
            )


}
export default Login
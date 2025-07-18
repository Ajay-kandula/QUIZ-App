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
        <div style={{textAlign:"center",display:"flex" ,border:'1px #solid ccc',borderRadius:"10px", padding:'6px',}}>
            <h1 style={{ font:"initial"}}>Login form</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={user.email} name="email" placeholder=" Enter your email..." onChange={handlechange} required/><br/>
                <input type="password" value={user.password} name="password" placeholder="Enter your password..." onChange={handlechange} required/><br/>
                <button type="submit" >Submit</button>
            </form>
            <h5>Dont have an account ? <Link to='/Register' > Register</Link></h5>
            

        </div>
    )


}
export default Login
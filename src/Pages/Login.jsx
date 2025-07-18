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
        <>
            <h1 style={{ textAlign:"center",font:"initial",fontWeight:'bold',fontSize:"60px"}}>Login form</h1>
            <form onSubmit={handleSubmit} style={{alignItems:'center',textAlign:"center",display:"flex", flexDirection:'column',textAlign:"center", border:"1px solid #ccc", borderRadius:"7px", padding:"8px"}}>
                <input type="email" value={user.email} name="email" placeholder=" Enter your email..." onChange={handlechange} required/><br/>
                <input type="password" value={user.password} name="password" placeholder="Enter your password..." onChange={handlechange} required/><br/>
                <button type="submit" >Submit</button>
            </form>

            <h5 style={{textAlign:'center'}}>Dont have an account ? <Link to='/Register' > Register</Link></h5>
            

        </>
    )


}
export default Login
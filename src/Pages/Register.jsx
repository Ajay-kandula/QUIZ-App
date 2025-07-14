import React,{useState} from "react";
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';
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
            const res = await axios.post('http://localhost:5000/api/auth/register', form);
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
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleregister}>
                <input type="name" name="name" value={form.name} placeholder="Enter your name..." onChange={handlChange} required/><br/>
                <input type="email" name="email" value={form.email} placeholder="Enter your email..." onChange={handlChange} required/><br/>
                <input type="password" name="password" value={form.password} placeholder="Enter your password..." onChange={handlChange} required/><br/>
                <button type="submit"> Submit</button>
            </form>
            <h4>already have an account ? <Link to ='/Login'> Login here</Link></h4>
        </div>
    )
}
export default Register;
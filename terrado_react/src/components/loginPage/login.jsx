import React, { useState } from "react"
import './login.css'
import { useNavigate } from "react-router-dom"
import home from "../loginPage/homeImg.png"
const Login = () => {
    const[data,setData]=useState({
        email:"",
        password:""
    })
    const[error,setError]=useState("")
    const navigate=useNavigate()
    function Navigation(){
        navigate('/signup')
    }
    function navigateToForgotPassword(){
        navigate('/forgot-password')
    }
   async function submitForm(e){
        e.preventDefault()

        if(!data.email&&!data.password){
            setError("Fields shouldn't be empty")
        }else if(!data.email){
            setError("Email field shouldn't be empty")
        }else if(!data.password){
            setError("Password field shouldn't be empty")
        }else if(data.password.length<5){
            setError("Password length shouldn't be less than 5 characters")
        }else{
            try{
              let response=await fetch("http://localhost:5000/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:data.email,
                    password:data.password
                })
              })
              const responseData = await response.json();

        if (response.ok) {
          setError("");

          const token = responseData;

          sessionStorage.setItem("token", token);
                navigate('/home')
              }else{
                setError("Invalid credentials")
              }
            }catch(error){
                  setError("An error occured please try after sometime!")
            }
        }
        setTimeout(()=>{
            setError("")
        },3000)
    }
    return (
        <>
         <h1 style={{textAlign:'center'}}>Welcome</h1>
         <form method="post" onSubmit={submitForm}>
            <div className="container">
                <div className="left-section">
               
                    <img src={home} className="bird-img" alt="bird" />
                </div>
           
            <div className="right-section">
                   
                    <div className="content">
                        {error !== "" && <div style={{color:"red"}} className="error">{error}</div>}
                        <label htmlFor="email" style={{marginTop:'20px'}}>Username :</label>
                        <div>
                            <input type="email" id="email"  placeholder="Enter email"
                            name="email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
                        </div>
                        <label htmlFor="password">Password :</label>
                        <div>
                            <input type="password" id="password" placeholder="Enter password"
                            name="password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>
                        </div>
                        <div className="forgot">
                            <p onClick={navigateToForgotPassword}>forgot password ?</p>
                        </div>
                        <div>
                            <button  className="submit" type="submit">Submit</button>
                        </div>
                        <div className="or-container">
                          <div className="line"></div>
                          <div className="or-text">OR</div>
                          <div className="line"></div>
                        </div>
                        <div className="signup">
                           <span> Don't have an account ?</span> <span style={{color:'blue',cursor:"pointer"}} onClick={Navigation}>Sign Up</span>
                        </div>
                    </div>
                </div>
                
            </div>
            </form>
        </>
    )
}
export default Login
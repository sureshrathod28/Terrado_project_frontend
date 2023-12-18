import React,{useState} from "react"
import { useNavigate } from "react-router-dom"
import './signUp.css'
import home from '../loginPage/homeImg.png'
const Signup=()=>{
    const[data,setData]=useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        ConfirmPassword:""
    })
    const[error,setError]=useState("")
    let navigate=useNavigate()

    async function SubmitForm(e){
        e.preventDefault()
       
        if(!data.name&&!data.email&&!data.phone&&!data.password&&!data.ConfirmPassword){
            setError("All fields are compulsory")
        }else if(!data.name){
            setError("Name field can't be empty")
        }else if(!data.email){
            setError("Email field can't be empty")
        }else if(!data.phone){
            setError("Phone field can't be empty")
        }else if(!data.password){
            setError("Password field can't be empty")
        }else if(!data.ConfirmPassword){
            setError("Confirm-Password field can't be empty")
        }else if(data.password!==data.ConfirmPassword){
            setError("Password isn't matching")
        }else if(data.password.length<5){
            setError("Password length shouldn't less than 5 characters")
        }else{
            try{
                let response=await fetch("http://localhost:5000/signup",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        name:data.name,
                        email:data.email,
                        phone:data.phone,
                        password:data.password
                    })
                })
                if (response.ok){
                    setError("")
                    alert("Registration Successfull")
                    navigate('/')
                 await response.json()
                }else{
                    await response.text()
                    if(response.status===400){
                      setError("User already exists")
                    }
                }

            }catch(error){
               console.log("ErrorDesc"+error)
            }
        }

        setTimeout(()=>{
            setError("")
        },5000)

    }
    return(
        <>
        <h1 style={{textAlign:'center'}}>Register</h1>
        <form method="post" onSubmit={SubmitForm}>
            <div className="container">

                <div className="left-section">
                    <img src={home} className="home-img" alt="bird" />
                </div>
           
            <div className="right-section">
                    
                    <div className="content" >
                        {error !== "" && <div style={{color:"red"}} className="error">{error}</div>}
                        <label htmlFor="name">Name :</label>
                        <div>
                            <input type="text" id="name" className="name-input"  placeholder="Enter your name"
                            name="name" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/>
                        </div>
                        <label htmlFor="email">Email :</label>
                        <div>
                            <input type="email" id="email" className="signup-input"   placeholder="Enter email"
                            name="email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
                        </div>
                        <label htmlFor="phone">Mobile No :</label>
                        <div>
                            <input type="tel" id="phone" className="name-input"   placeholder="Enter your mobile number"
                            name="phone" value={data.phone} onChange={(e)=>setData({...data,phone:e.target.value})}/>
                        </div>
                        <label htmlFor="password">Password :</label>
                        <div>
                            <input type="password" id="password" className="signup-input"   placeholder="Enter password"
                            name="password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>
                        </div>
                        <label htmlFor="confirm-password">Confirm Password :</label>
                        <div>
                            <input type="password" id="confirm-password" className="signup-input"   placeholder="Confirm password"
                            name="ConfirmPassword" value={data.ConfirmPassword} onChange={(e)=>setData({...data,ConfirmPassword:e.target.value})}/>
                        </div>
                        
                        <div>
                            <button  className="submit" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
                
            </div>
            </form>
        </>
    )
}
export default Signup
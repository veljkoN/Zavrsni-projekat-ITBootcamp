import React, { useState } from 'react'
import { putUserIn } from '../../../services/apiAuthServices'
import validateCheck,{ errorM } from '../../../utils/signUpUtil'
import {Helmet} from 'react-helmet'
const SignUp = ({setLog}) => {
    const [ user, setUser ] = useState({
        name:'',
        surname:'',
        username:'',
        pwd:'',
        rePwd:'',
        email:''
    })
    const [ error, setError] = useState('')
    const [ success, setSuccess ] = useState('')
    const forwardData = () =>{
        setError('')
        setSuccess('')
        const name = document.querySelector('#name') 
        const surname = document.querySelector('#surname') 
        const username = document.querySelector('#username') 
        const pwd = document.querySelector('#pwd') 
        const rePwd = document.querySelector('#rePwd') 
        const email = document.querySelector('#email')  
       if(validateCheck(user)){
        putUserIn(user.name, user.surname, user.username, user.pwd, user.email).then((data)=>{
          setSuccess('You are successfully registered. Go to')
           name.value = ''
           surname.value = ''
           username.value = ''
           pwd.value = ''
           rePwd.value = ''
           email.value = ''
           }).catch(error => {
               setError('Signup error, sometihg went wrong.Please try again')
        })
        setError('')
       }
        setError(errorM)
    }
    return (
        <div className="signUp-box">
             <Helmet>
                    <title>Geography Info | SignUp</title>
                </Helmet>
            <h2>Sign Up</h2>
            <p onClick={()=>setLog(true)}><svg width="14" height="14" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z"/></svg>
            <span> </span>Back to Login</p>
            <form className="signUp-form" onSubmit={(e)=> {e.preventDefault();forwardData()}}>
                <input className='signUp-input' type="text" placeholder="User"  id="name" onChange={(e)=>setUser({...user,name:e.target.value})} />
                <input className='signUp-input' type="text" placeholder="Surname"  id="surname" onChange={(e)=>setUser({...user,surname:e.target.value})} />
                <input className='signUp-input' type="text" placeholder="Username" id="username"   onChange={(e)=>setUser({...user,username:e.target.value})} />
                <input className='signUp-input' type="password" placeholder="Password" id="pwd"   onChange={(e)=>setUser({...user,pwd:e.target.value})} />
                <input className='signUp-input' type="password" placeholder="Re-Password" id="rePwd"  onChange={(e)=>setUser({...user,rePwd:e.target.value})} />
                <input className='signUp-input' type="email"  placeholder="Email" id="email"  onChange={(e)=>setUser({...user,email:e.target.value})} />
                <button className="signUp-btn" type="submit">SignUp</button>
            </form>
            <div className="error-box">
                <span className='errorMessage'> {error}</span>
                {
                    success.length>0 && <h5 className='errorMessage'> {success} <span className='successLogin'  onClick={()=>setLog(true)}>Login</span> to join </h5>
                }
            </div>
        </div>
    )
}

export default SignUp

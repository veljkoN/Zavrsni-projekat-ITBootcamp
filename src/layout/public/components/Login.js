import React, { useState }  from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { logInUser } from '../../../services/apiAuthServices'
import { isLogin } from '../../../services/auth.service'
import {errorL, validateLogin} from '../../../utils/logInUtils'
import { Helmet } from 'react-helmet';
const Login = ({setLog}) => {
    const history = useHistory()
    const [ user, setUser ] = useState({
        userName:'',
        pwd:''
    })
    const[ errLogin, setErrLogin ] = useState('')
    const forwardLoginData = () => {
        setErrLogin('')
        const usernameL=document.querySelector('#usernameL')
        const pwdL=document.querySelector('#pwdL')
        if(validateLogin(user)){
            logInUser(user.userName,user.pwd).then(data=>{
                localStorage.setItem('name',data.user.name)
                localStorage.setItem('surname',data.user.surname)
                localStorage.setItem('email',data.user.email)
                localStorage.setItem('un',data.user.username)
                localStorage.setItem('token',data.token)
                if(data.success===true){
                    let date=new Date()
                    let zeroM;
                    if(date.getMinutes()<10){
                        zeroM=0;
                    }
                    else{
                        zeroM=''
                    }
                    let dateLogin=`${date.getHours()}:${zeroM}${date.getMinutes()} ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} `
                    localStorage.setItem('date',dateLogin)
                }
                localStorage.setItem('user-temp',`${data.user.username}`)
                window.location.reload(false);
                history.push('home')
            }).catch(error => {
                setErrLogin('Login error, check your username or password')
            }) 
            usernameL.value = ''
            pwdL.value = ''
        }
    }
    if(isLogin()){
        return <Redirect to='/'/>
        }
    else{
        return (
            
            <div className="join-main-section">
                <Helmet>
                    <title>Geography Info | Login</title>
                </Helmet>
                <h2>LogIn</h2>
                <p onClick={()=>setLog(false)}>Create account</p>
                <form className="join-form" onSubmit={(e)=>{e.preventDefault();forwardLoginData()}}>
                    <div className="input-group">
                        <input type='text'  placeholder='Username' id='usernameL' onChange={(e)=>setUser({...user,userName:e.target.value})}/>
                    </div>
                    <div className="input-group">
                        <input type='password' placeholder='Password' id='pwdL' onChange={(e)=>setUser({...user,pwd:e.target.value})}/>
                    </div>
                    <div className="input-group">
                        <button className='login-btn' type="submit" value='SignUP'>Login</button>
                    </div>
                </form>
                <div className="error-box">
                    <span className='errorMessage'>{errorL}</span>
                    {
                        errLogin.length>0 &&  <span className='errorMessage'>{errLogin}</span>
                    }
                </div>
            </div>
        )
    }
}

export default Login

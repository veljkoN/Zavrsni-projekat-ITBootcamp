import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { isLogin } from '../../../services/auth.service'
import '../../../style/Home/Home.scss'
import HiModal from './HiModal'
import MyHomePage from './MyHomePage'

const Home = () => {
  const [ userTemp, setUserTemp ] = useState(()=>{
      return localStorage.getItem('user-temp')
  })
  useEffect(()=>{
    const ac = new AbortController();
    setTimeout(() => {  
        setUserTemp('')
        localStorage.removeItem('user-temp')
        return () => ac.abort()
    }, 3000);
    
  },[])
  if(!isLogin()){
    return <Redirect to='/'/>
  }
  else{
    return (
      <div className="home">
          {userTemp && <HiModal userTemp={userTemp}/>}
          <MyHomePage />
      </div>
    )
  }
}

export default Home

import React, { useContext, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AllCountriesGlobal } from '../../../context/AllCountryContext'
import { isLogin, LogOut } from '../../../services/auth.service'
import '../../../style/AllPage/TopFlags.scss'

let numbers = []
    for(let i=0;i<150;i++){
        let temNumber = Math.floor(Math.random() * Math.floor(240))
        if(!numbers.includes(temNumber)){
            numbers.push(temNumber)
        } 
    }
    
const TopFlags = () => {
    const history = useHistory()
    const {allCountries} = useContext(AllCountriesGlobal)
    const [ flags, setFlags ] = useState([])
    const [ topBtn, setTopBtn ] = useState(true)
    useEffect(() => {
        if(allCountries.length>0){
            setFlags(allCountries)
        }
    }, [allCountries])
    const setLogOut = () => {
        setTopBtn(false)
        LogOut()
        history.push('/')
    }
    const changeClass = () => {
        const userProfile = document.querySelector('.user-profile')
        userProfile.classList.toggle("user-active")
    }
    return (
        <div className="first-box">
            {flags.length>0 && numbers.length>0 &&
            <div className="top-flegs">
                {
                    numbers.map(number=>
                        <img key={number} src={flags[number].flag} alt='flags'/>
                    )
                }  
            </div>} 
            {
                isLogin() && topBtn &&
            <div className='home-btn'>
                <Link to="/home">
                    <svg width="40" height="40" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z"/></svg>
                </Link>
            </div>
            }
            {
                isLogin() && topBtn &&
            <>
            <div className="user" onClick={()=>changeClass()}>
                <svg width="30" height="30" viewBox="0 0 1792 1792"><path d="M1329 784q47 14 89.5 38t89 73 79.5 115.5 55 172 22 236.5q0 154-100 263.5t-241 109.5h-854q-141 0-241-109.5t-100-263.5q0-131 22-236.5t55-172 79.5-115.5 89-73 89.5-38q-79-125-79-272 0-104 40.5-198.5t109.5-163.5 163.5-109.5 198.5-40.5 198.5 40.5 163.5 109.5 109.5 163.5 40.5 198.5q0 147-79 272zm-433-656q-159 0-271.5 112.5t-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5-112.5-271.5-271.5-112.5zm427 1536q88 0 150.5-71.5t62.5-173.5q0-239-78.5-377t-225.5-145q-145 127-336 127t-336-127q-147 7-225.5 145t-78.5 377q0 102 62.5 173.5t150.5 71.5h854z"/></svg>
            </div>
            <div className="user-profile">
                <ul className="profile-list">
                    <li>
                        <Link to={'/profile'} >Profile</Link>
                    </li>
                    <li onClick={()=>setLogOut()}>
                        Logout 
                        <svg width="20" height="20" className="signout-img" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M704 1440q0 4 1 20t.5 26.5-3 23.5-10 19.5-20.5 6.5h-320q-119 0-203.5-84.5t-84.5-203.5v-704q0-119 84.5-203.5t203.5-84.5h320q13 0 22.5 9.5t9.5 22.5q0 4 1 20t.5 26.5-3 23.5-10 19.5-20.5 6.5h-320q-66 0-113 47t-47 113v704q0 66 47 113t113 47h312l11.5 1 11.5 3 8 5.5 7 9 2 13.5zm928-544q0 26-19 45l-544 544q-19 19-45 19t-45-19-19-45v-288h-448q-26 0-45-19t-19-45v-384q0-26 19-45t45-19h448v-288q0-26 19-45t45-19 45 19l544 544q19 19 19 45z"/></svg>
                    </li>
                </ul>
            </div>
            </>}
        </div>
    )
}

export default TopFlags

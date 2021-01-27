import React from 'react'
import '../../../style/FirstPage/FirstPage.scss'
import { isLogin } from '../../../services/auth.service'
import {  Redirect } from 'react-router-dom'
import WelcomeContent from './WelcomeContent'
import FourImages from './FourImages'
import DidYouKnow from './DidYouKnow'
import AllCountriesGlobalProvider from '../../../context/AllCountryContext'

const FirstPage = () => {
  if(isLogin()){
    return <Redirect to='/home' />
  }
  else{
    return (
      <div className="container">
        <WelcomeContent />
        <FourImages />
        <AllCountriesGlobalProvider>
          <DidYouKnow />
        </AllCountriesGlobalProvider>
      </div>
    )
  }
}

export default FirstPage

import React, { useState } from 'react'
import '../../../style/FirstPage/WelcomeContent.scss'
import SignUp from './SignUp'
import Login from './Login'
const WelcomeContent = () => {
    const [ loginOrSignUp, setLoginOrSignUp ] = useState(true)
    return (
        <div className="welcome-box">
            {
                loginOrSignUp? 
                <h1 className="welcome-text-login"> 
                    <span className="accent-text">Welcome </span> to the journey <br/> through world countries data
                </h1>:
                <h1 className="welcome-text-signup">
                    <span className="accent-text text2">Join</span> our community and discover...  </h1>
            }
            {
                loginOrSignUp? <Login setLog={setLoginOrSignUp}/> : <SignUp setLog={setLoginOrSignUp} />
            }
        </div>
    )
}

export default WelcomeContent

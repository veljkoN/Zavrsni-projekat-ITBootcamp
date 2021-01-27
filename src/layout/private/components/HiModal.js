import React from 'react'
import '../../../style/Home/HiModal.scss'

const HiModal = ({userTemp}) => {
    return (
        <div className="modal-box">
            <div className="popup">
                <h1 className="welcome-message hi-msg"> 
                 Welcome 
                    <span className="accent-text"></span>
                </h1>
            <h3>{userTemp}</h3>
            <br/>
            <h4>You are successfully logged in</h4>
        </div>
    </div>
    )
}

export default HiModal

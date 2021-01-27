import React from 'react'
import '../../../style/FirstPage/FourImages.scss'
import images4 from '../../../images/images4.png'

const FourImages = () => {
    return (
        <div className="four-images-box">
            <div className="four-image">
                <img src={images4} id="f-img" alt='world-data' />
            </div>
        <h1 className="four-images-text"> 
            <span className="accent-text">Find out interesting facts <br/>about all states worldwide. </span> 
        </h1>
    </div>
    )
}

export default FourImages

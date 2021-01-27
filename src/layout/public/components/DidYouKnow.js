import React, { useContext } from 'react'
import { AllCountriesGlobal } from '../../../context/AllCountryContext'
import '../../../style/FirstPage/DidYouKnow.scss'

const DidYouKnow = () => {
    const {allCountries} = useContext(AllCountriesGlobal)
    const box1 = Math.floor(Math.random() * Math.floor(250))
    const box2 = Math.floor(Math.random() * Math.floor(250))
    const box3 = Math.floor(Math.random() * Math.floor(250))
    return (
        allCountries.length>0 &&
        <div className="didYouKnow">
            <h1>Did You Know?</h1> 
            <div className="card">
                {                
                allCountries[box1].name && <div className="card__body">
                    <h2 className="card__title"><span className="text-em">{allCountries[box1].name}</span><br/> is sitauted in</h2>
                    <h4 className="card__description">{allCountries[box1].region} ({allCountries[box1].subregion})</h4>
                </div>
                }
            </div>
            <div className="card">
                <div className="card__body">
                    { allCountries[box2].name && <h2 className="card__title">Capital of <span className="text-em"> {allCountries[box2].name}</span><br/> is</h2>}
                    { allCountries[box2].capital && <h4 className="card__description">{allCountries[box2].capital}</h4>}
                </div>
            </div>
            <div className="card">
                <div className="card__body">

                    { allCountries[box3].currencies[0].name && <h2 className="card__title"><span className="text-em"> {allCountries[box3].currencies[0].name}</span><br/> is currency in</h2>}
                    {allCountries[box3].name &&<h4 className="card__description">{allCountries[box3].name}</h4>}
                </div>
            </div>
        </div>
    )
}

export default DidYouKnow

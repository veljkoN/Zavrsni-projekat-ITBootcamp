import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import { getCountryName } from '../../../services/apiCountry';
import { isLogin } from '../../../services/auth.service';
import '../../../style/Menu/Country.scss'
import numberWithCommas from '../../../utils/numberUtils';
import { Helmet } from 'react-helmet'

const Country = () => {
  const [ countryItem, setCountryItem ] = useState({})
  let {name} = useParams();
  useEffect(()=>{
      if(name){ 
        getCountryName(name.toLowerCase()).then(({data})=>{
          if(name.trim().toLowerCase()==='india'){
            setCountryItem([data[1]])
          }
          else if(name.trim().toLowerCase()==='china'){
            setCountryItem([data[0]])
          }
          else if(name.trim().toLowerCase()==='sudan'){
            setCountryItem([data[0]])
          }
          else{
            setCountryItem(data)
          }
        }) 
      } 
  },[name]) 
  console.log(countryItem)
  if(!isLogin()){
    return <Redirect to='/'/>
    }
  else{
    return (
      <div className='country-item'>
        <Helmet>
            <title>Geography Info | Country - {name}</title>
        </Helmet>
        {name? (countryItem.length>0? countryItem.map(country=>(
        <div className="card1" key={country.name}>
          <div className="card-banner">
            <img className="banner-img" src={country.flag} alt=''/>
          </div>
          <div className="card-body">
            <h2 className="title">{country.name} (<i>{country.nativeName}</i>)</h2>
            <hr/>
            <div className="card-info">
              <p className="description">Region: <b>{country.region}</b></p>
              <p className="description">Subregion: <b>{country.subregion}</b></p>
              <p className="description">Capital: <b>{country.capital}</b></p>
              <p className="description">Population: <b> {numberWithCommas(country.population)} </b> inhabitants</p>
              {country.languages.length>0 && <p className="description">Language: <b>{country.languages[0].name}</b> ({`${country.languages[0].nativeName.charAt(0).toUpperCase()}${country.languages[0].nativeName.slice(1)}`})</p>}
              <p className="description">Demonym: <b>{country.demonym}</b></p>
              <p className="description">Area: <b>{numberWithCommas(country.area)} sq km</b></p>
              {country.currencies.length>0 && <p className="description">Curencies: <b>{country.currencies[0].name}</b> ({country.currencies[0].symbol})</p>}
              {country.regionalBlocs.length>0 &&<p className="description">Regional block: <b>{country.regionalBlocs[0].name}</b></p>}
              {country.callingCodes.length>0 && <p className="description">Calling code: <b>+{country.callingCodes[0]}</b></p>}
              <p className="description">Geo coordinates: <b>Lat  {Math.ceil(Number(country.latlng[0]))}, Lng  {Math.ceil(Number(country.latlng[1]))}</b></p>
              <div className="card-profile">
                <p className="profile-follow">More Information about {country.name} on  <a target='_blank' rel='noopener noreferrer' style={{color:'blue'}} href={`https://en.wikipedia.org/wiki/${country.name}`}>Wikipedia </a> </p>
            </div>
          </div>
        </div>
      </div>)):<div>Loading....</div>):(<div><p>Chose country you would like to see</p></div>)
        }
    </div>
    )
  }
}

export default Country

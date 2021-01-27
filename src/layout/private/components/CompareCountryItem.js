import React, {  useState, useEffect } from 'react'
import ChartBar from './ChartBarPopulation'
import ChartBarArea from './ChartBarArea'
import { getCountryName } from '../../../services/apiCountry'
import { isLogin } from '../../../services/auth.service'
import { Redirect } from 'react-router-dom'
import numberWithCommas from '../../../utils/numberUtils'

const CompareCountryItem = () => {
    const[country1,setCountry1]=useState('')
    const[country2,setCountry2]=useState('')
    useEffect(()=>{
        getCountryName(localStorage.getItem('country1')).then(({data})=>{
            setCountry1(data[0])
        })
    },[])
    useEffect(()=>{
        getCountryName(localStorage.getItem('country2')).then(({data})=>{
            setCountry2(data[0])
        })
    },[])
    if(!isLogin()){
        return <Redirect to='/'/>
        }
    else{
        return ( 
            <div className='compare-item-box'>
                <div style={{overflowX:'auto'}}>                    
                   {country1 && country2 && <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>{
                                    (country1)? (<p className='c-name'>{`${country1.name} (${country1.nativeName})`}</p>):(null)
                                }</th>
                                <th>
                                    {
                                    (country2)? (<p className='c-name'>{country2.name} ({country2.nativeName})</p>):(null)}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Region</td>
                            <td>{country1.region}</td>
                            <td>{country2.region}</td>
                        </tr>
                        <tr>
                            <td>Subregion</td>
                            <td>{country1.subregion}</td>
                            <td>{country2.subregion}</td>
                        </tr>
                        <tr>
                            <td>Capital city</td>
                            <td>{country1.capital}</td>
                            <td>{country2.capital}</td>
                        </tr>
                        <tr>
                            <td>Area</td>
                            <td>{numberWithCommas(country1.area)} sq km</td>
                            <td>{numberWithCommas(country2.area)} sq km</td>
                        </tr>
                        <tr>
                            <td>Language</td>
                            <td>
                                {
                                    (country1.languages)?(country1.languages[0].name):(null)
                                }
                            </td> 
                            <td>
                                {
                                    (country2.languages)?(country2.languages[0].name):(null)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Population</td>
                            <td>{numberWithCommas(country1.population)} inhabitants</td>
                            <td>{numberWithCommas(country2.population)} inhabitants</td>
                        </tr>
                        <tr>
                            <td>Currencies</td>
                            <td>
                                {
                                    (country1.currencies)?(country1.currencies[0].name):(null)
                                }  
                            </td> 
                            <td>
                                {
                                    (country2.currencies)?(country2.currencies[0].name):(null)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Geo coordinates</td>
                            <td>
                                Lat  
                                {
                                    (country1.timezones)?(" "+Math.ceil(Number(country1.latlng[0]))+" "):(null)
                                }
                                 Lng  
                                {
                                    (country1.timezones)?(" "+Math.ceil(Number(country1.latlng[1]))):(null)
                                }
                            </td> 
                            <td>
                            Lat  
                                {
                                    (country2.timezones)?(" "+Math.ceil(Number(country2.latlng[0]))+" "):(null)
                                }
                                 Lng  
                                {
                                    (country2.timezones)?(" "+Math.ceil(Number(country2.latlng[1]))):(null)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Calling code</td>
                            <td>
                                {
                                    (country1.languages)?(`+${country1.callingCodes[0]}`):(null)
                                }
                            </td> 
                            <td>
                                {
                                    (country2.languages)?(`+${country2.callingCodes[0]}`):(null)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Flag</td>
                            <td>
                                <img src={country1.flag} alt={country1.name} style={{width:'100px',height:'50px'}}/>
                            </td> 
                            <td>
                            <img src={country2.flag} alt={country2.name} style={{width:'100px',height:'50px'}}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>}
                </div>
                <div className='compare-item-chart' id='chart' style={{opacity:'1'}}>
                    <ChartBar country1={country1} country2={country2}/>
                    <ChartBarArea country1={country1} country2={country2}/>
                </div>
            </div>
        )
    }
}

export default CompareCountryItem

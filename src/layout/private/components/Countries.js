import React, { useContext, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { AllCountriesGlobal } from '../../../context/AllCountryContext'
import { getCountryName, getCountryRegion, getCities } from '../../../services/apiCountry'
import { isLogin } from '../../../services/auth.service'
import '../../../style/Menu/Countries.scss'
import Pagination from './Pagination'
import { Helmet } from 'react-helmet'

const Countries = () => { 
    const { allCountries } = useContext(AllCountriesGlobal)
    const [ countries, setCountries ] = useState([])
    const [ ascend, setAscend ] = useState(true)
    const [ region, setRegion ]=useState('')
    const [ isCity, setIsCity ] = useState(false)
    const [ subRegion, setSubregion ] = useState([])

    useEffect(()=>{
        if(allCountries.length>0){
            setCountries(allCountries)
        }
    },[allCountries])
    useEffect(()=>{
        let tempArr = []
        if(allCountries.length>0){
            countries.forEach(country =>{
                if(country.subregion.length>0){
                    if(!tempArr.includes(country.subregion)){
                        tempArr.push(country.subregion)
                    }
                }
            })
            setSubregion(tempArr)
        }
    },[countries,allCountries]) 
    const [currentPage,setCurrentPage]=useState(1)
    const [postasPerPage]=useState(30)
    //Get current posts
    const indexOfLastPost=currentPage*postasPerPage
    const indexOfFirstPost=indexOfLastPost-postasPerPage
    let currentPosts=countries.slice(indexOfFirstPost,indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    //funkcije
    const searchCountry = (name) => {
        if(name.trim()===''){
            return
            }
        const search = document.querySelector('.country-search')
        getCountryName (name.trim().toLowerCase()).then(({data})=>{
            if(name.trim().toLowerCase()==='india'){
                setCountries([data[1]])
            }
            else{
                setCountries(data)
            }
        }).catch(err=>{
            setCountries(allCountries)
            setRegion('')
            search.value=''
        })
    }
    const searchRegion = (name) => {
        getCountryRegion(name).then(({data})=>{
            setCountries(data)
        })
    }
    const setDirection = () => {
        const newOrder = [...countries].reverse()
        setCountries(newOrder)
        setAscend(!ascend)
    }
    const searchByRegion = (subR) =>{
        const RegionCountries = countries.filter(country=>{
            return country.region===region && country.subregion===subR
        })
        setCountries(RegionCountries)
        setRegion('')
        const subReg = document.querySelector('.select-subregion')
        subReg.value=''
        }
        const searchByCity = (city) => {
            const capitalSearch = document.querySelector('.capital-search')
            getCities(city).then(({data})=>{
                setIsCity(true)
               setCountries(data)

            }).catch(()=>{
                setIsCity(false)
                setCountries(allCountries)
                capitalSearch.value=''
            }) 
        }
        console.log(countries)
        const resetSeatch = () => {
            setCountries(allCountries)
            setRegion('')
            const capS = document.querySelector('.capital-search')
            capS.value=''
            const contrS = document.querySelector('.country-search')
            contrS.value=''

        }
    if(!isLogin()){
        return <Redirect to='/'/>
        }
    else{
        return (
            <div className="countries-box">
                <Helmet>
                    <title>Geography Info | Countries</title>
                </Helmet>
                {isCity?(<h2 className="header">Capital cities</h2>):(<h2 className="header">Countries</h2>)}
                <div className="countires">
                    <div className="countires-items">
                        <div className="country-search-box">
                            <input type='text' className="country-search" placeholder="Search country" onChange={(e)=>searchCountry(e.target.value)}/>
                            <svg aria-hidden="true" width="25" height="22" focusable="false" data-prefix="fas" data-icon="search" id="search-c" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                        </div>
                        <div className='sort-direction'>
                            {ascend? 'A':'Z'}
                            <svg width="12" height="12" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293h-704q-52 0-84.5-37.5t-32.5-90.5v-128q0-53 32.5-90.5t84.5-37.5h704l-293-294q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"/></svg>
                            {ascend? 'Z':'A'}
                        </div>
                        <div className="country-pagination">
                            <Pagination postasPerPage={postasPerPage} totalPosts={allCountries.length} paginate={paginate}/>
                        </div>
                        <ul className='countries-list'>
                            { 
                                currentPosts.length>0 && currentPosts.map(country=>(
                                    <li key={country.name}>{isCity && <span>{country.capital} - </span>} <Link to={`/country/${country.name}`}>{country.name}</Link></li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="countires-aside">
                    <div className="sort-btn">
                        <button onClick={()=>setDirection()}>
                        {
                            ascend? (<svg width="20" height="20" viewBox="0 0 1792 1792"><path d="M1255 408h177l-72-218-12-47q-2-16-2-20h-4l-3 20q0 1-3.5 18t-7.5 29zm-455 1032q0 12-10 24l-319 319q-10 9-23 9-12 0-23-9l-320-320q-15-16-7-35 8-20 30-20h192v-1376q0-14 9-23t23-9h192q14 0 23 9t9 23v1376h192q14 0 23 9t9 23zm836 119v233h-584v-90l369-529q12-18 21-27l11-9v-3q-2 0-6.5.5t-7.5.5q-12 3-30 3h-232v115h-120v-229h567v89l-369 530q-6 8-21 26l-11 11v2l14-2q9-2 30-2h248v-119h121zm89-897v106h-288v-106h75l-47-144h-243l-47 144h75v106h-287v-106h70l230-662h162l230 662h70z"/></svg>):
                            <svg width="20" height="20" viewBox="0 0 1792 1792"><path d="M1255 1432h177l-72-218-12-47q-2-16-2-20h-4l-3 20q0 1-3.5 18t-7.5 29zm-455 8q0 12-10 24l-319 319q-10 9-23 9-12 0-23-9l-320-320q-15-16-7-35 8-20 30-20h192v-1376q0-14 9-23t23-9h192q14 0 23 9t9 23v1376h192q14 0 23 9t9 23zm925 246v106h-288v-106h75l-47-144h-243l-47 144h75v106h-287v-106h70l230-662h162l230 662h70zm-89-1151v233h-584v-90l369-529q12-18 21-27l11-9v-3q-2 0-6.5.5t-7.5.5q-12 3-30 3h-232v115h-120v-229h567v89l-369 530q-6 8-21 26l-11 10v3l14-3q9-1 30-1h248v-119h121z"/></svg>
                        }
                        </button>
                        <h5>Sort by alphabet</h5>
                    </div>
                    <button onClick={()=>resetSeatch()} className='reset-btn'>Reset Search</button>
                    <div>
                        <h5>Search by capital city</h5>
                        <input  type="text" placeholder="Search by capital" className='capital-search' onChange={(e)=>searchByCity(e.target.value)}/>
                    </div>
                    <div className='select-box'>
                        <h5>Search by region and subregion</h5>
                        <select id='sel' className='select-region' value={region}  onChange={(e)=>{
                                const search = document.querySelector('.country-search')
                                search.value=''
                                searchRegion(e.target.value)
                                setRegion(e.target.value)
                            }}>
                            <option value="">Choose region</option>
                            <option value='Africa'>Africa</option>
                            <option value='Europe'>Europe</option>
                            <option value='Asia'>Asia</option>
                            <option value='Americas'>North and South America</option>
                            <option value='Oceania'>Australia and Oceania</option> 
                            <option value='Polar'>Antarctica</option>
                        </select>
                        <select className='select-subregion' onChange={(e)=>{ searchByRegion(e.target.value)}}>
                                <option value=''>Coose subregion</option>
                            {region.length>0 && subRegion.map((region)=> 
                                <option key={region} value={region}>{region}</option>
                            )}
                        </select> 
                    </div> 
                </div>
            </div>
        )
    }
}

export default Countries

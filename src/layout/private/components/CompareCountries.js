import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { getCountryName } from '../../../services/apiCountry'
import { isLogin } from '../../../services/auth.service'
import { Helmet } from 'react-helmet'

const CompareCountries = () => {
    const [ allCountries1, setAllCountries1 ]=useState([])
    const [ allCountries, setAllCountries ]=useState([])
    const searchC1=document.querySelector('#searchC1')
    const searchC=document.querySelector('#searchC')
    const [country1,setCountry1]=useState('')
    const [country,setCountry]=useState('')
    const searchCountry = (name) => {
        getCountryName(name).then(({data})=>{ 
            setAllCountries1(data)
        })
    }
    const searchCountry2 = (name) => {
        getCountryName(name).then(({data})=>{
            setAllCountries(data)
        })
    }
    if(!isLogin()){
        return <Redirect to='/'/>
        }
    else{
        return (    
            <div className='compare-box'>
                <Helmet>
                    <title>Geography Info | Compare countries</title>
                </Helmet>
                <h2>Compare Countries</h2> 
                <div className='compare-countries'>
                    <div className='compare-item'>
                    <p>Chose items from the list</p>
                        <h5 className=''>Item 1</h5>
                        <input type='text'  placeholder='Search country' id='searchC1' className='searchC' onChange={(e)=>{
                            e.preventDefault()
                            if(e.target.value.trim()===''){
                                return
                            }
                            searchCountry(e.target.value)
                        }}/>
                        <ul className='list-group mb-4 mt-2'>
                            {
                            allCountries1.slice(0,6).map(country=>(
                            <li key={country.name}  className='list-group-item text-center' id='li-all' onClick={(e)=>{
                                setCountry1(country.name)
                                setAllCountries1([])
                                searchC1.value=''
                            }} >
                                {country.name}
                            </li>
                            ))   
                            }
                        </ul>
                    </div>
                    <div className='compare-item'>
                        <h5 className=''>Item 2</h5>
                        <input type='text'  placeholder='Search country' id='searchC' className='searchC' onChange={(e)=>{
                            e.preventDefault()
                            if(e.target.value.trim()===''){
                                return
                            }
                            searchCountry2(e.target.value)
                        }}/>
                        <ul className='list-group mb-4 mt-2'>
                        {
                        allCountries.slice(0,6).map(country=>(
                            <li key={country.name} className='list-group-item text-center' id='li-all' onClick={(e)=>{
                                setCountry(country.name)
                                setAllCountries([])
                                searchC.value=''
                            }}>
                            {country.name}
                            </li>
                        ))   
                        }
                        </ul>
                    </div>
                </div>
                <div className="compare-table">
                    <h5>Compare</h5>
                    <p>{country1==='' ? ("Item 1"):(country1)} </p>
                    <p>{country==='' ? ("Item 2"):(country)} </p>
                    <Link to='compareCountryItem'>
                        <button className='btn'  onClick={()=>{
                            localStorage.setItem('country1',country1)
                            localStorage.setItem('country2',country) 
                        }}>Compare items</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default CompareCountries

import React, { useState, createContext, useEffect } from 'react'
import { getAllCountries } from '../services/apiCountry'

export const AllCountriesGlobal = createContext()

const AllCountriesGlobalProvider = (props) => {
  const [allCountries, setAllCountries] = useState([])

  useEffect(()=>{
    getAllCountries().then(({data})=>{
        const filData = data.filter((country)=>{
          return country.region.length>0
        })
        setAllCountries(filData)
    })
},[])

  return (
    <AllCountriesGlobal.Provider value={{allCountries, setAllCountries}}>
        {props.children}
    </AllCountriesGlobal.Provider>
  )
}

export default AllCountriesGlobalProvider
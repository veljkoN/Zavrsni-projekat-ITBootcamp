import axios from 'axios'

const getAllCountries = async() => {
    return await axios.get(`https://restcountries.eu/rest/v2/all`).then(data=>{
        return data
    })
}
const getCountryName = async(name) => {
    return await axios.get(`https://restcountries.eu/rest/v2/name/${name}`).then(data=>{
        return data
    })
}
const getCountryRegion = async(name) => {
    return await axios.get(`https://restcountries.eu/rest/v2/region/${name}`).then(data=>{
        return data
    })
}
const getRegionalBlocks = async (name) => {
    return await axios(`https://restcountries.eu/rest/v2/regionalbloc/${name}`).then(data=>{
        return data
    })
}
const getCities = async(name) => {
    return await axios.get(`https://restcountries.eu/rest/v2/capital/${name}`).then(data=>{
        return data
    })
}
export {getAllCountries, getCountryName,getCountryRegion,getRegionalBlocks,getCities}
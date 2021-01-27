
import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { AllCountriesGlobal } from '../../../context/AllCountryContext'
import { isLogin } from '../../../services/auth.service'
import Pagination from '../components/Pagination'
import FlagModal from './FlagModal'
import { Helmet } from 'react-helmet'
import loadingImg from '../../../images/loading.gif'

const Flags = () => {
    const { allCountries } = useContext(AllCountriesGlobal)
    const [ countries, setCountries ] = useState([])
    const [ modalFlag, setModalFlag ] = useState('')
    const modalBg = document.querySelector('.modal-bg')
    const [ loading, setLoading ] = useState(true)
    useEffect(()=>{
        if(allCountries.length>0){
            setCountries(allCountries)
            setLoading(false)
        }
    },[allCountries])
    const [currentPage,setCurrentPage]=useState(1)
    const [postasPerPage]=useState(36)
    const indexOfLastPost=currentPage*postasPerPage
    const indexOfFirstPost=indexOfLastPost-postasPerPage
    const currentPosts=countries.slice(indexOfFirstPost,indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const searchCountry = (name) => {
        let newData = allCountries.filter((country)=>{
            return country.name.toLowerCase().includes(name.toLowerCase())
        })
        setCountries(newData)
        
    }
    const openModal = (flag) => {
      modalBg.classList.add("bg-active")
      setModalFlag(flag)
    }
    if(!isLogin()){
        return <Redirect to='/'/>
        }
    else{
        if(loading){
            return (<div className='loading-box'>
                        <img  src={loadingImg} alt='loading' />
                    </div>)
        }
        else{
        return(
            <div className="gallery">
                 <Helmet>
                    <title>Geography Info | Flags</title>
                </Helmet>
                <h2>Flags</h2>
                <div className='flag-search-box'>
                    <input type='text' className="country-search-flag" placeholder="Search flag by country" onChange={(e)=>searchCountry(e.target.value)}/>
                    <Pagination postasPerPage={postasPerPage} totalPosts={allCountries.length} paginate={paginate}/>
                </div>
                { currentPosts && currentPosts.map(country=>(
                <div className="gallery-group" key={country.name}>
                    <img className="gallery-img" src={country.flag} onClick={()=>openModal({url:country.flag,country:country.name})}  alt="flag"/>
                    <div className="gallery-icons">
                        <p className='country-name'>{country.name}</p>
                        <Link to={`/country/${country.name}`}>
                            <svg className="svg-icon" viewBox="0 0 512 512" width="100" title="share">
                                <path d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z" />
                            </svg>
                        </Link>
                    </div>
                </div>))}
                <FlagModal openModal={openModal} modalFlag={modalFlag}/>
            </div>
        )
                }
    }
}

export default Flags

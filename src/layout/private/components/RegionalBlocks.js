import React, { useState,useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { getRegionalBlocks } from '../../../services/apiCountry'
import { isLogin } from '../../../services/auth.service'
import { association } from './data-desc'
import Pagination from './Pagination'
import { Helmet } from 'react-helmet'

const RegionalBlocs = () => {
    const [ blocName, setBlocName ]=useState('') 
    const [ regionalBloc, setRegionalBloc ]=useState('')
    const [ showDesc, setShowDesc ] = useState('')
    const [ currentPage, setCurrentPage ]=useState(1)
    const [ postasPerPage ]=useState(15)
    const indexOfLastPost=currentPage*postasPerPage
    const indexOfFirstPost=indexOfLastPost-postasPerPage
    const currentPosts=regionalBloc.slice(indexOfFirstPost,indexOfLastPost)
    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    useEffect(()=>{
        if(blocName.length>0){
            getRegionalBlocks (blocName).then(({data})=>{
                setRegionalBloc(data)
             })
        }
    },[blocName])
    useEffect(()=>{
        association.forEach(item=>{
            if(item.short===blocName){
                setShowDesc(item)
            }
        })
    },[blocName])
    if(!isLogin()){
        return <Redirect to='/'/>
        }
    else{
        return (  
            <div className="regional-box">
                <Helmet>
                    <title>Geography Info | Regional blocks</title>
                </Helmet>
                <h2 className='block-header'>Regional blocks</h2>
                <div className='regional-section'>
                    <p>Select regional block</p>
                    <select id='regionalB' onChange={(e)=>{
                        if(e.target.value!==''){
                            setBlocName(e.target.value) 
                        }
                        else{
                            setRegionalBloc('')
                            setBlocName('')
                        }
                        
                    }}>
                        <option value=''>-</option>
                        <option value='eu'>EU (European Union)</option>
                        <option value='efta'>EFTA (European Free Trade Association)</option>
                        <option value='caricom'>CARICOM (Caribbean Community)</option>
                        <option value='pa'>PA (Pacific Alliance)</option>
                        <option value='au'>AU (African Union)</option>
                        <option value='usan'>USAN (Union of South American Nations)</option>
                        <option value='eeu'>EEU (Eurasian Economic Union)</option>
                        <option value='al'>AL (Arab League)</option>
                        <option value='asean'>ASEAN (Association of Southeast Asian Nations)</option>
                        <option value='cais'>CAIS (Central American Integration System)</option>
                        <option value='cefta'>CEFTA (Central European Free Trade Agreement)</option>
                        <option value='nafta'>NAFTA (North American Free Trade Agreement)</option>
                        <option value='saarc'>SAARC (South Asian Association for Regional Cooperation)</option>
                    </select>
                    {showDesc &&<img className='block-img' src={showDesc.img} alt='regional-block' />}
                    <div>
                        <div className='regional-pagination'>
                            <Pagination postasPerPage={postasPerPage} totalPosts={regionalBloc.length} paginate={paginate}/>
                        </div>
                        <ul>
                            { currentPosts && currentPosts.map(item=>(
                                <li key={item.name}>
                                    <Link to={`/country/${item.name}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div>
                <div  className='regional-desc'>
                {
                    showDesc && blocName && 
                        <div>
                            <h2>{showDesc.name}</h2>
                            <p>{showDesc.desc}</p>
                        </div>
                }
                </div>
            </div>
        )
    }
}

export default RegionalBlocs

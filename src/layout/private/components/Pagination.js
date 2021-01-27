import React from 'react'
import '../../../style/Menu/Pagination.scss'
const Pagination = ({postasPerPage,totalPosts,paginate}) => {
    const pageNumbers=[]
    for(let i=1;i<=Math.ceil(totalPosts/postasPerPage);i++){
        pageNumbers.push(i)
    }
    return (
        <ul className='pagination' >
            {pageNumbers.map(number=>(
                <li key={number} className='page-item' > 
                    <button  style={{width:'20px'}} onClick={()=>{
                        paginate(number)
                    }} href='#' >
                        {number} 
                    </button> 
                </li>
            ))}
        </ul>
    )
}

export default Pagination
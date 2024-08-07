import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft,faAnglesLeft, faAngleRight,faAnglesRight} from '@fortawesome/free-solid-svg-icons'
import './pagination.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getContacts } from '../store/contactSlice';

function pagination() {
  let totalPages = useSelector(store => store.contact.totalPages)
  let currentpage = useSelector(store => store.contact.page)
  let limit = useSelector(store => store.contact.limit)
  let search = useSelector(store => store.contact.search)
  
  const [page, setPage] = useState(currentpage)
  

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber)
  }
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getContacts({limit, page, search}))
  }, [page ,limit])

  return (
    <div className='p-5'>
        <div className="page-btns">
        <button className="sml-btn" onClick={() => {setPage(1)}} ><FontAwesomeIcon icon={faAnglesLeft} /></button>
        <button className="sml-btn" onClick={() => handlePageChange(Math.max(page-1, 1))} ><FontAwesomeIcon icon={faAngleLeft} /></button>
        <div id="paginationId" className="page-btns">
          {
            Array.from({ length: totalPages }).map((_,index) => (
              <button key={index} className={`sml-btn pageBtn ${page === index+1? 'active' : ''}` } onClick = {() => handlePageChange(index+1)}>{index + 1}</button>
            ))
          }
          {/* <button className="sml-btn pageBtn" > 1 </button> */}
        </div>
        <button className="sml-btn" onClick={() => handlePageChange(Math.min(page + 1, totalPages))} ><FontAwesomeIcon icon={faAngleRight} /></button>
        <button className="sml-btn" onClick={() => {setPage(totalPages)}}  ><FontAwesomeIcon icon={faAnglesRight} /></button>
    </div>
    </div>
  )
}

export default pagination
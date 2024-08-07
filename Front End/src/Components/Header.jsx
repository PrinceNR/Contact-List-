import React, { useEffect, useState } from 'react'
import "./Header.css"
import Form from './form'
import { useDispatch, useSelector } from 'react-redux'
import { getContacts } from '../store/contactSlice'
function Header() {
   const [modal , setModal] = useState(false)

   const toggleModal = () => {
     setModal(!modal)
   }

   const data = {
     firstName: '',
     lastName: '',
     email: '',
     phone: ''
   }
   let page = 1;
   let limit = useSelector(store => store.contact.limit)
   let newSearch = useSelector(store => store.contact.search)

   const [search, setSearch] = useState(newSearch)

   const handleInputChange = (e) => {
    setSearch(e.target.value)
   }
  const dispatch = useDispatch()
   
  useEffect(() => {
    setTimeout(() => {
      dispatch(getContacts({limit, search, page}))
    }, 1000);
    console.log("its here");
    
  }, [handleInputChange])


  return (
    <div >
        <div className='d-flex justify-content-between main-header p-4'>
        <div>
            <h3>Contacts</h3>
        </div>
        <div className='d-flex gap-5'>
            <button onClick={toggleModal} className='btn btn-primary'>
                 <b>Add Contacts</b>
            </button>
            <div className="form-group has-search gap-5">
                <span className="fa fa-search form-control-feedback"></span>
                <input type="text" className="form-control search-id-form" onChange={handleInputChange} placeholder="Search Contacts" />
            </div>
        </div>
    </div>
    {modal && <Form add={true} data={data} toggleModal={toggleModal}/>}
    </div>

  )
}

export default Header 
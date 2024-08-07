import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteContact } from '../store/contactSlice'
import './deletePopup.css'
   
 function DeletePopup( {toggleModal , id}) {
  const dispatch = useDispatch()
  
  return (
    <div className='model'>
    <div className='overlay' onClick={toggleModal}>
    </div>
      <div className='modal-content d-flex flex-column delete_form align-center gap-5'>
          <p>Are you sure you want to delete this contact?</p>
          <div className='close-modal' >
            <button className='btn btn-danger' onClick={() => {dispatch(deleteContact(id)); toggleModal()}}>Delete</button>
            <button className='btn btn-primary' onClick={() => {toggleModal()}}>Cancel</button>
          </div>
    </div>
    </div>
  )
}

export default DeletePopup
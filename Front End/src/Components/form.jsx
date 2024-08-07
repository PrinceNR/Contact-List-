import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { addContact } from '../store/contactSlice'
import './form.css'
import { updateContact } from '../store/contactSlice'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function form( props ) {


  const [contact, setContact] = useState({
    firstName: props.data.firstName || '',
    lastName:  props.data.lastName || '',
    email:  props.data.email || '',
    phone: props.data.phone || '',
    id : props.data.id || '',
  })
  const newContact = {
    name : contact.firstName + ' ' + contact.lastName,
    email: contact.email,
    phone: contact.phone,
    id : contact.id || '' 
  }
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setContact({...contact, [name]: value })
    setError({...error, [name]: ''})
  }
  const handleError = () => {
    let validate = true
    let errorArray = {firstName : "", lastName : "", email : "", phone: ""}
    if(contact.firstName == ''){
      errorArray.firstName = 'First Name is required'
      validate = false
    }
    if(!contact.lastName){
      errorArray.lastName = 'Last Name is required'
      validate = false
    }
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contact.email)){
      errorArray.email = 'Please enter a valid email address'
      validate = false
    }
    if(!/^\d{10}$/.test(contact.phone)){
      errorArray.phone = 'Please enter a valid phone number'
      validate = false
    }
    setError(errorArray)
    return validate
  }
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleError()) {
      console.log('Submitted contact:', contact);
      dispatch(addContact(newContact))
      props.toggleModal()
      toast.success("Success Notification !", 
        // {position: toast.POSITION.TOP_RIGHT,}
        );
  
    }
  }

  const hadleEdit = (e) => {
    e.preventDefault();
    if(handleError()){
    console.log('Edit contact:', contact);
    dispatch(updateContact(newContact))
    props.toggleModal()
    }
  }
return (<>

<div className='overlay' onClick={props.toggleModal}> 

</div>
    <div className='form-container'>
      
  <div className='formDiv'>
    <div className='text-center mb-5'>
      <h3><b>{props.add ? "Add" : "Edit"} Contact</b></h3>
    </div>
    <form>
      <div className="form-row">
        <div className="form-group  col-md-6 nameClass">
          <label htmlFor="firstName" className={error.firstName ? "text-danger" : ""}>{ error.firstName ? error.firstName :"First Name"}</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={contact.firstName}
            onChange={handleInputChange}
            name="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="form-group col-md-6 nameClass">
          <label htmlFor="lastName"className={error.lastName !== "" ? "text-danger" : ""} >{ error.lastName ? error.lastName :"Last Name"} </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={contact.lastName}
            onChange={handleInputChange}
            name="lastName"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email"className={error.email !== "" ? "text-danger" : ""} >{ error.email ? error.email :"Email"}</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={contact.email}
          name="email"
          onChange={handleInputChange}
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone" className={error.phone !== "" ? "text-danger" : ""}>{ error.phone || "Phone"}</label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          value={contact.phone}
          name="phone"
          onChange={handleInputChange}
          placeholder="Phone"
        />
      </div>
      <div className="button-row">
        {props.add ? <button type="button" className="btn btn-success" onClick={handleSubmit}>Add</button> :<button type="button" className="btn btn-success" onClick={hadleEdit}>
          Edit
        </button> }
        
        <button type="button" className="btn btn-danger" onClick={props.toggleModal} >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
{

}

</>
  )
}

export default form
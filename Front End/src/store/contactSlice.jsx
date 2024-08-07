import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { statusCode } from "../Components/statuscode";
import { toast } from "react-toastify";

const mainURL = "http://localhost:3001/contact/";


const initialState ={
    contacts: [],
    count : 0,
    limit : 5,
    page : 1,
    totalPages : 0,
    search : '',
    start : 0,
    status : 'idle'
}
export const getContacts = createAsyncThunk(
    "contacts/getContacts", 
    async (data) => {
        const response = await axios(`${mainURL}contacts?limit=${data.limit}&search=${data.search}&page=${data.page}`);
        console.log("responce in slice", response.data);
        return response.data;
    }
)
export const addContact = createAsyncThunk(
    "contact/add", 
    async (data) => {
        
        const response = await axios.post(`${mainURL}add`, data);
        if(response){
            console.log(response.data);
            props.toggleModal()
            toast.success("Contact Added !", 
              );
            return response.data;
        }
        else{
            toast.error("Error Occured");
        }
    })     

export const deleteContact = createAsyncThunk(
    "contact/delete", 
    async (id) => {
        const response = await axios.delete(`${mainURL}remove/${id}`,)
        console.log("Sucess delete" + response)
        if (response) {
            toast.success("Contact Deleted !",  );
        }
        else{
            toast.danger("Error Occured");
        }
        return response.data;
    })
export const updateContact = createAsyncThunk(
    "contact/update", 
    async (data) => {
        const response = await axios.put(`${mainURL}edit/${data.id}`, data)
        if (response) {
            toast.success("Contact Updated !",  );
        }
        else{
            toast.error("Error Occured  !");
        }

        return response.data;
    })

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers:{
        add:(state, action) => {
            state.push(action.payload)
        },
        remove : (state, action) => {
            state = state.filter(contact => contact.id !== action.payload)
        },
        update : (state, action) => {
            state = state.map(contact => contact.id === action.payload.id? {...contact, ...action.payload}:contact )
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(getContacts.pending, (state, action) => {
            state.status = statusCode.LOADING
        })
        .addCase(getContacts.fulfilled, (state, action) =>  {
            state.status = statusCode.SUCCESS
            state.contacts = action.payload.contacts
            state.count = action.payload.count
            state.page = action.payload.page
            state.totalPages = action.payload.totalPages
            state.limit = action.payload.limit
            state.search = action.payload.search
            state.start = action.payload.startIndex
        })
        .addCase(getContacts.rejected, (state, action) => {
            state.status = statusCode.ERROR
        })
        .addCase(addContact.fulfilled, (state, action) => {
            console.log(action.payload);
            state.status = statusCode.SUCCESS
            state.contacts =state.contacts.shift(action.payload.contact)  // [...state.contacts, action.payload.contact]
            state.count = state.count + 1
        }).addCase(updateContact.fulfilled, (state, action) => {
            console.log(action.payload);
            state.status = statusCode.SUCCESS
            state.contacts = state.contacts.map(contact => contact._id === action.payload.contact._id? {...contact, ...action.payload.contact}:contact )
            console.log(state.contacts);
        })
        .addCase(deleteContact.fulfilled, (state, action) => {
            console.log(action.payload);
            state.status = statusCode.SUCCESS
            state.contacts = state.contacts.filter(contact => contact._id !== action.payload.deletedContact._id) })
        
    }
})


export const {add, remove, update} = contactSlice.actions;
export default contactSlice.reducer;   
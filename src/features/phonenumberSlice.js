import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    phonenumber: ''
}

const phoneNoSlice = createSlice({
    name:'phoneNumber',
    initialState,
    reducers:{
        setNumber:(state,action) => {
           state.phonenumber = action.payload
        }
    }
})

export const {setNumber} = phoneNoSlice.actions
export default phoneNoSlice.reducer
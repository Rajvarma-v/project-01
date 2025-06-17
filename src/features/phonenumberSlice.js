import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    phonenumber: '',
    loginState:'false'
}

const phoneNoSlice = createSlice({
    name:'phoneNumber',
    initialState,
    reducers:{
        setNumber:(state,action) => {
           state.phonenumber = action.payload
        },
        
        setloginState:(state,action) =>{
            state.loginState  = action.payload
        }
    }
})

export const {setNumber,setloginState} = phoneNoSlice.actions
export default phoneNoSlice.reducer
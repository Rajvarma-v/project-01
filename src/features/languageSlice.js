import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectLanguage: null, 
};

const languageSlice = createSlice({
    name:'language',
    initialState,
    reducers : {
        setLanguage :(state,action) => {
            state.selectLanguage = action.payload;
        }
    }
})

export const {setLanguage} = languageSlice.actions
export default languageSlice.reducer
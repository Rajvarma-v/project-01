import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './features/appointmentSlice.js'
import languageReducer from './features/languageSlice.js'
import phonenumberReducer from './features/phonenumberSlice.js'

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    language : languageReducer,
    phoneNumber : phonenumberReducer
  },
});

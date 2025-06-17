import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './features/appointmentSlice.js';
import languageReducer from './features/languageSlice.js';
import phonenumberReducer from './features/phonenumberSlice.js';
import appointmentDataReducer from './features/appointmentdataSlice.js'; // fixed import

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    language: languageReducer,
    phoneNumber: phonenumberReducer,
    appointmentData: appointmentDataReducer, // fixed key match
  },
});

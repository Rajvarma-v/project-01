import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  view: 'upcoming', 
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const { setView } = appointmentSlice.actions;
export default appointmentSlice.reducer;

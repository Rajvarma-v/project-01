import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
};

const appointmentDataSlice = createSlice({
  name: "appointmentData", 
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },

    updateAppointmentStatus: (state, action) => {
      const { appointmentId, status } = action.payload;
      const appointment = state.appointments.find(
        (appt) => appt.appointmentId === appointmentId
      );
      if (appointment) {
        appointment.status = status;
      }
    },
  },
});

export const { addAppointment, updateAppointmentStatus } = appointmentDataSlice.actions;
export default appointmentDataSlice.reducer;

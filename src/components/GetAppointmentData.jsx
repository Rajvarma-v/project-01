import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateAppointmentStatus } from "../features/appointmentdataSlice";
import { setView } from "../features/appointmentSlice";

const GetAppointmentData = () => {
  const allAppointments = useSelector((state) => state.appointmentData.appointments);
  const phoneNumber = useSelector((state) => state.phoneNumber.phonenumber);
  const view = useSelector((state) => state.appointment.view);
  const dispatch = useDispatch();

  const [cancelledAppointments, setCancelledAppointments] = useState([]);

  const today = new Date();

  const userAppointments = allAppointments.filter(
    (apt) => apt.userNumber === phoneNumber
  );

  const handleStatus = (appointmentId) => {
    dispatch(updateAppointmentStatus({ appointmentId, status: "Cancelled" }));
    setCancelledAppointments((prev) => [...prev, appointmentId]);
    dispatch(setView("history"));
  };

  const isPastDate = (dateStr) => {
    const aptDate = new Date(dateStr);
    return aptDate < today.setHours(0, 0, 0, 0);
  };

  const renderAppointmentCard = (appointment) => {
    const past = isPastDate(appointment.date);

    return (
      <Container
        key={appointment.appointmentId}
        maxWidth="md"
        sx={{
          border: "2px solid lightgrey",
          mt: "2vh",
          borderRadius: "10px",
          p: 2,
          mb: 2
        }}
      >
        <Typography variant="h6">
          Appointment ID: {appointment.appointmentId}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Box sx={{p: 1, pl:0 }}>
            <Typography>Appointment for: {appointment.date}</Typography>
          </Box>
          <Box sx={{ border: "1px solid black", borderRadius: "25px", p: 1.5 }}>
            {appointment.time}  -   {appointment.time}
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          {appointment.departments?.map((dept) => (
            <Box
              key={dept}
              sx={{
                p: 2,
                bgcolor:"lightgrey",
                borderRadius: "10px",
                mb: 1
              }}
            >
              {dept}
            </Box>
          ))}
        </Box>

         <Box sx={{width:"100%", height:"1px", mt:2, border:"1px solid lightgrey"}}></Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            p: 1
          }}
        >
    
          {view === "upcoming" &&
            appointment.status === "Approved" &&
            !past && (
              <Button
                color="error"
                onClick={() => handleStatus(appointment.appointmentId)}
                disabled={cancelledAppointments.includes(appointment.appointmentId)}
              >
                Cancel Appointment
              </Button>
            )}

      
          {view === "history" &&
            appointment.status === "Cancelled" && (
              <Button
                variant="contained"
                disabled
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&.Mui-disabled": {
                    backgroundColor: "rgb(255, 209, 209)",
                    color: "red",
                    borderRadius: "20px"
                  }
                }}
              >
                Cancelled
              </Button>
            )}

         
          {view === "history" &&
            appointment.status === "Approved" &&
            past && (
              <Button
                variant="contained"
                disabled
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  "&.Mui-disabled": {
                    backgroundColor: "#b8e6b8",
                    color: "green",
                    borderRadius: "20px"
                  }
                }}
              >
                Approved
              </Button>
            )}

          <Button
            variant="text"
            sx={{
              color: "purple",
              textDecoration: "underline"
            }}
          >
            View Details
          </Button>
        </Box>
      </Container>
    );
  };

  const renderApprovedAppointments = () => {
    const approved = userAppointments.filter(
      (appointment) =>
        appointment.status === "Approved" && !isPastDate(appointment.date)
    );

    if (approved.length === 0) {
      return <Typography>No Upcomming Appointments Found.</Typography>;
    }

    return approved.map(renderAppointmentCard);
  };

  const renderCancelledAppointments = () => {
    const cancelled = userAppointments.filter(
      (appointment) =>
        appointment.status === "Cancelled" ||
        (appointment.status === "Approved" && isPastDate(appointment.date))
    );

    if (cancelled.length === 0) {
      return <Typography>No Past Appointments Found.</Typography>;
    }

    return cancelled.map(renderAppointmentCard);
  };

  return view === "upcoming"
    ? renderApprovedAppointments()
    : renderCancelledAppointments();
};

export default GetAppointmentData;

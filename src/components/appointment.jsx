import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Modal,
  Paper,
  IconButton,
  Stack
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "../features/appointmentSlice";
import { useNavigate } from "react-router-dom";
import GetAppointmentData from "./GetAppointmentData";
import appointmentlistlogo from "../assets/appointmentlistlogo.png";
import historydatalogo from "../assets/historydatalogo.png";


const Appointment = () => {
  const [showFilters, setShowFilters] = useState(false);
  const view = useSelector((state) => state.appointment.view);
  const allAppointments = useSelector((state) => state.appointmentData.appointments);
  const phoneNumber = useSelector((state) => state.phoneNumber.phonenumber);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAppointments = allAppointments.filter(
    (appointment) => appointment.userNumber === phoneNumber
  );

  const hasApproved = userAppointments.some((apt) => apt.status === "Approved");
  const hasCancelled = userAppointments.some((apt) => apt.status === "Cancelled");

  useEffect(() => {
    document.body.style.overflow = showFilters ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFilters]);

  const renderContent = () => {
    if (view === "upcoming") {
      if (hasApproved) return <GetAppointmentData />;
      return (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" textAlign={"left"}>No Upcoming Appointments!</Typography>
          <Typography textAlign={"left"}>Looks like you don’t have any Upcoming appointments.</Typography>
          <Box component="img" src={appointmentlistlogo} width={200} mt={2} />
        </Box>
      );
    } else {
      if (hasCancelled) return <GetAppointmentData />;
      return (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" textAlign={"left"}>No Appointments History!</Typography>
          <Typography textAlign={"left"}>Looks like you don’t have any past appointments.</Typography>
          <Box component="img" src={historydatalogo} width={200} mt={2} />
        </Box>
      );
    }
  };

  return (
    <Container maxWidth="md" sx={{ pb: 12,  mb:"5vh", mt:{xs:"12vh", sm:"15vh"}}}>
     
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2} sx={{borderRadius:15}}>
        <TextField
          fullWidth
          placeholder="Search your appointment"
          sx={{borderRadius:"100px"}}
          inputprops={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button onClick={() => setShowFilters(true)} sx={{color:"rgb(201,201,201)" }}>
          <FilterAltIcon sx={{p:0.5, fontSize: 50, color:"rgb(134, 57, 130)", bgcolor:"rgb(231, 214, 240)", borderRadius:"10px" }} /> 
        </Button>
      </Box>

    
      <Box display="flex" justifyContent="space-around" mb={2}>
        <Button
          onClick={() => dispatch(setView("upcoming"))}
          sx={{
            color: view === "upcoming" ? "purple" : "#919192",
            borderBottom: view === "upcoming" ? "3px solid purple" : "none",
            borderRadius: 0,
          }}
        >
          Upcoming Appointments
        </Button>
        <Button
          onClick={() => dispatch(setView("history"))}
          sx={{
            color: view === "history" ? "purple" : "#919192",
            borderBottom: view === "history" ? "3px solid purple" : "none",
            borderRadius: 0,
          }}
        >
          History
        </Button>
      </Box>

      {renderContent()}

      <Box
        position="fixed"
        bottom={0}
        left={0}
        width="100%"
        zIndex={999}
        bgcolor="#fff"
        borderTop="1px solid #ccc"
        py={2}
      >
        <Container maxWidth="md" >
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "rgb(103, 31, 148)",
              borderRadius: "15px",
              fontSize: "20px",
              p: 1.5,
              textTransform: "none",
              border:"none"
            }}
            onClick={() => navigate("/bookappointment")}
          >
            Book New Appointment
          </Button>
        </Container>
      </Box>


      <Modal open={showFilters} onClose={() => setShowFilters(false)}>
        <Box
          component={Paper}
          elevation={4}
          sx={{
            maxWidth: 400,
            width: "90%",
            mx: "auto",
            mt: 10,
            p: 3,
            borderRadius: 2,
            position: "relative",
          }}
        >
          <Typography variant="h6" mb={2}>
            Filter Options
          </Typography>

          <Typography>Select Status:</Typography>
          <Box>
            <Button variant="outlined">Completed</Button>
            <Button variant="outlined">Missed</Button>
            <Button variant="outlined">Cancelled</Button>
            <Button variant="outlined">Rejected</Button>
          </Box>

          <Typography mt={2}>Select Date:</Typography>
          <Stack direction="row" spacing={2} my={1}>
            <TextField type="date" fullWidth size="small" />
            <TextField type="date" fullWidth size="small" />
          </Stack>

          <Stack direction="row" spacing={2} mt={3}>
            <Button fullWidth onClick={() => setShowFilters(false)} variant="outlined">
              Reset Filters
            </Button>
            <Button fullWidth variant="contained">Apply Filters</Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default Appointment;

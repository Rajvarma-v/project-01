import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormHelperText,
  IconButton,
  Grid,
  Chip 
} from "@mui/material";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "../features/appointmentdataSlice";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phoneNumber = useSelector((state) => state.phoneNumber.phonenumber);

  const visitorypes = [
    "Contractor", "Client", "Maintenance Staff", "Consultant",
    "Government Official", "Service Engineer",
  ];

  const departments = [
    "Person with Disabilities Welfare Department - Main Building",
    "Other Backward Bahujan Welfare Department - Main Building",
    "Animal Husbandry & Dairy & Frishary Department - Main Building",
    "Medical Education & Drugs Department - Main Building",
    "Energy & Labour Department - Main Building",
  ];

  const purposetype = [
    "Personal", "Official Work", "Meeting", "Document Submission",
    "Follow-up Visit", "Consultation", "Service Request", "Enquiry",
  ];

  const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

  const [formData, setFormData] = useState({
    visitortype: "",
    departments: [],
    purposetype: "",
    date: selectedDate,
    time: "",
    status: "Approved",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setFormData((prev) => ({
      ...prev,
      date: newDate,
    }));
  };

  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 3) {
      setFormData((prev) => ({
        ...prev,
        departments: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointment = {
      appointmentId: Date.now(), 
      userNumber: phoneNumber,   
      date: selectedDate,
      time: formData.time,
      purpose: formData.purposetype,
      visitortype: formData.visitortype,
      departments: formData.departments,
      status: "Approved",
    };

    dispatch(addAppointment(appointment));
    alert("Appointment booked successfully!");

    setFormData({
      visitortype: "",
      departments: [],
      purposetype: "",
      date: selectedDate,
      time: "",
      status: "Approved",
    });

    navigate("/appointment")
  };

  return (
    <Container maxWidth="md" sx={{ p: 2, mt: "13vh" }}>
          <Box sx={{mb:1, position: "relative" }}>
                <IconButton
                onClick={() => navigate("/")}
                sx={{ color: "#7e22ce", display: "flex", alignItems: "center", gap: "4px" }}
              >
                  <ArrowBackIcon />
                  <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>Book an appointment</Typography>
              </IconButton>
          </Box>
      
      <Typography variant="h5" gutterBottom>
        Book an Appointment
      </Typography>

      <Box mb={4}>
        <Typography>
          Let's get you started. Fill in a few details and book your appointment in less than 2 minutes.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          <Grid size={{xs:12}}>
            <Typography fontWeight={500} mb={1}>
              Visitor Type<Box component="span" sx={{ color: "red" }}>*</Box>
            </Typography>
            <TextField
              fullWidth
              select
              name="visitortype"
              value={formData.visitortype}
              onChange={handleChange}
               InputProps={{
                sx: {
                  borderRadius: '13px',
                },}}
              required
            >
              {visitorypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{xs:12}}>
            <Typography fontWeight={500} mb={1}>
              Department to Visit<Box component="span" sx={{ color: "red" }}>*</Box>
            </Typography>
            <FormControl fullWidth>
              <Select
                multiple
                displayEmpty
                name="departments"
                value={formData.departments}
                onChange={handleDepartmentChange}
                renderValue={() => "Selected Departments"}
                 sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '13px',
                  },
                  borderRadius: '13px', 
                }}
              >
                {departments.map((dept) => (
                  <MenuItem
                    key={dept}
                    value={dept}
                    disabled={
                      formData.departments.length === 3 &&
                      !formData.departments.includes(dept)
                    }
                  >
                    <Checkbox checked={formData.departments.includes(dept)} />
                    <ListItemText primary={dept} />
                  </MenuItem>
                ))}
              </Select>

              {formData.departments.length === 3 && (
                <FormHelperText sx={{ color: "red" }}>
                  You can only select up to 3 departments.
                </FormHelperText>
              )}
            </FormControl>

            <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
              {formData.departments.map((dept) => (
                <Chip
                  key={dept}
                  label={dept}
                  onDelete={() =>
                    setFormData((prev) => ({
                      ...prev, departments: prev.departments.filter((d) => d !== dept),
                    }))
                  }
                  sx={{ backgroundColor: "#f1f1f1" }}
                />
              ))}
            </Box>
          </Grid>

          <Grid size={{xs:12}}>
            <Typography fontWeight={500} mb={1}>
              Purpose Type<Box component="span" sx={{ color: "red" }}>*</Box>
            </Typography>
            <TextField
              fullWidth
              name="purposetype"
              value={formData.purposetype}
              onChange={handleChange}
              select
              required
              InputProps={{
                sx: {
                  borderRadius: '13px',
                },}}
            >
              {purposetype.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{xs:12}}>
            <Typography fontWeight={500} mb={1}>
              Select Date of Appointment<Box component="span" sx={{ color: "red" }}>*</Box>
            </Typography>

            <TextField
              type="date"
              fullWidth
              value={selectedDate}
              onChange={handleDateChange}
              InputProps={{
                sx: {
                  borderRadius: '13px',
                },}}
              required
            />

            <Box display="flex" gap={1} mt={2} overflow="auto">
              {[...Array(7)].map((_, i) => {
                const date = dayjs(selectedDate).add(i, "day");
                const isSelected = date.format("YYYY-MM-DD") === selectedDate;

                return (
                  <Button
                    key={i}
                    onClick={() => {
                    const formatted = date.format("YYYY-MM-DD");
                    setSelectedDate(formatted);
                    setFormData((prev) => ({
                      ...prev,
                      date: formatted,
                    }));
                  }}

                    sx={{
                      width: 40,
                      height: 40,
                      minWidth: 40,
                      borderRadius: "50%",
                      bgcolor: isSelected ? "purple" : "",
                      color: isSelected ? "white" : "black",
                      fontWeight: "bold",
                    }}
                    variant={isSelected ? "contained" : "outlined"}
                  >
                    {date.date()}
                  </Button>
                );
              })}
            </Box>
          </Grid>

          <Grid size={{xs:12}}>
            <Typography fontWeight={500} mb={1}>
              Select Time Slot<Box component="span" sx={{ color: "red" }}>*</Box>
            </Typography>
            <TextField
              fullWidth
              select
              name="time"
              value={formData.time}
              onChange={handleChange}
              InputProps={{
                sx: {
                  borderRadius: '13px',
                },}}
              required
            >
              {timeSlots.map((slot) => (
                <MenuItem key={slot} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{xs:12}}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2, p: 1.5 }}
            >
              Book Now
            </Button>
          </Grid>

        </Grid>
      </form>
    </Container>
  );
}

export default BookAppointment;

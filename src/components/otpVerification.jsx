import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Container,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OTPVerificationImage from "../assets/OTPVerificationImage.jpg";

import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

import HelpIcon from "@mui/icons-material/Help";
import LockIcon from "@mui/icons-material/Lock";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const navigate = useNavigate();
  const correctOTP = "123456";

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerifyOTP = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Please enter a 6-digit OTP.");
      return;
    }

    if (enteredOtp === correctOTP) {
      alert("OTP Verified Successfully!");
      navigate("/aadharVerificationPage");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#fdfbfe",
          display: "flex",
          flexDirection: "column",
          mt:10
        }}
      >
       
        <Box sx={{ p: 1 }}>
          <IconButton onClick={() => navigate("/phoneNumberVerificationPage")}>
            <ArrowBackIcon sx={{ color: "#7e22ce" }} />
          </IconButton>
        </Box>

  
        <Container
          maxWidth="sm"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <img
              src={OTPVerificationImage}
              alt="OTP Illustration"
              style={{ width: 200, marginBottom: "5px" }}
            />
          </Box>

          <Box
            sx={{
              mb: 2,
              maxWidth: "340px",
              mx: "auto",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Let’s Verify Your OTP
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Enter the 6 digit OTP sent to your registered mobile number
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mb: 2,
            }}
          >
            {otp.map((value, index) => (
              <TextField
                key={index}
                id={`otp-${index}`}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "18px",
                    padding: "10px",
                  },
                }}
                sx={{
                  width: 44,
                  height: 62,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            ))}
          </Box>

         
          <Typography textAlign="center" variant="body2" color="gray" mb={2}>
            Didn’t receive an OTP?{" "}
            <Typography
              component="span"
              sx={{
                color: "#6a0dad",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Resend OTP
            </Typography>{" "}
            in {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}{" "}
            sec
          </Typography>

      
          <Box textAlign="center" mt={2}>
            <Button
              fullWidth
              sx={{
                backgroundColor: "#c084fc",
                color: "#fff",
                borderRadius: "12px",
                maxWidth: "340px",
                height: "48px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
                mx: "auto",
              }}
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </Button>
          </Box>
        </Container>

      
        <SpeedDial
          ariaLabel="More Actions"
          sx={{
            position: "fixed",
            bottom: 90,
            right: 20,
            "& .MuiFab-primary": {
              backgroundColor: "#d8b4fe",
              color: "#6a0dad",
            },
          }}
          icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
          direction="up"
        >
          <SpeedDialAction
            icon={<HelpIcon />}
            slotProps={{ tooltip: { title: "Help" } }}
          />
          <SpeedDialAction
            icon={<LockIcon />}
            slotProps={{ tooltip: { title: "Privacy" } }}
          />
          <SpeedDialAction
            icon={<InfoIcon />}
            slotProps={{ tooltip: { title: "Info" } }}
          />
        </SpeedDial>
      </Box>
    </Container>
  );
}

export default OTPVerificationPage;

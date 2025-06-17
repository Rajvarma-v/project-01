import React, { useState, useEffect } from "react";

import {
  Box,
  Grid,
  Button,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
  IconButton
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import LockIcon from "@mui/icons-material/Lock";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

import { Container,Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OTPVerificationImage from "../assets/OTPVerificationImage.jpg";
import DGPhandlogo from "../assets/DGPhandlogo.jpg"

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../features/phonenumberSlice";

function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.phoneNumber.loginState)
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
      dispatch(setloginState(!loginState))
       setTimeout(() => {
        navigate("/aadharVerificationPage");
      }, 100)
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
     <Grid container columns={12} >

        <Grid size={{ xs: 12, sm: 6 }} >
          
                <Box sx={{ p: 1, position: "fixed", top: "5px", left: "5px" }}>
                  <IconButton
                    onClick={() => navigate("/phonenoverificationpage")}
                    sx={{ color: "#7e22ce", display: "flex", alignItems: "center", gap: "4px" }}
                  >
                      <ArrowBackIcon />
                      <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>Back</Typography>
                  </IconButton>
               </Box>


              <Box sx={{ width:"100%", height:{xs:"auto", sm:"100vh"}, display:"flex", justifyContent:"center", alignItems:"center"}}>
                  <Box
                  
                    component="img"
                    src={OTPVerificationImage}
                    sx={{
                      mt:{xs:"15vh", sm:"0px"},
                      height:{xs:"260px", sm :"40vh", md:"50vh"},      
                    }}
                  />
              </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }} sx={{height: { xs: "calc(85vh - 260px)", sm: "100vh" }, display:  "flex" ,justifyContent:"center", flexDirection:"column", alignItems: "center" ,}}>
            <Box sx={{ mt:{xs:"4vh", sm:"0px"},width:"100%", maxWidth:{xs:"550px", sm:"600px"} , flexGrow:{xs:"1",sm:"0"},  display:"flex", flexDirection:"column", alignItems:"center"}}>
          
              <Box mb={2} sx={{ width:{xs:"100%", sm:"100%"}, position:{xs:"fixed", sm:"static"}, display:{xs:"none",sm:"block"}, top:{xs:"0px"}, left:{xs:"0px"},  flexDirection:"column", alignItems:"center"}} >
                <Box p={2} pb={0.5} sx={{ width:{xs:"100%"},  display:"flex"}}>
            
                    <Box
                      component="img"
                      src={DGPhandlogo}
                      alt="Greeting Hands Logo"
                      sx={{
                        height:{xs:"30px", sm:"36px", md:"45px", lg:"55px"},
                        borderRadius:50,
                        marginRight:1.5,
                        mt:0.5
                      }}
                    />

                      <Box>
                        <Typography variant="h4" sx={{fontSize:{xs:"30px", sm:"40px", md:"45px", lg:"55px"}}}>Digi <span style={{ color: "purple" }}>Pravesh</span></Typography>
                        <Typography variant="h6" sx={{fontSize:{xs:"15px", sm:"18px", md:"25px", lg:"25px"}}} color="purple">Govt. of Maharastra</Typography>
                      </Box>                 

                 </Box>

                 <Box sx={{textAlign:"left", width:{xs:"100%"} }}>
                   <Typography sx={{ml:{xs:2.3,sm:3, md:3, xl:2}, fontSize:{xs:"13px", sm:"15px", md:"18px", lg:"20px"}}}> Fast, Safe, and Aadhaar-Verified</Typography>
                 </Box>
              </Box>

        
              <Box
                sx={{
                  flexGrow:{xs:"1",sm:"0"},
                  px: 2,
                  py: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent:"space-between",
                  alignItems:{xs:"center",sm:"flex-start"},
                  gap: 1.5,
                  // bgcolor:"skyblue",
                  width: "100%", maxWidth:{xs: "400px", sm:"600px"}
                }}
              >
              
              <Box>

                <Box sx={{p:{xs:"5px"}, width: "100%", maxWidth:{xs: "400px", sm:"600px"},}}>
                                    
                       <Typography variant="h6" fontWeight="bold">
                        Let’s Verify Your OTP
                      </Typography>
                      <Typography sx={{ mt: 1 }}>
                        Enter the 6 digit OTP sent to your registered mobile number
                      </Typography>
                 
                </Box>

                  <Box
                      sx={{
                        width: "100%",
                        maxWidth:{xs: "430px", sm:"600px"},
                        display: "flex",
                        justifyContent: {xs:"center", sm:"flex-start"},
                        gap: 2,
                        mt:2,
                        // bgcolor:"pink"
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
                              // backgroundColor:"red"
                            },
                          }}
                          sx={{
                            width: 47,
                            height: 62,
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
                            },
                          }}
                        />
                      ))}
                  </Box>
 
                      <Typography  variant="body2" color="gray" mb={2} sx={{textAlign:{xs:"center",sm:"left"}}}>
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

                </Box>    

                <Box textAlign="center" mt={2} sx={{
                      width: "100%",
                      maxWidth:{xs: "430px", sm:"600px"},
                }}> 
                    <Button
                      fullWidth
                      sx={{
                        backgroundColor: "#c084fc",
                        color: "#fff",
                        borderRadius: "12px",
                        width: "100%",
                        maxWidth:{xs: "430px", sm:"600px"},
                        height: "48px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform: "none",
                        mx: "auto"
                      }}
                      onClick={handleVerifyOTP}
                    >
                      Verify OTP
                    </Button>
                  </Box>

               </Box>
             </Box>  
        </Grid>

        <SpeedDial
          ariaLabel="More Actions"
          sx={{
            position: "fixed",
            bottom: 90,
            right: 20,
            "& .MuiFab-primary": {
              backgroundColor: "rgb(179, 120, 242)",
              color: "#6a0dad",
            },
          }}
          icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
          direction="up"
        >
          <SpeedDialAction icon={<HelpIcon />} tooltipTitle="Help" />
          <SpeedDialAction icon={<LockIcon />} tooltipTitle="Privacy" />
          <SpeedDialAction icon={<InfoIcon />} tooltipTitle="Info" />
        </SpeedDial>
      </Grid>
  );
}

export default OTPVerificationPage;


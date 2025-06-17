import React, { useState } from "react";
import LogoComponent from "./logocomponent";
import phonelogo from "../assets/phonelogo.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { setNumber } from "../features/phonenumberSlice";
import { useNavigate } from "react-router-dom";
import DGPhandlogo from "../assets/DGPhandlogo.jpg";

import {
  Box,
  Grid,
  Button,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import LockIcon from "@mui/icons-material/Lock";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

import { Container,Typography} from "@mui/material";

function PhoneNumberVerificationPage() {
  const [localNumber, setLocalNumber] = useState("");
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isValid = /^\d{10}$/.test(localNumber);

  const handleSendOtp = () => {
    if (!isValid){
      alert("Enter 10 digit number");
      return;
    }
    setSending(true);

    const fullPhoneNumber = "+91" + localNumber;
    dispatch(setNumber(fullPhoneNumber));

      navigate("/otpVerification");
  };

  return (
      <Grid container columns={12} >

        <Grid size={{ xs: 12, sm: 6 }} >
          <Box sx={{ width:"100%",bgcolor:{xs:"white", sm : "rgb(239, 239, 239)"}, height:{xs:"auto", sm:"100vh"}, display:"flex", justifyContent:"center", alignItems:"center"}}>
              <Box
              
                component="img"
                src={phonelogo}
                sx={{
                  mt:{xs:"15vh", sm:"0px"},
                  height:{xs:"260px", sm :"40vh", md:"50vh"},       
                }}
              />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }} sx={{height: { xs: "calc(85vh - 260px)", sm: "100vh" }, display:  "flex" ,justifyContent:"center", flexDirection:"column", alignItems: "center" ,}}>
            <Box sx={{ mt:{xs:"4vh", sm:"0px"},width:"100%", maxWidth:{xs:"550px", sm:"600px"} , flexGrow:{xs:"1",sm:"0"},  display:"flex", flexDirection:"column"}}>
          
              <Box mb={2} sx={{ width:{xs:"100%", sm:"100%"}, position:{xs:"fixed", sm:"static"}, top:{xs:"0px"}, left:{xs:"0px"},  flexDirection:"column", alignItems:"center"}} >
                <Box p={2} pb={0.5} sx={{ width:{xs:"100%"},  display:"flex"}}>
            
                    <Box
                      component="img"
                      src={DGPhandlogo}
                      alt="Greeting Hands Logo"
                      sx={{
                        height:{xs:"30px", sm:"30px", md:"45px", lg:"55px", xl:"45px"},
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
                  width: "100%",
                  flexGrow:{xs:"1",sm:"0"},
                  px: 2,
                  py: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent:"space-between",
                  alignItems:{xs:"center",sm:"flex-start"},
                  gap: 1.5,
                }}
              >
                <Box sx={{ width:"100%",}}>
                    <Typography variant="h5" fontWeight={600}>
                      Let's Verify Your Mobile Number
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Enter your 10 Digit Mobile Number to begin with the registration process
                    </Typography>

                    <Typography sx={{ mt: 4, fontWeight: 500 }}>
                      Mobile Number*
                    </Typography>

                    <PhoneInput
                      country={"in"}
                      value={"91" + localNumber}
                      onChange={(value, data) => {
                        const dialCode = data.dialCode || "91";
                        const localNum = value.startsWith(dialCode) ? value.slice(dialCode.length) : value;
                        setLocalNumber(localNum);
                      }}
                      inputProps={{ required: true, name: "phone" }}
                      containerStyle={{
                        width: "100%",
                        maxWidth:{xs: "430px", sm:"600px"},
                        marginTop: "8px",
                        borderRadius: "10px",
                        padding:"5px",
                        backgroundColor: "#fff",
                        border: "2px solid rgb(118, 114, 114)",                                     
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "42px",
                        fontSize: "16px",
                        paddingLeft: "55px",
                        border: "none",
                        borderRadius: "10px",
                        backgroundColor: "transparent",
                        outline: "none",
                        color: "#333",
                      }}
                      buttonStyle={{
                        border: "none",
                        background: "none",
                        paddingLeft: "12px",
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                      dropdownStyle={{
                        borderRadius: "10px",
                        zIndex: 1000,
                      }}
                    />

                    <Typography sx={{ width: "100%", textAlign: "right", fontSize: "14px" }}>
                      {localNumber.length}/10
                    </Typography>

                    <Typography sx={{ fontSize: 13, color: isValid ? "green" :"black" }}>
                      {isValid
                        ? "Mobile number is valid"
                        : "Please enter your valid number"}
                    </Typography>
                </Box>

                <Button
                  onClick={handleSendOtp}
                  // disabled={!isValid || sending}
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    maxWidth: "600px",
                    bgcolor:"rgb(179, 120, 242)",
                    color: "white",
                    fontSize: "18px",
                    py: 1.2,
                    borderRadius: "10px",
                    cursor:isValid?"pointer":"not-allowed"
                  }}
                >
                  {sending ? "Sending..." : "Proceed"}
                </Button>
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

export default PhoneNumberVerificationPage;


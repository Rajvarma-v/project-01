import React from "react";
import PhoneNumberVerificationPage from "./phonenoverificationpage";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Link,
  IconButton,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Grid 
} from "@mui/material";


import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import LockIcon from "@mui/icons-material/Lock";
import InfoIcon from "@mui/icons-material/Info";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import phonelogo from "../assets/phonelogo.png";
import DGPhandlogo from "../assets/DGPhandlogo.jpg";
import { useNavigate } from "react-router-dom";

function AadharVerificationPage(){
  const [checked, setChecked] = React.useState(false);
  const handleCheckboxChange = (event) => setChecked(event.target.checked);
  const navigate = useNavigate();
  const [aadhar, setAadhar] = React.useState("");

  const formatAadhar = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 12);
    const parts = digits.match(/.{1,4}/g);
    return parts ? parts.join(" ") : "";
  };

  const handleAadharChange = (e) => {
    const formatted = formatAadhar(e.target.value);
    setAadhar(formatted);
  };

  return (
     <Grid container columns={12} >
      
        <Box sx={{ p: 1, position: "fixed", top: "5px", left: "5px" }}>
          <IconButton
            onClick={() => navigate("/phonenoverificationpage")}
            sx={{ color: "#7e22ce", display: "flex", alignItems: "center", gap: "4px" }}
          >
              <ArrowBackIcon />
              <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>Back</Typography>
          </IconButton>
        </Box>

        <Grid size={{ xs: 12, sm: 6 }} >
          <Box sx={{ width:"100%",bgcolor:{xs:"white", sm : "rgb(239, 239, 239)"}, height:{xs:"auto", sm:"100vh"}, display:"flex", justifyContent:"center", alignItems:"center"}}>
              <Box
              
                component="img"
                src={phonelogo}
                sx={{
                  mt:{xs:"10vh", sm:"0px"},
                  height:{xs:"260px", sm :"40vh", md:"50vh"},       
                }}
              />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }} sx={{height: { xs: "calc(90vh - 260px)", sm: "100vh" }, display:  "flex" ,justifyContent:{xs:"space-between",sm:"center"}, flexDirection:"column", alignItems: "center" ,}}>
            <Box sx={{ mt:{xs:"0px", sm:"0px"},flexGrow:{xs:"1",sm:"0"}, width:"100%", maxWidth:{xs:"550px", sm:"600px"} ,   display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"space-between"}}>
                    
             <Box sx={{p:2,}}> 
                <Box width="100%" sx={{ textAlign: "left" }}>
                     <Typography mb={1.3} variant="h6" fontWeight="bold">
                       Let’s start by Verifying your Aadhar
                     </Typography>

                     <Typography variant="body2" color="text.secondary">
                       One time Aadhar Verification is mandatory to enjoy the convenience
                       of Digi Pravesh for a hassle-free entry into various Govt Offices.
                     </Typography>
                </Box>                

           
                <Box width="100%" mb={5}>
                        <Typography variant="body2" fontWeight="medium" gutterBottom>
                          Please enter your Aadhar Number{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                          placeholder="XXXX XXXX XXXX"
                          variant="outlined"
                          fullWidth
                          value={aadhar}
                          onChange={handleAadharChange}
                          slotProps={{
                            input: {
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                              maxLength: 14,
                            },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />

                        <Typography variant="caption" color="text.secondary" mt={1}>
                          Please keep your Aadhar Linked Mobile phone with you as you will
                          be receiving an OTP on it in the next step.
                        </Typography>
                  </Box>
              </Box>

             <Box sx={{ p:1}}>
                  <Box sx={{ p: 2 ,mb:{xs:2,sm:4}, bgcolor:"rgb(242, 241, 241)", borderRadius:"10px"}} >
                    <FormControlLabel
                      control={
                        <Checkbox checked={checked} onChange={handleCheckboxChange} />
                      }
                      label={
                        <Typography variant="body2">
                          I agree and confirm to the Terms and Conditions mentioned in
                          the{" "}
                          <Link href="https://digipravesh.com/#/support" underline="hover">
                            Privacy Policy
                          </Link>
                        </Typography>
                      }
                    />
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "rgb(179, 120, 242)",
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius:"10px",
                      fontSize:"19px",
                      cursor:checked?"pointer":"not-allowed",
                      p:0.8
                    }}
                    disabled={!checked}
                    
                    onClick={() =>{
                       navigate("/");
                      //  alert("Clicked")
                    }}
                  >
                    Proceed
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
};

export default AadharVerificationPage;





    // <Container
    //   maxWidth="sm"
    //   disableGutters
    //   sx={{
    //     minHeight: "100vh",
    //     px: { xs: 1, sm: 2 },
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     position: "relative",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "space-between",
    //       maxWidth: "500px",
    //       width: "100%",
    //       position: "relative",
    //       bgcolor: "#fff",
    //       borderRadius: 2,
    //       p: { xs: 2, sm: 4 },
    //       minHeight: "85vh",
    //       mt:8
    //     }}
    //   >
    //     <Box>
    //       <IconButton onClick={() => navigate("/phoneNumberVerificationPage")}>
    //         <ArrowBackIcon sx={{ color: "purple" }} />
    //       </IconButton>
    //     </Box>

    //     <Box
    //       display="flex"
    //       flexDirection="column"
    //       alignItems="center"
    //       gap={3}
    //       sx={{ flexGrow: 1 }}
    //     >
    //       <img
    //         src={phonelogo}
    //         alt="phoneImage"
    //         style={{ maxHeight: "300px" }}
    //       />

    //       <Box width="100%" sx={{ textAlign: "left" }}>
    //         <Typography mb={1.3} variant="h6" fontWeight="bold">
    //           Let’s start by Verifying your Aadhar
    //         </Typography>

    //         <Typography variant="body2" color="text.secondary">
    //           One time Aadhar Verification is mandatory to enjoy the convenience
    //           of Digi Pravesh for a hassle-free entry into various Govt Offices.
    //         </Typography>
    //       </Box>

      

    //     </Box>

       
    //     <SpeedDial
    //       ariaLabel="More Actions"
    //       sx={{
    //         position: "absolute",
    //         bottom: { xs: 160, sm: 160 },
    //         right: { xs: 20, sm: 32 },
    //         "& .MuiFab-primary": {
    //           backgroundColor: "#d8b4fe",
    //           color: "#6a0dad",
    //         },
    //       }}
    //       icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
    //       direction="up"
    //     >
    //       <SpeedDialAction
    //         icon={<HelpIcon />}
    //         slotProps={{ tooltip: { title: "Help" } }}
    //       />
    //       <SpeedDialAction
    //         icon={<LockIcon />}
    //         slotProps={{ tooltip: { title: "Privacy" } }}
    //       />
    //       <SpeedDialAction
    //         icon={<InfoIcon />}
    //         slotProps={{ tooltip: { title: "Info" } }}
    //       />
    //     </SpeedDial>

        



    //     </Box>
    //   </Box>
    // </Container>
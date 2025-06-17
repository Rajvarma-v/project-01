import React from "react";
import DGPhandlogo from "../assets/DGPhandlogo.jpg";
import DGPwomanlogo from "../assets/DGPwomanlogo.png";
import { useNavigate } from "react-router-dom";

import { Box, Container, Grid, Typography } from "@mui/material";

function Welcomepage() {
  return (
    // <Box sx={{width:"100%", height:"100vh", }}>
      <Grid container columns={12}>
        <Grid size={{ xs: 12, sm: 6 }}>
          
          <Box sx={{
             height:"100%", width:"100%", display:"flex", justifyContent:{xs:"center",sm:"flex-start"}, alignItems:{xs:"center", sm:"center"}, flexDirection:"column"              
          }}>
          
          <Box sx={{pt:{xs:"100px", sm:"43vh", md:"40vh", lg:"35vh", xl:"28vh"},}}>
            <Box p={2} pb={0.5} sx={{ width:{sx:"100%"}, maxWidth:{sm:"700px"},  display:"flex"}}>
         
                <Box
                  component="img"
                  src={DGPhandlogo}
                  alt="Greeting Hands Logo"
                  sx={{
                    height:{xs:"40px", sm:"45px", md:"55px", lg:"75px", xl:"85px"},
                    borderRadius:50,
                    marginRight:1.5,
                    mt:0.5
                  }}
                />

                  <Box>
                    <Typography variant="h4" sx={{fontSize:{xs:"40px", sm:"35px", md:"55px", lg:"75px", xl:"85px"}}}>Digi <span style={{ color: "purple" }}>Pravesh</span></Typography>
                    <Typography variant="h6" sx={{fontSize:{xs:"20px", sm:"20px", md:"30px", lg:"35px", xl:"45px"}}} color="purple">Govt. of Maharastra</Typography>
                  </Box>                 

            </Box>

            <Box sx={{textAlign:"left", }}>
              <Typography sx={{ml:{xs:1.3,sm:3, md:3, xl:2},fontSize:{xs:"15px", sm:"15px", md:"20px", lg:"20px", xl:"25px"}}}> Aadhar Verified Visitor Management System</Typography>
            </Box>
          </Box>

          <Box sx={{position:"fixed", bottom:"20px", left:{sm:"10vw"}, p:2}}>
            <Typography sx={{fontSize:{xs:"15px", sm:"15px", md:"20px", lg:"20px", xl:"25px"}}}>
              Powered by <b>SECUTECH</b>
            </Typography>
          </Box>

          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{width:{sm:"45%"}, height: { xs: "100%", sm: "80vh", md:"85vh" }, position:{sm:"fixed"}, bottom:"0px", right:"0px", display: "flex",justifyContent: "center", alignItems: "center",}}>
            <Box
              component="img"
              src={DGPwomanlogo}
              alt="Welcome Logo"
              sx={{
                width: "100%",
                height:"100%",
                maxHeight:{xs:"260px",sm:"550px", md:"85vh"},
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>
      </Grid>
  );
}

export default Welcomepage;

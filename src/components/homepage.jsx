import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import uploadlogo from "../assets/uploadLogo.png";
import userImage from "../assets/userImage.jpg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNumber } from "../features/phonenumberSlice";

const Homepage = () => {
  const [userdata, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://mocki.io/v1/b8cfe862-cc23-4a6c-ac33-2a0bf16f7589"
        );
        const data = await res.json();
        setUserData(data.user);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f8f8f8",
        pt: {xs:11, sm:14},
        px: 2,
      }}
    >
      <Container maxWidth="sm" sx={{mb:"15vh"}}>
        <Stack spacing={3} alignItems="center">
          <Avatar
            variant="square"
            src={userImage}
            alt="user"
            sx={{ width: 180, height: 180, borderRadius:"15px" }}
          />

          <Button
            variant="contained"
            startIcon={<img src={uploadlogo} alt="upload" width={30} height={30} />}
            sx={{ bgcolor: "purple", textTransform: "none", width: 150, borderRadius: 2 }}
          >
            Upload
          </Button>

          <Box elevation={0} sx={{ p: 3, width: "100%", borderRadius: 3 , bgcolor:"rgb(226, 226, 226)"}}>
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
              <InfoRow label="Verification Type" value="AADHAR" />
              <InfoRow
                label="Aadhar Number"
                value={
                  userdata.aadhar?.length >= 4
                    ? `XXXXXXXX${userdata.aadhar.slice(-4)}`
                    : "Invalid Aadhar"
                }
              />
              <InfoRow label="Full Name" value={userdata.name || "No name"} />
              <InfoRow label="Email ID" value={editedEmail || "No email"} />
              <InfoRow label="Phone Number" value={userdata.phone || "No number"} />
              <InfoRow label="Address" value={userdata.address || "No Address"} />
            </Stack>
          </Box>

          <Box  sx={{ p: 2, width: "100%", borderRadius: 3 , bgcolor:"rgb(226, 226, 226)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle1">Email ID</Typography>
                {isEditing ? (
                  <TextField
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    size="small"
                    placeholder="Enter Email"
                  />
                ) : (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {userdata.email || "No Email"}
                  </Typography>
                )}
              </Box>
              <Box>
                {isEditing ? (
                  <>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setUserData({ ...userdata, email: editedEmail });
                        setIsEditing(false);
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton onClick={() => setIsEditing(false)}>
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    onClick={() => {
                      setEditedEmail(userdata.email || "");
                      setIsEditing(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              width: "100%",
              position: "fixed",
              bottom: 0,
              bgcolor: "white",
              p: 2,
              maxWidth: 500,
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="error"
              sx={{ fontSize: 16, borderRadius: 3, height: 50, 
                 "&:hover": {
                  backgroundColor: "red", 
                  borderColor: "darkred",
                  color:"white"
                },
              }}
              onClick={() => dispatch(setNumber(""))}
            >
              Delete Account
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

const InfoRow = ({ label, value }) => (
  <Box>
    <Typography variant="subtitle1" fontWeight="bold">
      {label}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {value}
    </Typography>
  </Box>
);

export default Homepage;

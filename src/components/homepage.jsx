import React, { useEffect, useState } from "react";
import style from "../csscomponent/homepage.module.css";
import profilelogo from "../assets/profilelogo.png";
import waitlogo from "../assets/waitlogo.png";
import uploadlogo from "../assets/uploadLogo.png";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNumber } from "../features/phonenumberSlice";
import userImage from "../assets/userImage.jpg"

import {
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";



function Homepage() {
  const [userdata, setUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState("");


  // Fetching the user data 
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
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <div className={style.usercomponent}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            margin: "30px 20px 10px 20px",
            padding: "10px 15px",
            backgroundColor: " rgb(238, 222, 197)",
            height: "auto",
            borderRadius: "10px",
            width: "auto",
          }}
        >
          <img
            src={waitlogo}
            alt="Wait"
            style={{
              top: "20px",
              height: "32px",
              width: "32px",
              marginRight: "7px",
            }}
          />
          <p>
            After updating the live photo in the facial recognition system, it
            will take 1 to 2 minutes to upload and verify the visitor's image.
            Please wait a moment
          </p>
        </div>



        <div className={style.userdata}>
          <img
            src={userImage}
            alt="userImage"
            style={{
              width: "180px",
              border: "2px solid  rgb(84, 80, 84)",
              margin: "10px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <button
            style={{
              height: "40px",
              padding: "5px",
              width: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              borderRadius: "10px",
              backgroundColor: "rgb(134, 72, 134)",
              border: "none",
            }}
          >
            {" "}
            <img
              src={uploadlogo}
              alt=""
              style={{
                height: "30px",
                width: "30px",
                marginRight: "2px",
              }}
            />{" "}
            Upload
          </button>

          <div className={style.userinformation}>
            <dl className={style.userDataList}>
              <dt>Verification Type</dt>
              <dd>AADHAR</dd>

              <dt>Aadhar Number</dt>
              <dd>
                {userdata.aadhar && userdata.aadhar.length >= 4
                  ? `XXXXXXXX${userdata.aadhar.slice(-4)}`
                  : "Invalid Aadhar"}
              </dd>

              <dt>Full Name</dt>
              <dd>{userdata.name ? userdata.name : "No name"}</dd>

              <dt>Phone Number</dt>
              <dd>{userdata.phone ? userdata.phone : "No mumber "}</dd>

              <dt>Email ID</dt>
              <dd>{userdata.email ? userdata.email : "No Email "}</dd>

              <dt>Address</dt>
              <dd>{userdata.address ? userdata.address : "No Address "}</dd>
            </dl>
          </div>



        <div className={style.editableEmail}>
          <div>
            <dt>Email ID</dt>
            {isEditing ? (
              <TextField
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                size="small"
                variant="outlined"
                placeholder="Enter Email"
              />
            ) : (
              <dd>{userdata.email ? userdata.email : "No Email"}</dd>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
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
          </div>
        </div>




          <button
            className={style.deleteAccBtn}
            onClick={() => {
              dispatch(setNumber(''));
            }}
          >
            Delete Account
          </button>
          
        </div>

      </div>

    </div>
  );
}

export default Homepage;

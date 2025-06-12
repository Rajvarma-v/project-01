import React, { useState } from "react";
import LogoComponent from "./logocomponent";
import style from "../csscomponent/PNV.module.css";
import phonelogo from "../assets/phonelogo.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { setNumber } from "../features/phonenumberSlice";
import { useNavigate } from "react-router-dom";

import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import LockIcon from "@mui/icons-material/Lock";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";


function PhoneNumberVerificationPage() {
  const [localNumber, setLocalNumber] = useState("");
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isValid = /^\d{10}$/.test(localNumber);

  const handleSendOtp = () => {
    if (!isValid) return;
    setSending(true);

    const fullPhoneNumber = "+91" + localNumber;
    dispatch(setNumber(fullPhoneNumber));

    setTimeout(() => {
      navigate("/otpVerification");
    }, 1000);
  };

  return (
    <>
      <div className={style.phoneverificationbody}>
        <div className={style.navbar}>
          <LogoComponent />
          <p>Fast safe and Aadhaar-verified</p>
        </div>

        <div className={style.maindiv}>
          <img className={style.phonelogo} src={phonelogo} alt="Phone Logo" />

          <div className={style.formcontainer}>
            <h4 className={style.heading}>Let's Verify Your Mobile Number</h4>
            <p className={style.subtext}>
              Enter your 10 Digit Mobile Number to begin with the registration process
            </p>

            <p className={style.label}>Mobile Number*</p>

            <PhoneInput
              country={"in"}
              onlyCountries={["in"]}
              disableDropdown
              countryCodeEditable={false}
              value={"91" + localNumber}
              onChange={(value, data) => {
                const dialCode = data.dialCode || "91";
                const localNum = value.startsWith(dialCode)
                  ? value.slice(dialCode.length)
                  : value;
                setLocalNumber(localNum);
              }}
              inputProps={{ required: true, name: "phone" }}
              containerStyle={{
                width: "100%",
                maxWidth: "330px",
                marginTop: "8px",
                borderRadius: "10px",
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

            <p className={style.counter}>{localNumber.length}/10</p>

            <p
              className={style.infoText}
              style={{ color: isValid ? "green" : "red" }}
            >
              {isValid
                ? "Mobile number is valid"
                : "Please enter your valid 10-digit mobile number"}
            </p>

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

            <button
              onClick={handleSendOtp}
              disabled={!isValid || sending}
              className={`${style.proceedButton} ${
                isValid ? style.enabled : style.disabled
              }`}
            >
              {sending ? "Sending..." : "Proceed"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PhoneNumberVerificationPage;

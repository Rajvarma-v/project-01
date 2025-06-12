import React, { useState } from "react";
import style from "../csscomponent/langselect.module.css";
import phonelogo from "../assets/phonelogo.png";
import { useDispatch } from "react-redux";
import { setLanguage } from "../features/languageSlice";
import LogoComponent from "./logocomponent";

function LangSelectCompo() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const languages = ["English", "हिन्दी", "मराठी"];
  

  const handleSubmit = () => {
    if (selectedLanguage) {
      dispatch(setLanguage(selectedLanguage));
      setSubmitted(true);
    } else {
      alert("Please select a language.");
    }
  };

  return (
    <div className={style.mainbody}>
    <div className={style.langselectbody}>
      <div className={style.navbar} >
      <LogoComponent/>
      <p>Fast safe and Aadhaar-verified</p>
     </div>
      <div className={style.maindiv}>
        <img className={style.phonelogo} src={phonelogo} alt="Phone Logo" />

        <div className={style.formcontainer}>
          <h4 className={style.heading}>Select Language</h4>
          <p className={style.label}>
            Choose your preferred language to continue with the registration
            process
          </p>
        </div>


        <div
          style={{
            width: "100%",
            maxWidth:"330px",
            // backgroundColor:"red",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            // padding:"10px"
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              style={{
                fontSize: "17px",
                padding: "10px",
                textAlign: "start",
                margin: "5px 0px",
                height: "50px",
                width: "100%",
                maxWidth: "330px",
                border: "1px solid purple",
                borderRadius: "10px",
                backgroundColor:
                selectedLanguage === lang ? "rgb(228, 203, 253)" : "white",
                fontWeight: selectedLanguage === lang ? "bold" : "normal",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {lang}
            </button>
          ))}
        </div>


 
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            fontSize: "17px",
            margin: "60px 0px 0px 5px",
            height: "50px",
            width: "100%",
            maxWidth: "330px",
            border: "1px solid yellow",
            borderRadius: "10px",
            backgroundColor: "purple",
            color: "white",
            cursor: "pointer",
          }}
        >
          Proceed
        </button>
      </div>
    </div>
    </div>
  );
}

export default LangSelectCompo;

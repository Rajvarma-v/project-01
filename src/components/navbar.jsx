import React from "react";
import { useState } from "react";
import LogoComponent from "./logocomponent";
import privacypolicy from "../assets/privacypolicylogo.png";
import profilelogo from "../assets/profilelogo.png";
import appointmentlogo from "../assets/appointmentlogo.png";
import upcominglogo from "../assets/upcominglogo.png";
import historylogo from "../assets/historylogo.png";
import logoutlogo from "../assets/logoutlogo.png";
import style from "../csscomponent/navbar.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../features/appointmentSlice";
import { setNumber } from "../features/phonenumberSlice";

function Navbar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div>

      <div className={style.navbar}>
          <LogoComponent />
          <select
            id="language"
            className={style.languageSelect}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">ENG</option>
            <option value="hi">HND</option>
            <option value="mr">MRT</option>
          </select>

          <button
            className={style.menuButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle sidebar menu"
          >
            ≡
          </button>
      </div>


      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 999,
            cursor: "pointer",
          }}
          aria-hidden="true"
        />
      )}


      <div className={`${style.sidebar} ${isOpen ? style.sidebarOpen : ""}`}>
        <div className={style.sidebarHeader}>
          <span>
            <b style={{ fontSize: "26px" }}>Menu</b>
          </span>
          <button onClick={() => setIsOpen(false)} aria-label="Close sidebar">
            ✖
          </button>
        </div>

        <ul className={style.menuList}>
          <li>
            <button
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
            >
              <img src={profilelogo} alt="Profile" />
              <span>My Profile</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate("/bookappointment");
                setIsOpen(false);
              }}
            >
              <img src={appointmentlogo} alt="Appointment" />
              <span>Book an Appointment</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch(setView("upcoming"));
                navigate("/appointment");
                setIsOpen(false);
              }}
            >
              <img src={upcominglogo} alt="upcomingLogo" />
              Upcoming
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch(setView("history"));
                navigate("/appointment");
                setIsOpen(false);
              }}
            >
              <img src={historylogo} alt="historyLogo" />
              History
            </button>
          </li>
          <li>
            <button>
              <img src={privacypolicy} alt="Privacy" />
              <span>Privacy Policy</span>
            </button>
          </li>
        </ul>

        <div className={style.sidebarFooter}>
          <p>
            Powered by <b>SECUTECH</b>
          </p>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button onClick={() => dispatch(setNumber(''))}>
              <img
                src={logoutlogo}
                alt="Logout Icon"
                className={style.logoutIcon}
              />
              Logout
            </button>

            <span>App Version - V1.0.6</span>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Navbar;

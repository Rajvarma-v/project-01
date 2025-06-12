import React from "react";
import DGPhandlogo from "../assets/DGPhandlogo.jpg";
import DGPwomanlogo from "../assets/DGPwomanlogo.png";

import style from "../csscomponent/welcomepage.module.css";

function Welcomepage() {
  return (
    <div className={style.welcomepagebody}>

      <div className={style.container}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img className={style.handlogo} src={DGPhandlogo} alt="Hand Logo" />
          <h1 className={style.appname}>
            Digi <span style={{ color: "purple" }}>Pravesh</span>
          </h1>
        </div>

        <h3 className={style.GOM}>Gove. of Maharashtra</h3>

        <p className={style.description}>
          Aadhar Verified Visitor Management System
        </p>

        <img
          className={style.welcomeimg}
          src={DGPwomanlogo}
          alt="Welcome Logo"
        />

        <div className={style.powered}>
          Power by <b>SECUTECH</b>
        </div>
      </div>

    </div>
  );
}

export default Welcomepage;

import React from "react";
import DGPhandlogo from "../assets/DGPhandlogo.jpg";

function LogoComponent() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1vw",
        maxWidth: "100%",
        padding: "0.5vh 2vw",
        boxSizing: "border-box",
        // backgroundColor:"blueviolet"
      }}
    >


      <div style={{ flexShrink: 0 }}>
        <img
          src={DGPhandlogo}
          alt="Hand Logo"
          style={{
            height: "clamp(40px, 4vw, 70px)",
            width: "clamp(40px, 4vw, 70px)",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>


      <div
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.1,
          maxWidth: "70vw",
          // backgroundColor:"blue"
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.8rem, 4.3vw, 2.4rem)",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          Digi <span style={{ color: "purple" }}>Pravesh</span>
        </h1>
        <h3
          style={{
            fontSize: "clamp(0.8rem, 2.5vw, 1.5rem)",
            margin: 0,
            color: "purple",
            whiteSpace: "nowrap",
          }}
        >
          Gov. of Maharashtra
        </h3>
      </div>
      
    </div>
  );
}

export default LogoComponent;

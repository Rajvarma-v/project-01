import React, { useState } from "react";
import style from "../csscomponent/appointment.module.css";
import appointmentlistlogo from "../assets/appointmentlistlogo.png";
import historydatalogo from "../assets/historydatalogo.png";
import filterLogo from "../assets/filterLogo.png";
import searchLogo from "../assets/searchLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "../features/appointmentSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const [showFilters, setShowFilters] = useState(false);
  const view = useSelector((state) => state.appointment.view);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFilters]);

  return (
    <div className={style.appointmentWrapper}>
      <div>

      
        <div className={style.searchFilterSection}>
          <div className={style.inputAndImgDiv}>
            <img src={searchLogo} alt="Search" />
            <input type="text" placeholder="Search your appointment" />
          </div>
          <button
            className={style.filterIcon}
            onClick={() => setShowFilters(true)}
          >
            <img src={filterLogo} alt="FilterLogo" />
          </button>
        </div>


   
        <div className={style.tabs}>
          <button
            className={style.tab}
            onClick={() => dispatch(setView("upcoming"))}
            style={{
              borderBottom: view === "upcoming" ? "3px solid purple" : "none",
              color: view === "upcoming" ? "purple" : "#919192",
            }}
          >
            Upcoming Appointments
          </button>
          <button
            className={style.tab}
            onClick={() => dispatch(setView("history"))}
            style={{
              borderBottom: view === "history" ? "3px solid purple" : "none",
              color: view === "history" ? "purple" : "#919192",
            }}
          >
            History
          </button>
        </div>


    
        {view === "upcoming" ? (
          <div className={style.noAppointments}>
            <p>No Upcoming Appointments!</p>
            <p>Looks like you don’t have any Upcoming appointments.</p>
            <img src={appointmentlistlogo} alt="No appointment" />
          </div>
        ) : (
          <div className={style.noAppointments}>
            <p>No Appointments History!</p>
            <p>Looks like you don’t have any past appointments.</p>
            <img src={historydatalogo} alt="No appointment" />
          </div>
        )}
      </div>


 
      <div className={style.bookBtn}>
        <button onClick={() => navigate("/bookappointment")}>
          Book New Appointment
        </button>
      </div>


   
      {showFilters && (
        <div className={style.filterPopup}>
          <div className={style.filterCard}>
            <h4>Filter Options</h4>
            <div className={style.statusSection}>
              <label>Select Status:</label>
              <div className={style.statusOptions}>
                <button>Completed</button>
                <button>Missed</button>
                <button>Cancelled</button>
                <button>Rejected</button>
              </div>
            </div>
            <div className={style.dateSection}>
              <label>Select Date:</label>
              <input type="date" />
              <input type="date" />
            </div>
            <div className={style.filterActions}>
              <button
                className={style.reset}
                onClick={() => setShowFilters(false)}
              >
                Reset Filters
              </button>
              <button className={style.apply}>Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;

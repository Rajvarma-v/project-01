import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Welcomepage from "./components/welcompage";
import LangSelectCompo from "./components/langselectcompo";
import Homepage from "./components/homepage";
import Navbar from "./components/navbar";
import Appointment from "./components/appointment";
import BookAppointment from "./components/bookAppointment.jsx";
import { useSelector, useDispatch } from "react-redux";
import PhoneNumberVerificationPage from "./components/phonenoverificationpage.jsx";
import OTPVerificationPage from "./components/otpVerification.jsx";
import AadharVerificationPage from "./components/aadharVerificationPage.jsx";


function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const dispatch = useDispatch();

  const language = useSelector((state) => state.language.selectLanguage);
  const phoneNumber = useSelector((state) => state.phoneNumber.phonenumber);
  const isLoggedIn = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [phoneNumber, dispatch]);

  if (showWelcome) return <Welcomepage />;
  if (!language) return <LangSelectCompo />;
  if (!phoneNumber) return <PhoneNumberVerificationPage />;
  if (!isLoggedIn) return <OTPVerificationPage />;
  if (!isLoggedIn) return <AadharVerificationPage />;


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/appointment" element={<Appointment language={language} />} />
        <Route path="/bookappointment" element={<BookAppointment />} />
        <Route path="/welcomepage" element={<Welcomepage />} />
        <Route path="/langSelectCompo" element={<LangSelectCompo />} />
        <Route path="/otpVerification" element={<OTPVerificationPage />} />
        <Route path="/phoneNumberVerificationPage" element={<PhoneNumberVerificationPage />} /> 
        <Route path="/aadharVerificationPage" element={<AadharVerificationPage />} />
      </Routes>
      {/* <OTPVerificationPage/> */}
      {/* <AadharVerificationPage/> */}
    </>
  );
}

export default App;

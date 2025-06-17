import React from 'react'
import LangSelectCompo from "../components/langselectcompo";
import Homepage from "../components/homepage";
import Navbar from "../components/navbar";
import Appointment from "../components/appointment";
import BookAppointment from "../components/bookAppointment";
import AadharVerificationPage from '../components/aadharVerificationPage';
import PhoneNumberVerificationPage from '../components/phonenoverificationpage';
import OTPVerificationPage from '../components/otpVerification';
import Welcomepage from '../components/welcompage';
import { Routes,Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import GetAppointmentData from '../components/GetAppointmentData';
import { useSelector } from 'react-redux';

function AppRoutes() {
    const phoneNumber = useSelector((state) => state.phoneNumber.phonenumber);
    const isLoggedIn = useSelector((state) => state.phoneNumber.loginState)

  return (
      <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={phoneNumber?<Homepage />:<PhoneNumberVerificationPage/>} />
                <Route path='/appointment' element={<Appointment />} />
                <Route path='/bookAppointment' element={<BookAppointment />} />
                <Route path='/getAppointmentData' element={<GetAppointmentData/>} />
            </Route>
           
            <Route element={<AuthLayout />}>
                <Route path='/phonenoverificationpage' element={<PhoneNumberVerificationPage />} />
                <Route path='/otpVerification' element={<OTPVerificationPage />} />
                <Route path='/aadharVerificationPage' element={<AadharVerificationPage />} />
            </Route>
      </Routes>
  )
}

export default AppRoutes

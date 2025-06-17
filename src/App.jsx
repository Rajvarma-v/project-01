import { useState, useEffect } from "react";
import "./App.css";
import Welcomepage from "./components/welcompage";
import { useSelector, useDispatch } from "react-redux";
import AppRoutes from "./Routes/AppRoutes";
import PhoneNumberVerificationPage from "./components/phonenoverificationpage";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const dispatch = useDispatch();

  const language = useSelector((state) => state.language.selectLanguage);
  const phoneNumber = useSelector((state) => state.phoneNumber.phonenumber);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [phoneNumber, dispatch]);

  if (showWelcome) return <Welcomepage />;
  if (!phoneNumber) return <PhoneNumberVerificationPage />;


  return (
    <>
      <AppRoutes/>
    </>
  );
}

export default App;

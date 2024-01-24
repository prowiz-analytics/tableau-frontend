import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { useState } from "react";
import Sidenav from "./Components/Sidenav";
import Dashboard from "./Pages/Dashboard";
// import { apiService } from "./Services/api_service";


export const API = "https://m3njvkrhfl.execute-api.us-east-1.amazonaws.com"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<Main />} />
          {/* <Route path="/tokens" element={<TokensPage/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const Main = () => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  // useEffect(() => {
  //   checkUser();
  // }, []);
  // const checkUser = async () => {
  //   const isLoggedIn = await apiService.isLoggedIn();
  //   console.log(isLoggedIn);
  //   if (!isLoggedIn) {
  //     navigate("/");
      
  //   }
  //   setIsUserLoggedIn(true)
  // };
  return (
    <>
      {isUserLoggedIn && 
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      }
    </>
  );
};

export default App;

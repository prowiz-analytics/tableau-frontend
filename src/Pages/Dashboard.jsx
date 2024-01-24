import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../App";
import axios from "axios";

function Dashboard() {
  const location = useLocation();
  const { data } = location.state;
  console.log(data);
  let token = null;
  const TABLEAU_HOST = "https://prod-ca-a.online.tableau.com";
  const TABLEAU_CONTENT_URL = "qadencebytqg";
  const dash = "";
  useEffect(() => {
    const parsedUrl = data.split('/').filter((_, i) => i !== 1).join('/')
    loadTableau(parsedUrl);
  }, []);
  const navigate = useNavigate();
  async function getToken() {
    if (token == null) {
      const res = await axios.get(`${API}/tableau/token`, {
        withCredentials: true,
      });
      if (res != null) {
        if (res.status === 200) {
          token = res.data.token;
          setTimeout(() => (token = null), 6e5);
        }
      }
    }
    return token;
  }
  async function loadTableau(dash) {
    const token = await getToken();
    console.log(token);
    if (token != null) {
      const tp = `
        <tableau-viz id="tableauViz" src=${TABLEAU_HOST}/t/${TABLEAU_CONTENT_URL}/views/${dash} 
          onFirstInteractive="onTabFirstInteractiveHandler"
            token=${token}
          height="90vh"
          width="3300px"
          toolbar="bottom">
        </tableau-viz>`;
      document.getElementById("tableau").innerHTML = tp;
    }
  }
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="h-[80px] w-full bg-[#03111B] flex flex-row justify-between items-center px-8">
        <p className="text-white  font-[600] text-xl cursor-pointer" onClick={()=>navigate('/home')}>Qadence by TQG</p>
        <p
          className="text-white cursor-pointer"
          onClick={() => {
            document.cookie =
              "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigate("/");
          }}
        >
          Logout
        </p>
      </div>
      <div id="tableau" className="w-[95vw] h-[90vh] bg-zinc-300"></div>
    </div>
  );
}

export default Dashboard;

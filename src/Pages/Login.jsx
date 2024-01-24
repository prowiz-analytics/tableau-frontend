import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "react-toastify/dist/ReactToastify.css";
// import { API } from "../App";
import { useGoogleLogin } from "@react-oauth/google";
import { apiService } from "../Services/apiService";
import { API } from "../App";

function Login() {
  const [token,setToken]=useState("");
  const [creds,setCreds] = useState({
    user:"",
    pwd:""
  })
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => registerGoogleSignin(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  async function registerGoogleSignin(payload) {
    console.log(payload.access_token)
    setToken(payload.access_token)
    let header = {}
    if (payload.access_token.length > 0 ) {
      header['Authorization'] = `Bearer ${payload.access_token}`; 
    }
    const res = await axios.post(
      `${API}/auth/`,
      {
        user: '',
        pwd: '',
      },
      {headers:header},
      {
        withCredentials: true,
      }
    );
    console.log(res);
    if (res.status === 200) {
      navigate("/home");
      successNotify("Logged In Sucecssfully");
      setLoading(false);
    }
    // login(payload.access_token);
  }
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const notify = (data) => toast.error(data);
  const successNotify = (data) => toast.success(data);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      let header = {}
        if (typeof(token) == 'string' && token.length > 0 ) {
            header['Authorization'] = `Bearer ${token}`; 
        }
      const request = await axios.post(
        `${API}/auth/`,
        {
          user: data.email,
          pwd: data.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(request.data);
      if (request.status === 200) {
        navigate("/home");
        successNotify("Logged In Sucecssfully");
        setLoading(false);
      }
    } catch (err) {
      console.log(err.response.data.error);
      notify(err.response.data.error);
      setLoading(false);
    }
    // console.log(request);
  };
  return (
    <div className="h-[100vh] flex flex-row w-[100vw]">
      {loading && (
        <Spin
          className="spinning_indicator"
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 24,
              }}
              spin
            />
          }
        />
      )}
      <div className="basis-[50%] bg-[#03111B] flex flex-row w-full h-full justify-center items-center">
        <h2 className="text-white text-4xl">Qadence by TQG</h2>
      </div>
      <div className="flex flex-row h-full w-full justify-center items-center ">
        <div className="rounded-[10px] bg-[#ffffff] h-[55vh] w-[30vw] flex flex-col px-4 py-4">
          <p className="text-3xl">Login</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full justify-around"
          >
            <div className="flex flex-col">
              <label htmlFor="">Email Address</label>
              <input
                placeholder="john@mail.com"
                {...register("email", { required: true })}
                className={`${
                  errors.email
                    ? "error_outline"
                    : "no_outline border-2 border-black"
                } p-3 rounded-md border-2 border-black`}
              />
              {errors.email && (
                <span className="text-[#DD0F0F]">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Password</label>
              <input
                type={isPassVisible ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true })}
                className={`${
                  errors.password
                    ? "error_outline"
                    : "no_outline border-2 border-black"
                } p-3 rounded-md border-2 border-black`}
              />
              {errors.password && (
                <span className="text-[#DD0F0F]">This field is required</span>
              )}
            </div>

            <input
              type="submit"
              value="Login with Tableau ID"
              className="w-[100%] items-center p-4 bg-[#007AD3] text-[#ffffff] font-bold rounded-md cursor-pointer border-2 border-[#007AD3]"
            />
            <div className="w-full h-10 flex flex-row justify-center items-center">
              <div className="basis-[33%] h-[1px] bg-[#03111B66]"></div>
              <div className="basis-[33%] flex flex-row justify-center items-center">
                Or
              </div>
              <div className="basis-[33%] h-[1px] bg-[#03111B66]"></div>
            </div>
            <input
              type="button"
              onClick={googleLogin}
              value="Login with Google ID"
              className="w-[100%] items-center p-4 bg-[#ffffff] border-2 border-[#007AD3] text-[#007AD3] font-bold rounded-md cursor-pointer"
            />
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" closeOnClick autoClose={false} />
    </div>
  );
}

export default Login;

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input, Skeleton } from "antd";
import { API } from "../App";
import { allWorkBooks } from "../Mock/workbooks";
import { allViews } from "../Mock/view";
const { Search } = Input;

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`arrow ${className}`}>
      <AiOutlineArrowLeft class="arrows" style={{ color: "white" }} />
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`arrow ${className}`}>
      <AiOutlineArrowRight class="arrows" style={{ color: "white" }} />
    </div>
  );
};

function Home() {
  const [loading,setLoading]=useState(false);
  const [views, setViews] = useState();
  const [workbooks, setWorkBooks] = useState();
  const slideRef = useRef();
  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const fetchViews = async(id) => {
    // const getViewForWorkbook = await axios.get(`${API}/tableau/views/${id}`, {
    //   withCredentials: true,
    // });
    const filteredData = allViews.data.views.filter((item)=>item.id===id)
    console.log(filteredData)
    setViews(filteredData)
  }

  useEffect(() => {
    fetchAllData();
  }, []);
  const fetchAllData = async () => {
    setLoading(true);
    // const allViews = await axios.get(`${API}/tableau/views`, {
    //   withCredentials: true,
    // });
    // const allWorkbooks = await axios.get(`${API}/tableau/workbooks`, {
    //   withCredentials: true,
    // });

    setWorkBooks(allWorkBooks.data.workbooks)
    setViews(allViews.data.views);
    setLoading(false)
  };
  return (
    <div className="w-[100%] h-[100vh] flex-col ">
      <div className="h-[80px] bg-[#03111B] flex flex-row justify-start items-center ">
        <p className="text-white ml-8 font-[600] text-xl">Qadence by TQG</p>
      </div>
      <div className="flex flex-col gap-4 mt-8 ml-8 w-[90%]">
        <h2 className="ml-[37px] text-xl">Workbooks</h2>
        <div className="w-[100%]">
          
          <Slider {...sliderSettings} ref={slideRef}>
            {/* {loading && [1,2,3,4].map((item)=>{
              return (
                <Skeleton loading={loading} paragraph={{
                  rows: 4,
                }}>
                <div
                  className="bg-black h-[20vh] cursor-pointer rounded-md text-white flex flex-row justify-center items-center "
                  key={item}
                >
                  <p>{item}</p>
                </div>
                </Skeleton>
              );
            })} */}
            {workbooks?.map((item, index) => {
              return (
                <div
                  className="bg-black h-[20vh] cursor-pointer rounded-md text-white workbooks"
                  key={item}
                  onClick={()=>fetchViews(item.id)}
                >
                  <p className="text-center">{item.name}</p>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="w-[80%]">
          <h2 className="ml-[37px] text-xl">Views</h2>
          {/* <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            loading
          /> */}
          <div className="flex flex-col ml-[37px] gap-8">
            {views?.map((item) => {
              return (
                <div className="flex flex-col w-full  gap-4 mt-4">
                  <Link to={item.url} target="_blank">
                    <h2>View {item.name}</h2>
                  </Link>
                  <div className="w-[80%] h-[3px] bg-[#03111B33] "></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

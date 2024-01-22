// import React, { useEffect, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";

// function Sidenav({ children }) {
//   const location = useLocation();
//   const [sideMenu, setSideMenu] = useState([
//     {
//       path: "/home",
//       name: "Workbooks",
      
//     },
//     {
//       path: "/camera-view",
//       name: "Views",
//     },
//   ]);
//   return (
//     <div className="w-[17vw] h-[100vh] bg-[#03111B] flex flex-col justify-start items-center border-r-[1px] border-[#2F3339]">
//         <p className="text-white text-2xl mt-8 font-[300]">Qadence by TQG</p>
//       <div className="flex flex-col gap-4 mt-12 w-[100%] px-3 font-sans ">
//         {sideMenu.map((item, index) => {
//           return (
//             <>
//               <NavLink
//                 to={item.path}
//                 key={index}
//                 className={`flex flex-row justify-start gap-2  items-center px-4 py-3 w-[100%] text-white rounded-[50px] ${/^\/event-logs\/([^\/]+)/.test(location.pathname)?'not-active':/^\/camera-view\/([^\/]+)/.test(location.pathname)?'not-active':''}`}
//                 activeclassName="not-active"
//               >
//                 <div className="">{item.icon}</div>
//                 <div className="text-lg">{item.name}</div>
//               </NavLink>
//               {item.submenu && (
//                 <div className="pl-8">
//                   {item.submenu.map((subItem, subIndex) => (
//                     // <NavLink
//                     //   to={'#'}
//                     //   key={subIndex}
//                     //   className="flex flex-row justify-start gap-2 items-center px-4 py-3 w-[100%] text-white rounded-[50px] ml-2 "
//                     //   activeClassName="active"
//                     // >
//                       <div className="flex flex-row justify-start gap-2 items-center px-4 py-3 w-[100%] text-white rounded-[50px] ml-2 active cursor-pointer">{subItem.name}</div>
//                     // </NavLink>
//                   ))}
//                 </div>
//               )}
//             </>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Sidenav;

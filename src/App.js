import { useState } from "react";
// import './App.css';
import "./Global.css";
import Header from "./Components/Header";
import Title from "./Components/Title";
import Sidebar from "./Components/Sidebar";
import Chart from "./Components/Chart";

import { ResponsiveLine } from "@nivo/line";
import DataChart from "./Components/Chart/data.json";

function App() {
  return (
    <>
      <div className="overflow-hidden h-screen">
        <Header />
        <Title />
        <div className="m-0 p-0 grid grid-cols-10 grid-rows-7 ">
          <div className="m-0 p-0 col-span-2 row-span-5 overflow-y-auto">
            <Sidebar />
          </div>
          <div className="m-0 p-0 col-span-8 row-span-5 col-start-3 overflow-y-auto">
            <Chart />
          </div>
        </div>
      </div>

      {/* <Header />
      <Title />
      <Sidebar />
      <Chart /> */}
    </>
  );
}

export default App;

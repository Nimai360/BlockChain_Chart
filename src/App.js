import React, { useState } from "react";
import "./Global.css";
import Header from "./Components/Header";
import Title from "./Components/Title";
import Sidebar from "./Components/Sidebar";
import Chart from "./Components/Chart";

function App() {
  const [graphicDatas, setGraphicDatas] = useState([]);

  const handleDataChange = (datas) => {
    setGraphicDatas(datas);
  };

  return (
    <>
      <div className="overflow-hidden h-screen">
        <Header />
        <Title />
        <div className="m-0 p-0 grid grid-cols-10 grid-rows-7 ">
          <div className="m-0 p-0 col-span-2 row-span-5 overflow-y-auto">
            <Sidebar onChangeDatas={handleDataChange} />
          </div>
          <div className="m-0 p-0 col-span-8 row-span-5 col-start-3 overflow-y-auto">
            <Chart graphicDatas={graphicDatas} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import React, { useState } from "react";
import "./Global.css";
import Header from "./Components/Header";
import Title from "./Components/Title";
import Sidebar from "./Components/Sidebar";
import Chart from "./Components/Chart";

function App() {
  const [graphicDatas, setGraphicDatas] = useState([]);
  const [titlePage, setTitlePage] = useState('title');
  const [descriptionPage, setDescriptionPage] = useState('You can identify your most engaged users by using cohorts.');

  const handleDataChange = (datas: any) => {
    setGraphicDatas(datas);
  };

  const handleTitleChange = (title: string) => {
    setTitlePage(title);
  };

  const handleSubtitleChange = (description: string) => {
    setDescriptionPage(description);
  };

  return (
    <>
      <div className="overflow-x-hidden h-screen">
        <Header />
        <Title onTitleChange={handleTitleChange} onSubtitleChange={handleSubtitleChange} />
        <div className="m-0 p-0 grid grid-cols-10 grid-rows-7 ">
          <div className="m-0 p-0 col-span-2 row-span-5 overflow-y-auto">
            <Sidebar onChangeDatas={handleDataChange} />
          </div>
          <div className="m-0 p-0 col-span-8 row-span-5 col-start-3 overflow-y-auto">
            <Chart graphicDatas={graphicDatas} titleChart={titlePage} descriptionChart={descriptionPage} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

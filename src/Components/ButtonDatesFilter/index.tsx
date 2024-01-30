import React, { useState, useEffect, useRef } from "react";
import { ButtonGroup, Button } from "@material-tailwind/react";

interface ButtonProps {
  onButtonClick: (number: number) => void;
 }

const ButtonDatesFilter: React.FC<ButtonProps> = ({onButtonClick}) => {

  const handleButtonClick = (number: number) => {
    onButtonClick(number);
   };
   
  return (
    <>
      <ButtonGroup
        placeholder=""
        className="m-0 p-0 font-inter leading-[18px] text-neutral_800 font-semibold justify-start bg-transparent"
        variant="outlined"
        color="black"
      >
        <Button
          placeholder=""
          className="m-0 p-[16px] rounded-s-md-[6px] text-neutral_800 focus:ring-0 text-[12px] border-solid border-neutral_300"
          >
          Custom
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] border-solid text-neutral_800 hover:text-neutral_800 focus:ring-0 text-[12px] border-neutral_300"
          onClick={() => handleButtonClick(1)}
        >
          Today
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300"
          onClick={() => handleButtonClick(1)}
        >
          Yesterday
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300"
          onClick={() => handleButtonClick(7)}
        >
          7D
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300"
          onClick={() => handleButtonClick(30)}
        >
          30D
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300"
          onClick={() => handleButtonClick(3*30)}
        >
          3M
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300"
          onClick={() => handleButtonClick(6*30)}
        >
          6M
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] rounded-es-md-[6px] text-neutral_800 focus:ring-0 text-[12px] border-solid border-neutral_300"
          onClick={() => handleButtonClick(12*30)}
        >
          12M
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ButtonDatesFilter;

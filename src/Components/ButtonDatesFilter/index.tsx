import React, { useState, useEffect, useRef } from "react";
import { ButtonGroup, Button } from "@material-tailwind/react";

interface AccordionProps {}

const ButtonDatesFilter: React.FC<AccordionProps> = ({}) => {
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
        >
          Today
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300"
        >
          Yesterday
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300"
        >
          7D
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300"
        >
          30D
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300"
        >
          3M
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300"
        >
          6M
        </Button>
        <Button
          placeholder=""
          className="m-0 p-[16px] rounded-es-md-[6px] text-neutral_800 focus:ring-0 text-[12px] border-solid border-neutral_300"
        >
          12M
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ButtonDatesFilter;

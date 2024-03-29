import React, { useState } from "react";
import SearchIcon from "../../assets/icon/search-01.svg";

import {
  List,
  ListItem,
  ListItemPrefix,
  AccordionBody,
} from "@material-tailwind/react";

interface Metric_OptionsProps {
  allMetrics: any[];
  onOptionChange: (item: any) => void;
}

const Metric_Options: React.FC<Metric_OptionsProps> = ({
  allMetrics,
  onOptionChange,
}) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleChange = (event: React.MouseEvent, item: any) => {
    onOptionChange(item);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  return (
    <>
      <AccordionBody className="m-0 w-full bg-white_color rounded-md border border-solid border-neutral_300">
        <List
          placeholder=""
          className="min-w-[40px] m-0 px-[10px] w-full gap-y-[10px]  text-neutral_900 font-inter font-normal"
        >
          <ListItem placeholder="" className="p-0">
            <div className="flex h-[39px] w-full rounded-[6px] justify-around bg-neutral_100 border-solid border-[1px] border-neutral_400 text-[12px] items-center">
              <input
                type="text"
                placeholder="Search..."
                className="p-0 text-[12px] bg-transparent font-inter focus:ring-0  text-neutral_600"
                value={searchText}
                onChange={handleInputChange}
              />
              <div className="right-[16px] min-w-[24px] p-0">
                <img src={SearchIcon} alt="search icon" className="size-[24px] text-neutral_600" />
              </div>
            </div>
          </ListItem>
          <div className="p-0 m-0 inline-grid gap-y-[6px]">
            <ListItem
              placeholder=""
              disabled
              className="my-0 p-0 font-inter text-[12px]"
            >
              Show all events{" "}
            </ListItem>
            <div className="p-0 m-0">
              {!allMetrics.some((item) =>
                item.metric_description
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              ) ? (
                <p className="text-center my-0 p-0 font-inter text-[16px] text-neutral_600">Event not found</p>
              ) : (
                allMetrics
                  // .filter((item) =>
                  //   item.metric_description
                  //     .toLowerCase()
                  //     .includes(searchText.toLowerCase())
                  // )
                  .map((item, index) => {
                    if (
                      item.metric_description
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                      return (
                        <ListItem
                          placeholder=""
                          key={index}
                          className={`m-0 mb-[1px] gap-[10px] py-[10px] px-[4px] font-inter font-medium text-[12px] hover:bg-primary_100 leading-[18px] 
                ${
                  item.checked
                    ? "bg-primary_500_brand text-white_color"
                    : "text-neutral_800"
                }`}
                          onClick={(event) => handleChange(event, item)}
                        >
                          <ListItemPrefix placeholder="" className="p-0 m-0">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              className=" size-[16px]"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="cursor-05">
                                <path
                                  id="Vector"
                                  stroke="currentColor"
                                  fill="transparent"
                                  d="M3.74628 8.29099L2.89418 9.14308M2.80514 6.01845H1.6001M2.89418 2.89438L3.74628 3.74647M6.01881 1.6V2.80504M9.14289 2.89438L8.29079 3.74647M10.6785 10.6636L13.7467 9.5926C14.3218 9.39184 14.3441 8.58653 13.7807 8.36295L6.76101 5.91836C6.23333 5.70894 5.70272 6.22658 5.89887 6.75942L8.19744 13.9746C8.40675 14.5432 9.21166 14.5414 9.4271 13.9718L10.6785 10.6636Z"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                            </svg>
                          </ListItemPrefix>
                          {item.metric_description}
                        </ListItem>
                      );
                  })
              )}
            </div>
          </div>
        </List>
      </AccordionBody>
    </>
  );
};

export default Metric_Options;

import React, { Children, useState } from "react";
import SearchIcon from "../../assets/icon/search-01.svg";

import {
  Typography,
  ListItem,
  Accordion,
  AccordionHeader,
} from "@material-tailwind/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";

interface Accordion_TitleProps {
  title: string;
  children: React.ReactNode;
}

const Accordion_Title: React.FC<Accordion_TitleProps> = ({
  title,
  children,
}) => {
  const [open, setOpen] = useState<number>(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
      <Accordion
        placeholder=""
        open={open === 1}
        icon={
          <div className="mx-auto h-4 w-4 transition-transform">
            {open === 1 ? (
              <ChevronDownIcon strokeWidth={2.5} className="rotate-180" />
            ) : (
              <PlusIcon strokeWidth={2.5} />
            )}
          </div>
        }
      >
        <ListItem placeholder="" className="p-0" selected={open === 1}>
          <AccordionHeader
            placeholder=""
            onClick={() => handleOpen(1)}
            className="border-b-0 p-[10px]"
          >
            <Typography
              placeholder=""
              color="blue-gray"
              className="mr-0 font-normal"
            >
              {title}
            </Typography>
          </AccordionHeader>
        </ListItem>
        {children}
      </Accordion>
    </>
  );
};

export default Accordion_Title;

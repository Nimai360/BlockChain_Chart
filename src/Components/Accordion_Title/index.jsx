import React, { Children, useState } from "react";
import SearchIcon from "../../assets/icon/search-01.svg";

import {
    Typography,
    ListItem,
    Accordion,
    AccordionHeader,
} from "@material-tailwind/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function Accordion_Title({ title, children }) {
    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <>
            <Accordion
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
                <ListItem className="p-0" selected={open === 1}>
                    <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-[10px]">
                        <Typography color="blue-gray" className="mr-0 font-normal">
                            {title}
                        </Typography>
                    </AccordionHeader>
                </ListItem>
                {children}
            </Accordion>
        </>
    )
}
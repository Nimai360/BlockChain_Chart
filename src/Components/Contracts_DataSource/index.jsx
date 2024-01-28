import React, { useState } from "react";
import { Avatar } from "@material-tailwind/react";
import DataSourcePic3 from "../../assets/img/datasource3.png";

import {
    List,
    ListItem,
    AccordionBody,
} from "@material-tailwind/react";

export default function Contracts_DataSource({ contracts, contract_type_Contracts, onCheckboxChange }) {
    const [checkedState, setCheckedState] = useState({});

    const handleChange = (event, item, checked) => {
        setCheckedState({
            ...checkedState,
            [event.target.value]: event.target.checked,
        });

        onCheckboxChange(item, checked);
    };

    return (
        <>
            <AccordionBody className="py-1 bg-white_color rounded-md border border-solid border-neutral_300">
                <List className="min-w-[40px] w-full gap-y-2 py-[10px] text-neutral_900 font-inter font-normal">
                    {contracts['data'].map(({ name, contract_type, thumbnail }, index, item) => (
                        contract_type_Contracts.includes(contract_type) ?
                            <ListItem className="rounded-none m-0 p-0">
                                <div className="items-center flex text-xs gap-x-[8px]">
                                    <input
                                        type="checkbox"
                                        value={index}
                                        checked={checkedState[index]}
                                        onChange={(event) => handleChange(event, item[index], !checkedState[index])}
                                        className="rounded-[4px] border-solid border-gray-300 text-blue-500 focus:ring-0 size-[16px]"
                                    />
                                    <Avatar src={thumbnail || DataSourcePic3} alt="avatar" size="xs" className='' />
                                    <span>{name}</span>
                                </div>
                            </ListItem> : null
                    ))}
                    <hr className="border-1/2 border-solid border-neutral_300" />

                </List>
                <ListItem className="rounded-none h-[24px] m-0 p-0 justify-center text-neutral_700">
                    <div className="flex text-xs">
                        <span className="">Add new datasource</span>
                    </div>
                </ListItem>
            </AccordionBody>
        </>
    )
}
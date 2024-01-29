import React, { useState } from "react";
import { Avatar } from "@material-tailwind/react";
import DataSourcePic3 from "../../assets/img/datasource3.png";
import Contract_datasources from '../../assets/data/contract_datasources.json';

import { List, ListItem, AccordionBody } from "@material-tailwind/react";

interface Contracts_DataSourceProps {
  // contracts: { data: Contract[] };
  contract_type_Contracts: string[];
  onCheckboxChange: (item: any, checked: boolean) => void;
}

interface Contract {
  id: string;
  name: string;
  chain_name: string;
  contract_type: string;
  metric_id: string;
  metric: string;
  metric_display_name: string;
  operations_id: string;
  operations: any[];
  checked: boolean;
  thumbnail: string | null;
 }

const Contracts_DataSource: React.FC<Contracts_DataSourceProps> = ({
  // contracts,
  contract_type_Contracts,
  onCheckboxChange,
}) => {
  const [checkedState, setCheckedState] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: any,
    checked: boolean
  ) => {
    setCheckedState({
      ...checkedState,
      [event.target.value]: event.target.checked,
    });

    onCheckboxChange(item, checked);
  };

  return (
    <>
      <AccordionBody className="py-1 bg-white_color rounded-md border border-solid border-neutral_300">
        <List
          placeholder=""
          className="min-w-[40px] w-full gap-y-2 py-[10px] text-neutral_900 font-inter font-normal"
        >
          {Contract_datasources["data"].map(
            ({ name, contract_type, thumbnail }, index, item) =>
              contract_type_Contracts.includes(contract_type) ? (
                <ListItem placeholder="" className="rounded-none m-0 p-0">
                  <div className="items-center flex text-xs gap-x-[8px]">
                    <input
                      type="checkbox"
                      value={index}
                      checked={checkedState[index]}
                      onChange={(event) =>
                        handleChange(event, item[index], !checkedState[index])
                      }
                      className="rounded-[4px] border-solid border-gray-300 text-blue-500 focus:ring-0 size-[16px]"
                    />
                    <Avatar
                      placeholder=""
                      src={thumbnail || DataSourcePic3}
                      alt="avatar"
                      size="xs"
                      className=""
                    />
                    <span>{name}</span>
                  </div>
                </ListItem>
              ) : null
          )}
          <hr className="border-1/2 border-solid border-neutral_300" />
        </List>
        <ListItem
          placeholder=""
          className="rounded-none h-[24px] m-0 p-0 justify-center text-neutral_700"
        >
          <div className="flex text-xs">
            <span className="">Add new datasource</span>
          </div>
        </ListItem>
      </AccordionBody>
    </>
  );
};

export default Contracts_DataSource;

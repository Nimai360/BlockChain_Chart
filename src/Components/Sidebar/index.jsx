import React, { useState, useEffect } from "react";
import Contract_datasources from '../../assets/data/contract_datasources.json';

import Accordion_Title from "../Accordion_Title";
import Metric_Options from "../Metric_Options";
import Metric_Card from "../Metric_Card";
import Contracts_DataSource from "../Contracts_DataSource";
import Contracts_DataSource from "../Contracts_DataSource";

import {
    Card,
    List,
    ListItem,
    AccordionBody,
} from "@material-tailwind/react";

const contract_type_Contracts = ['ERC20', '1212'];

export default function Sidebar() {
    const [allMetrics, setAllMetrics] = useState([]);

    useEffect(() => {

    }, [allMetrics]);

    const handleContractChange = (contract, checked) => {
        const metric = {
            'id': contract['contract_id'],
            'name': contract['name'],
            'chain_name': contract['chain_name'],
            'checked': false,
        }

        if (checked) {
            setAllMetrics(prevMetrics => [...prevMetrics, metric]);
        } else {
            setAllMetrics(prevMetrics => {
                const index = prevMetrics.findIndex(item => (item.name === metric.name) && (item.chain_name === metric.chain_name));
                if (index !== -1) {
                    const newMetrics = [...prevMetrics];
                    newMetrics.splice(index, 1);
                    return newMetrics;
                }
                return prevMetrics;
            });
        }
    };

    const handleMetricChange = (item) => {
        setAllMetrics(prevMetrics => {
            const index = prevMetrics.findIndex(metric => metric.name === item.name && metric.chain_name === item.chain_name);
            if (index !== -1) {
                const newMetrics = [...prevMetrics];
                newMetrics[index] = { ...newMetrics[index], checked: !newMetrics[index].checked };
                return newMetrics;
            }
            return prevMetrics;
        });
    };

    const handleCardChange = (item) => {
        setAllMetrics(prevMetrics => {
            const index = prevMetrics.findIndex(metric => metric.name === item.name && metric.chain_name === item.chain_name);
            if (index !== -1) {
                const newMetrics = [...prevMetrics];
                newMetrics[index] = { ...newMetrics[index], checked: !newMetrics[index].checked };
                return newMetrics;
            }
            return prevMetrics;
        });
    };

    return (
        <>
            <Card className=" m-0 p-0 h-[calc(100vh-123px)] w-full shadow-none bg-neutral_100 rounded-none border-t-0 border-l-0 border-b-0 border-r-2 border-solid border-r-neutral_300">
                <List className="m-0 px-[18px] py-4">

                    <Accordion_Title title="Data Source">
                        <Contracts_DataSource contracts={Contract_datasources} contract_type_Contracts={contract_type_Contracts} onCheckboxChange={handleContractChange} />
                    </Accordion_Title>

                    <Accordion_Title title="Metrics">
                        <Metric_Options allMetrics={allMetrics} onOptionChange={handleMetricChange} />
                    </Accordion_Title>

                    <div className="flex flex-col gap-[10px]">
                        {allMetrics.filter(metric => metric.checked).map((item) => (
                            <Metric_Card item={item} onOptionChange={handleCardChange} />
                        ))}
                    </div>

                    <Accordion_Title title="Filter">
                        <AccordionBody className="py-1 bg-white_color rounded-md border border-solid border-neutral_300">
                            <ListItem className="rounded-none h-[24px] m-0 p-0 justify-center text-neutral_700">
                                <div className="flex text-xs">
                                    <span className="">Add new</span>
                                </div>
                            </ListItem>
                        </AccordionBody>
                    </Accordion_Title>

                    <Accordion_Title title="Breakdown">
                        <AccordionBody className="py-1 bg-white_color rounded-md border border-solid border-neutral_300">
                            <ListItem className="rounded-none h-[24px] m-0 p-0 justify-center text-neutral_700">
                                <div className="flex text-xs">
                                    <span className="">Add new</span>
                                </div>
                            </ListItem>
                        </AccordionBody>
                    </Accordion_Title>
                </List>
            </Card>
        </>
    );
}
import React, { useState, useEffect, useRef } from "react";
import Contract_datasources from '../../assets/data/contract_datasources.json';
import Charts_data from '../../assets/data/charts_data.json';
import ERC20_metrics from '../../assets/data/ERC20_metrics.json';

import Accordion_Title from "../Accordion_Title";
import Metric_Options from "../Metric_Options";
import Metric_Card from "../Metric_Card";
import Contracts_DataSource from "../Contracts_DataSource";

import {
    Card,
    List,
    ListItem,
    AccordionBody,
} from "@material-tailwind/react";

const contract_type_Contracts = ['ERC20'];

export default function Sidebar({ onChangeDatas }) {
    const [allContracts, setAllContracts] = useState([]);
    const [allMetricsOptions, setAllMetricsOptions] = useState([]);

    useEffect(() => {
        updateMetrics(allContracts)
    }, [allContracts]);

    useEffect(() => {
        onChangeDatas(allContracts)
    }, [allMetricsOptions]);


    function updateMetrics(allContracts) {
        let matchingChartDataIds = Charts_data.map(metric => {
            const contract = metric.data.metadata['A: Transfer ERC-20'];
            const foundItem = allContracts.find(item => item.id === contract['contract_id']);

            if (foundItem) {
                foundItem.metric_id = contract['metric_id'];
                return foundItem;
            }

            return null;
        }).filter(Boolean);

        matchingChartDataIds = matchingChartDataIds.map(chartDataId => {
            const matchingMetric = ERC20_metrics[0].data.data.find(metric => metric.id === chartDataId.metric_id);
            if (matchingMetric) {
                chartDataId.metric_display_name = matchingMetric.metric_display_name;
                chartDataId.operations = matchingMetric.operations;
                chartDataId.operations_id = matchingMetric.operations.id;
            }
            return chartDataId;
        });

        expandContractsToMetrics(matchingChartDataIds);
    }

    function expandContractsToMetrics(matchingChartDataIds) {
        matchingChartDataIds.map(item =>
            item.operations.map(operation => {
                const metric = {
                    'id': item.id,
                    'name': item.name,
                    'chain_name': item.chain_name,
                    'contract_type': item.contract_type,
                    'metric_id': item.metric_id,
                    'metric_display_name': item.metric_display_name,
                    'operations_id': operation.id,
                    'operations': operation,
                    'checked': item.checked,
                    'metric_description': `${operation.operation_description} for ${item.name} (${item.contract_type}) on ${item.chain_name}`,
                }
                setAllMetricsOptions(prevMetrics => [...prevMetrics, metric]);
            }
            ));
    }

    const handleContractChange = (contract, checked) => {
        const metric = {
            'id': contract['id'],
            'name': contract['name'],
            'chain_name': contract['chain_name'],
            'contract_type': 'ERC20',
            'metric_id': '',
            'metric_display_name': '',
            'operations_id': '',
            'operations': [],
            'checked': false,
        }

        if (checked) {
            setAllContracts(prevMetrics => [...prevMetrics, metric]);
        } else {
            setAllContracts(prevMetrics => {
                const index = prevMetrics.findIndex(item => (item.name === metric.name) && (item.chain_name === metric.chain_name));
                if (index !== -1) {
                    const newMetrics = [...prevMetrics];
                    newMetrics.splice(index, 1);
                    return newMetrics;
                }
                return prevMetrics;
            });

            setAllMetricsOptions(prevMetrics => prevMetrics.filter(item => !(item.name == contract.name) && (item.chain_name == contract.chain_name)));
        }
    };

    const handleMetricChange = (item) => {
        setAllMetricsOptions(prevMetrics => {
            const index = prevMetrics.findIndex(metric => metric.operations_id === item.operations_id);
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
                        <Metric_Options allMetrics={allMetricsOptions} onOptionChange={handleMetricChange} />
                    </Accordion_Title>

                    <div className="flex flex-col gap-[10px]">
                        {allMetricsOptions.filter(metric => metric.checked).map((item) => (
                            <Metric_Card item={item} onOptionChange={handleMetricChange} />
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
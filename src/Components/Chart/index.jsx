import React, { useState, useEffect, useRef } from "react";

import { ButtonGroup, Button } from "@material-tailwind/react";
import { ResponsiveLine } from '@nivo/line'
import Charts_data from '../../assets/data/charts_data.json';

import DataChart from './data.json';

const blank_model_chart = [{
    "id": "",
    "color": "hsl(0, 00%, 00%)",
    "data": [
        {
            "x": "",
            "y": ""
        }
    ]
}]

export default function Chart({ graphicDatas, titleChart, descriptionChart }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const [convertedGraphicDatas, setConvertedGraphicDatas] = useState(blank_model_chart);

    useEffect(() => {
        if (!graphicDatas || !graphicDatas.length) {
            return;
        }

        const charts_data = findGraphicDatasInCharts_data(graphicDatas)
        const transformedData = transformData(charts_data);
        const filteredData = filterByDate(transformedData, '12M');
        setConvertedGraphicDatas(filteredData);
    }, [graphicDatas]);

    function findGraphicDatasInCharts_data(graphicDatas) {
        return Charts_data.filter(chartItem =>
            graphicDatas.some(graphicsItem =>
                chartItem.data.metadata["A: Transfer ERC-20"].metric_id === graphicsItem.metric_id &&
                chartItem.data.metadata["A: Transfer ERC-20"].operation === graphicsItem.operations.operation &&
                chartItem.data.metadata["A: Transfer ERC-20"].contract_id === graphicsItem.id &&
                chartItem.data.metadata["A: Transfer ERC-20"].field === graphicsItem.operations.field
            )
        );
    }

    // function getKeyWithMaxMinValue(obj, option) {
    //     if (option === 'max')
    //         return Object.keys(obj).reduce((min, max) => max)
    //     return Object.keys(obj).reduce((min, max) => min)
    // }

    // function transformData(data) {
    //     // Identifica a data mais recente
    //     const latestTimestamp = data.reduce((item) => Math.max(latest, Number(Object.keys(item.data.series["A: Transfer ERC-20"])[0])), 0);
    //     const latestDate = new Date(latestTimestamp);

    //     // Cria uma nova data que é 7 dias antes da data mais recente
    //     const sevenDaysBefore = new Date(latestDate.getTime());
    //     sevenDaysBefore.setDate(latestDate.getDate() - 7);

    //     const obj = data[0].data.series["A: Transfer ERC-20"]
    //     // console.log(Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b))
    //     console.log(getKeyWithMaxMinValue(obj, 'max'))

    //     return data.map(item => {
    //         const itemTimestamp = Number(Object.keys(item.data.series["A: Transfer ERC-20"])[0]);
    //         const itemDate = new Date(itemTimestamp);

    //         // Filtra os dados para incluir apenas aqueles cujo timestamp é maior que o timestamp da nova data
    //         const filteredData = Object.entries(item.data.series["A: Transfer ERC-20"])
    //             .filter(([x, y]) => new Date(Number(x)) > sevenDaysBefore)
    //             .map(([x, y]) => {
    //                 const date = new Date(Number(x));
    //                 const year = date.getFullYear();
    //                 const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adiciona um zero à frente se necessário
    //                 const day = ("0" + date.getDate()).slice(-2); // Adiciona um zero à frente se necessário
    //                 return { x: `${year}/${month}/${day}`, y: Number(y) };
    //             });

    //         return {
    //             id: item.data.metadata["A: Transfer ERC-20"].contract_name,
    //             color: `hsl(${Math.floor(Math.random() * 256)}, 70%, 50%)`,
    //             data: filteredData
    //         };
    //     });
    // }






    function filterByDate(data, period) {
        const latestDate = new Date(data[0].data[0].x);
        const { startDate, endDate } = getStartAndEndDates(period, latestDate);

        return data.filter(item => {
            const itemDate = new Date(item.data[0].x);
            const formattedItemDate = formatDate(itemDate);

            return formattedItemDate >= startDate && formattedItemDate <= endDate;
        });
    }
    function getStartAndEndDates(period, latestDate) {
        let startDate, endDate;

        switch (period) {
            case 'today':
                startDate = latestDate;
                endDate = latestDate;
                break;
            case 'yesterday':
                startDate = new Date(latestDate);
                startDate.setDate(startDate.getDate() - 1);
                endDate = startDate;
                break;
            case '7D':
                startDate = new Date(latestDate);
                startDate.setDate(startDate.getDate() - 7);
                endDate = latestDate;
                break;
            case '30D':
                startDate = new Date(latestDate);
                startDate.setDate(startDate.getDate() - 30);
                endDate = latestDate;
                break;
            case '3M':
                startDate = new Date(latestDate);
                startDate.setMonth(startDate.getMonth() - 3);
                endDate = latestDate;
                break;
            case '6M':
                startDate = new Date(latestDate);
                startDate.setMonth(startDate.getMonth() - 6);
                endDate = latestDate;
                break;
            case '12M':
                startDate = new Date(latestDate);
                startDate.setFullYear(startDate.getFullYear() - 1);
                endDate = latestDate;
                // console.log(startDate, endDate);
                break;
            default:
                throw new Error('Invalid period');
        }

        // Converte as datas para o formato 'yyyy/mm/dd'
        startDate = formatDate(startDate);
        endDate = formatDate(endDate);

        return { startDate, endDate };
    }

    function transformData(data) {
        return data.sort((a, b) => a - b)
            .map(item => ({
                id: item.data.metadata["A: Transfer ERC-20"].contract_name,
                color: `hsl(${Math.floor(Math.random() * 256)}, 70%, 50%)`,
                data: Object.entries(item.data.series["A: Transfer ERC-20"])
                    .map(([x, y]) => ({ x: formatDate(new Date(Number(x))), y: Number(y) }))
            }));
    }

    function formatDate(date) {
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adiciona um zero à frente se necessário
        var day = ("0" + date.getDate()).slice(-2); // Adiciona um zero à frente se necessário
        return year + "/" + month + "/" + day;
        return day;
    }

    return (
        <>
            <div className="m-0 p-[24px] w-full flex flex-col">
                <ButtonGroup className='m-0 p-0 font-inter leading-[18px] text-neutral_800 font-semibold justify-start bg-transparent' variant="outlined" color="black">
                    <Button className='m-0 p-[16px] rounded-s-md-[6px] text-neutral_800 focus:ring-0 text-[12px] border-solid border-neutral_300'>Custom</Button>
                    <Button className='m-0 p-[16px] border-solid text-neutral_800 hover:text-neutral_800 focus:ring-0 text-[12px] border-neutral_300'>Today</Button>
                    <Button className='m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300'>Yesterday</Button>
                    <Button className='m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300'>7D</Button>
                    <Button className='m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300'>30D</Button>
                    <Button className='m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300'>3M</Button>
                    <Button className='m-0 p-[16px] border-solid text-neutral_800 focus:ring-0 text-[12px] border-neutral_300'>6M</Button>
                    <Button className='m-0 p-[16px] rounded-es-md-[6px] text-neutral_800 focus:ring-0 text-[12px] border-solid border-neutral_300'>12M</Button>
                </ButtonGroup>
                <div className='mt-[24px]'>
                    <div className='pt-[13px] pb-[15px] px-[16px] m-0 grid w-full gap-y-[4px]'>
                        <span className="m-0 p-0 text-[14px] font-semibold leading-[20px] text-neutral_900">
                            {titleChart}
                        </span>
                        <span className="text-xs font-medium text-neutral_700">
                            {descriptionChart}
                        </span>
                    </div>
                    <hr className="border-1/2 border-solid border-neutral_300" />

                    <div className="h-[300px]">
                        <ResponsiveLine
                            data={convertedGraphicDatas}
                            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                            xScale={{ type: 'point' }}
                            yScale={{
                                type: 'linear',
                                min: 'auto',
                                max: 'auto',
                                stacked: true,
                                reverse: false
                            }}
                            yFormat=" >-.2f"
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: '',
                                legendOffset: 36,
                                legendPosition: 'middle'
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: '',
                                legendOffset: -40,
                                legendPosition: 'middle'
                            }}
                            enableGridX={false}
                            isInteractive={false}
                            enablePoints={false}
                            pointSize={10}
                            pointColor={{ from: 'color', modifiers: [] }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor' }}
                            pointLabelYOffset={-12}
                            useMesh={true}
                            legends={[
                                {
                                    anchor: 'top',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 0,
                                    translateY: -38,
                                    itemsSpacing: 0,
                                    itemDirection: 'left-to-right',
                                    itemWidth: 80,
                                    itemHeight: 20,
                                    itemOpacity: 0.75,
                                    symbolSize: 14,
                                    symbolShape: 'square',
                                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemBackground: 'rgba(0, 0, 0, .03)',
                                                itemOpacity: 1
                                            }
                                        }
                                    ]
                                }
                            ]}
                            motionConfig="default"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

import React, { useState, useEffect, useRef } from "react";

import { ButtonGroup, Button } from "@material-tailwind/react";
import { ResponsiveLine } from "@nivo/line";
import Charts_data from "../../assets/data/charts_data.json";
import ButtonDatesFilter from "../ButtonDatesFilter";
import ChartLine from "../ChartLine";

import {
  Typography,
  ListItem,
  Accordion,
  AccordionHeader,
} from "@material-tailwind/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";

interface ChartProps {
  graphicDatas: any[];
  titleChart: string;
  descriptionChart: string;
}

interface ConvertedGraphicDatasItem {
  metric_display_name: string;
  id: string;
  color: string;
  data: any[];
  checked: boolean;
}

interface Item {
  checked: boolean;
  // outras propriedades do item aqui
}

const blank_model_chart = [
  {
    id: "",
    color: "hsl(255, 0%, 0%)",
    data: [
      {
        x: "",
        y: "",
      },
    ],
  },
];

const TABLE_HEAD = ["Average", "Jun"];

const qtColumns = 6;

const Chart: React.FC<ChartProps> = ({
  graphicDatas,
  titleChart,
  descriptionChart,
}) => {
  const [convertedGraphicDatas, setConvertedGraphicDatas] =
    useState<any[]>(blank_model_chart);
  const [hide, setHide] = useState<boolean>(false);
  const [allItensChecked, setAllItensChecked] = useState<boolean>(false);

  useEffect(() => {
    if (
      !graphicDatas ||
      !graphicDatas.length ||
      typeof graphicDatas == undefined
    ) {
      setConvertedGraphicDatas(blank_model_chart);
      return;
    }
    const charts_data = findGraphicDatasInCharts_data(graphicDatas);
    const transformedData = transformData(charts_data);
    const filteredData = filterByDate(transformedData, "12M");
    setConvertedGraphicDatas(filteredData);
  }, [graphicDatas]);

  const handleClick = () => {
    setHide(!hide);
  };

  // Verifica se todos os itens da table estão ativos, se estiverem, muda o checkbox pai
  useEffect(() => {
    const allChecked = convertedGraphicDatas.every(
      (item) => item.checked === true
    );
    setAllItensChecked(allChecked);
  }, [convertedGraphicDatas]);

  // Muda o estado checked do checkbox do item na table
  const handleCheckboxChange = (row: ConvertedGraphicDatasItem) => {
    setConvertedGraphicDatas((prevGraphic) => {
      const index = convertedGraphicDatas.findIndex(
        (cG) => cG.id === row.id && cG.color === row.color
      );
      if (index !== -1) {
        const newGraphicItem = [...prevGraphic];
        newGraphicItem[index] = {
          ...newGraphicItem[index],
          checked: !newGraphicItem[index].checked,
        };
        return newGraphicItem;
      }
      return prevGraphic;
    });

    console.log(convertedGraphicDatas);
  };

  // Muda o estado checked do checkbox do pai e dos filhos, da table
  const handleCheckboxChangeAll = () => {
    setAllItensChecked(!allItensChecked);
    setConvertedGraphicDatas(prevState => 
       prevState.map(item => ({...item, checked: !allItensChecked}))
    );
   };
   

  // Filtrar os dados de charts_data.json baseado na metric_id, operation, contract_id e field
  function findGraphicDatasInCharts_data(graphicDatas: any[]): any[] {
    return Charts_data.filter((chartItem) =>
      graphicDatas.some(
        (graphicsItem) =>
          chartItem.data.metadata["A: Transfer ERC-20"].metric_id ===
            graphicsItem.metric_id &&
          chartItem.data.metadata["A: Transfer ERC-20"].operation ===
            graphicsItem.operations.operation &&
          chartItem.data.metadata["A: Transfer ERC-20"].contract_id ===
            graphicsItem.id &&
          chartItem.data.metadata["A: Transfer ERC-20"].field ===
            graphicsItem.operations.field
      )
    );
  }

  function filterByDate(data: any[], period: string): any[] {
    const latestDate = new Date(data[0].data[0].x);
    const { startDate, endDate } = getStartAndEndDates(period, latestDate);

    return data.filter((item) => {
      const itemDate = new Date(item.data[0].x);
      const formattedItemDate = formatDate(itemDate);

      return (
        new Date(formattedItemDate) >= startDate &&
        new Date(formattedItemDate) <= endDate
      );
    });
  }
  function getStartAndEndDates(
    period: string,
    latestDate: Date
  ): { startDate: Date; endDate: Date } {
    let startDate = new Date(),
      endDate = new Date();
    startDate = new Date(formatDate(startDate));
    endDate = new Date(formatDate(endDate));

    switch (period) {
      case "today":
        startDate = latestDate;
        endDate = latestDate;
        break;
      case "yesterday":
        startDate = new Date(latestDate);
        startDate.setDate(startDate.getDate() - 1);
        endDate = startDate;
        break;
      case "7D":
        startDate = new Date(latestDate);
        startDate.setDate(startDate.getDate() - 7);
        endDate = latestDate;
        break;
      case "30D":
        startDate = new Date(latestDate);
        startDate.setDate(startDate.getDate() - 30);
        endDate = latestDate;
        break;
      case "3M":
        startDate = new Date(latestDate);
        startDate.setMonth(startDate.getMonth() - 3);
        endDate = latestDate;
        break;
      case "6M":
        startDate = new Date(latestDate);
        startDate.setMonth(startDate.getMonth() - 6);
        endDate = latestDate;
        break;
      case "12M":
        startDate = new Date(latestDate);
        startDate.setFullYear(startDate.getFullYear() - 1);
        endDate = latestDate;
        break;
      default:
        throw new Error("Invalid period");
    }

    // Converte as datas para o formato 'yyyy/mm/dd'
    // startDate = formatDate(startDate);
    // endDate = formatDate(endDate);

    return { startDate, endDate };
  }

  // Recebe os dados filtrados do charts_data.json e o converte para modelo que é usado no gráfico
  function transformData(data: any[]): any[] {
    return data
      .sort((a, b) => a - b)
      .map((item) => ({
        metric_display_name: graphicDatas.find(
          (metrica) =>
            metrica.metric_id ===
            item.data.metadata["A: Transfer ERC-20"].metric_id
        ).metric_display_name,
        id: item.data.metadata["A: Transfer ERC-20"].contract_name,
        color: `hsl(${Math.floor(Math.random() * 256)}, 70%, 50%)`,
        data: Object.entries(item.data.series["A: Transfer ERC-20"]).map(
          ([x, y]) => ({ x: formatDate(new Date(Number(x))), y: Number(y) })
        ),
        checked: true,
      }));
  }

  function formatDate(date: Date): string {
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adiciona um zero à frente se necessário
    var day = ("0" + date.getDate()).slice(-2); // Adiciona um zero à frente se necessário
    return year + "/" + month + "/" + day;
    // return month + "/" + day;
    return day;
  }

  // Pega a cor do gráfico (hsl) e converte para hexadecimal (#rrggbb)
  function hslToHex(hsl: string) {
    let parts = hsl.substring(4, hsl.length - 1).split(",");
    let h = parseInt(parts[0]);
    let s = parseFloat(parts[1]) / 100;
    let l = parseFloat(parts[2]) / 100;

    if (s === 0) {
      let hex = Math.round(l * 255).toString(16);
      return "#" + ("0" + hex).slice(-2);
    }

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    let hex =
      "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
  }

  return (
    <>
      <div className="h-[calc(100vh-123px)] p-[24px] w-full flex flex-col">
        <ButtonDatesFilter />
        <ChartLine
          titleChart={titleChart}
          descriptionChart={descriptionChart}
          convertedGraphicDatas={convertedGraphicDatas.filter((d) => d.checked)}
        />

        <table className="overflow-x-hidden table-auto text-left">
          <thead className="text-red">
            <tr className="">
              <th className=" pb-[10px] border-solid border-neutral_300 border-t-[0px] border-b-[1px] border-l-[0px] border-r-[0px] bg-transparent">
                <div className="flex items-center pl-2 gap-2 min-w-[150px]">
                  <input
                    type="checkbox"
                    checked={allItensChecked}
                    onChange={handleCheckboxChangeAll}
                    className="ring-0 z-50 rounded-[4px] border-solid border-gray-300 text-blue-500 focus:ring-0 size-[16px]"
                  />
                  <div
                    onClick={handleClick}
                    className="cursor-pointer m-0 p-0 font-inter text-[14px] leading-[20px] text-neutral_700 font-medium gap-x-1 flex items-center"
                  >
                    <span>
                      Events (
                      {convertedGraphicDatas[0].id == ""
                        ? 0
                        : convertedGraphicDatas.length}
                      )
                    </span>

                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3.5 w-3.5 transition-transform  ${
                        hide ? "-rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>
              </th>
              {TABLE_HEAD.map((head, index) => (
                <React.Fragment key={head}>
                  {index === 0 && (
                    <th className="min-w-[120px] pb-[10px] m-0 p-0 border-solid text-center border-neutral_300 border-t-[0px] border-b-[1px] border-l-[0px] border-r-[1px] bg-transparent px-[27px]">
                      <Typography
                        placeholder=""
                        variant="small"
                        color="blue-gray"
                        className="m-0 p-0 font-inter text-[14px] leading-[20px] text-neutral_700 font-medium"
                      >
                        {head}
                      </Typography>
                    </th>
                  )}
                  {index !== 0 &&
                    Array.from({ length: qtColumns }).map((_, i) => (
                      <th
                        key={`${head}-${i}`}
                        className="min-w-[120px] pb-[10px] m-0 p-0 border-solid text-center border-neutral_300 border-t-[0px] border-b-[1px] border-l-[0px] border-r-[0px] bg-transparent px-[27px]"
                      >
                        <Typography
                          placeholder=""
                          variant="small"
                          color="blue-gray"
                          className="m-0 p-0 font-inter text-[14px] leading-[20px] text-neutral_700 font-medium"
                        >
                          {head} {i + 1}
                        </Typography>
                      </th>
                    ))}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody
            className={`m-0 p-0 transition-all duration-500 ${
              hide ? "-translate-y-4 opacity-0" : ""
            }`}
          >
            {convertedGraphicDatas[0].id != "" &&
              convertedGraphicDatas.map((row, index) => {
                const classes =
                  "break-words justify-center text-center bg-transparent border-solid border-neutral_300 border-none px-[27px]";
                const classTypography =
                  "break-words font-inter text-[14px] leading-[20px] text-neutral_700 font-normal";
                const color = hslToHex(row.color);
                return (
                  <tr key={index} className="">
                    <td className="pl-2 py-2">
                      <div className="flex items-center gap-2 min-w-[150px]">
                        <input
                          type="checkbox"
                          checked={row.checked}
                          onChange={() => handleCheckboxChange(row)}
                          // style={{color: color}}
                          className={`ring-0 z-50 rounded-[4px] border-solid border-gray-300 focus:ring-0 size-[16px]`}
                        />
                        <div
                          onClick={handleClick}
                          className="cursor-pointer m-0 p-0 font-inter text-[14px] leading-[20px] text-neutral_700 font-medium gap-x-1 flex items-center"
                        >
                          <Typography
                            placeholder=""
                            variant="small"
                            color="blue-gray"
                            className={classTypography}
                          >
                            {row.metric_display_name} {row.id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td
                      className={`border-solid text-center border-neutral_300 border-t-[0px] border-b-[0px] border-l-[0px] border-r-[1px]`}
                    >
                      <Typography
                        placeholder=""
                        variant="small"
                        color="blue-gray"
                        className={classTypography}
                      >
                        {(() => {
                          const firstValues = row.data.slice(0, qtColumns);
                          const sum = firstValues.reduce(
                            (acc: string, curr: { y: any }) =>
                              acc + Number(curr.y),
                            0
                          );
                          const average = sum / firstValues.length;
                          return average.toFixed(2);
                        })()}
                      </Typography>
                    </td>
                    {Array.from({ length: qtColumns }).map((_, i) => (
                      <td key={i} className={classes}>
                        <Typography
                          placeholder=""
                          variant="small"
                          color="blue-gray"
                          className={classTypography}
                        >
                          {row.data[i]?.y || ""}
                        </Typography>
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Chart;

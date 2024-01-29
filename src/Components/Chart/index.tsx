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

const blank_model_chart = [
  {
    id: "",
    color: "hsl(0, 00%, 00%)",
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

const TABLE_ROWS = [
  {
    chain_name: "Ethereum",
    data: [
      {
        date: "1",
        value: "10",
      },
      {
        date: "2",
        value: "11",
      },
      {
        date: "3",
        value: "12",
      },
      {
        date: "4",
        value: "13",
      },
      {
        date: "5",
        value: "14",
      },
      {
        date: "6",
        value: "15",
      },
      {
        date: "7",
        value: "16",
      },
      {
        date: "8",
        value: "17",
      },
      {
        date: "9",
        value: "18",
      },
      {
        date: "10",
        value: "19",
      },
    ],
  },
  {
    chain_name: "Bitcoin",
    data: [
      {
        date: "1",
        value: "20",
      },
      {
        date: "2",
        value: "21",
      },
      {
        date: "3",
        value: "22",
      },
      {
        date: "4",
        value: "23",
      },
      {
        date: "5",
        value: "24",
      },
      {
        date: "6",
        value: "25",
      },
      {
        date: "7",
        value: "26",
      },
      {
        date: "8",
        value: "27",
      },
      {
        date: "9",
        value: "28",
      },
      {
        date: "10",
        value: "29",
      },
    ],
  },
];

const Chart: React.FC<ChartProps> = ({
  graphicDatas,
  titleChart,
  descriptionChart,
}) => {
  const [open, setOpen] = useState<number>(0);
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
  const [convertedGraphicDatas, setConvertedGraphicDatas] =
    useState<any[]>(blank_model_chart);

  const [hide, setHide] = useState(false);

  const handleClick = () => {
    setHide(!hide);
  };

  useEffect(() => {
    if (
      !graphicDatas ||
      !graphicDatas.length ||
      typeof graphicDatas == undefined
    ) {
      return;
    }
    console.log(convertedGraphicDatas);
    const charts_data = findGraphicDatasInCharts_data(graphicDatas);
    const transformedData = transformData(charts_data);
    const filteredData = filterByDate(transformedData, "12M");
    setConvertedGraphicDatas(filteredData);
  }, [graphicDatas]);

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
        // console.log(startDate, endDate);
        break;
      default:
        throw new Error("Invalid period");
    }

    // Converte as datas para o formato 'yyyy/mm/dd'
    // startDate = formatDate(startDate);
    // endDate = formatDate(endDate);

    return { startDate, endDate };
  }

  function transformData(data: any[]): any[] {
    return data
      .sort((a, b) => a - b)
      .map((item) => ({
        id: item.data.metadata["A: Transfer ERC-20"].contract_name,
        color: `hsl(${Math.floor(Math.random() * 256)}, 70%, 50%)`,
        data: Object.entries(item.data.series["A: Transfer ERC-20"]).map(
          ([x, y]) => ({ x: formatDate(new Date(Number(x))), y: Number(y) })
        ),
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

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
      <div className="h-[calc(100vh-123px)] p-[24px] w-full flex flex-col">
        <ButtonDatesFilter />
        <ChartLine
          titleChart={titleChart}
          descriptionChart={descriptionChart}
          convertedGraphicDatas={convertedGraphicDatas}
        />

        <table className="overflow-x-hidden table-auto text-left">
          <thead className="text-red">
            <tr className="">
              <th className=" pb-[10px] border-solid border-neutral_300 border-t-[0px] border-b-[1px] border-l-[0px] border-r-[0px] bg-transparent">
                <div className="flex items-center pl-2 gap-2 min-w-[150px]">
                  <input
                    type="checkbox"
                    className="ring-0 z-50 rounded-[4px] border-solid border-gray-300 text-blue-500 focus:ring-0 size-[16px]"
                  />
                  <div
                    onClick={handleClick}
                    className="cursor-pointer m-0 p-0 font-inter text-[14px] leading-[20px] text-neutral_700 font-medium gap-x-1 flex items-center"
                  >
                    <span>Events ({convertedGraphicDatas.length})</span>

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
                    <th className="min-w-[100px] pb-[10px] m-0 p-0 border-solid text-center border-neutral_300 border-t-[0px] border-b-[1px] border-l-[0px] border-r-[1px] bg-transparent px-[27px]">
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
                        className="min-w-[100px] pb-[10px] m-0 p-0 border-solid text-center border-neutral_300 border-t-[0px] border-b-[1px] border-l-[0px] border-r-[0px] bg-transparent px-[27px]"
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
            {convertedGraphicDatas.map((row, index) => {
              const classes =
                "justify-center text-center bg-transparent border-solid border-neutral_300 border-none px-[27px]";
              const classTypography =
                "font-inter text-[14px] leading-[20px] text-neutral_700 font-normal";

              return (
                <tr key={index} className="">
                  <td className="pl-2 py-2">
                    <div className="flex items-center gap-2 min-w-[150px]">
                      <input
                        type="checkbox"
                        className="ring-0 z-50 rounded-[4px] border-solid border-gray-300 text-blue-500 focus:ring-0 size-[16px]"
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
                          {row.id}
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
                        console.log(firstValues)
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

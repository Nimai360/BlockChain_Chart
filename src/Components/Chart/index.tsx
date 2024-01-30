import React, { useState, useEffect } from "react";

import Charts_data from "../../assets/data/charts_data.json";
import ButtonDatesFilter from "../ButtonDatesFilter";
import ChartLine from "../ChartLine";
import TableGraphic from "../TableGraphic";

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
  const [daysFilter, setDaysFilter] = useState<number>(7);

  // useEffect(() => {}, [daysFilter]);

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
    const filteredData = transformedData.map((item) => {
      return {
        ...item,
        data: filterByDate(item, daysFilter),
      };
    });

    setConvertedGraphicDatas(filteredData);
  }, [graphicDatas, daysFilter]);

  // Verifica se todos os itens da table estão ativos, se estiverem, muda o checkbox pai
  useEffect(() => {
    if (convertedGraphicDatas.length === 0) return;
    const allChecked = convertedGraphicDatas.every(
      (item) => item.checked === true
    );
    setAllItensChecked(allChecked);
  }, [convertedGraphicDatas]);

  const handleClick = () => {
    setHide(!hide);
  };

  const handleDaysFilterSelected = (days: number) => {
    setDaysFilter(days);
  };

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
  };

  // Muda o estado checked do checkbox do pai e dos filhos, da table
  const handleCheckboxChangeAll = () => {
    if (convertedGraphicDatas[0].id === "") return;
    setAllItensChecked(!allItensChecked);
    setConvertedGraphicDatas((prevState) =>
      prevState.map((item) => ({ ...item, checked: !allItensChecked }))
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

  function sortDateMetricsData(data: any[]): any[] {
    let new_data = data["data"];
    new_data = new_data.sort((a: any, b: any) => {
      let dateA: any = new Date(a.x);
      let dateB: any = new Date(b.x);
      return dateB - dateA;
    });
    return new_data;
  }

  function filterByDate(data: any[], period: number): any[] {
    if (!data || data.length === 0) {
      return [];
    }
    // Já possui as informações ordenadas por data decrescente
    let new_data = sortDateMetricsData(data);

    // new_data.map(item => null)
    const latestDate = new Date(new_data[0].x);
    const { startDate, endDate } = getStartAndEndDates(period, latestDate);

    return new_data.filter((item: { x: string | number | Date }) => {
      const itemDate = new Date(item.x);
      const formattedItemDate = formatDate(itemDate);

      return (
        new Date(formattedItemDate) >= startDate &&
        new Date(formattedItemDate) <= endDate
      );
    });
  }

  function getStartAndEndDates(
    // period: string,
    period: number,
    latestDate: Date
  ): { startDate: Date; endDate: Date } {
    let startDate = new Date(),
      endDate = new Date();
    startDate = new Date(formatDate(startDate));
    endDate = new Date(formatDate(endDate));

    startDate = new Date(latestDate);
    startDate.setDate(startDate.getDate() - (period - 1));
    endDate = latestDate;

    // switch (period) {
    //   case "today":
    //     startDate = latestDate;
    //     endDate = latestDate;
    //     break;
    //   case "yesterday":
    //     startDate = new Date(latestDate);
    //     startDate.setDate(startDate.getDate() - (1 - 1));
    //     endDate = startDate;
    //     break;
    //   case "7D":
    //     startDate = new Date(latestDate);
    //     startDate.setDate(startDate.getDate() - (7 - 1));
    //     endDate = latestDate;
    //     break;
    //   case "30D":
    //     startDate = new Date(latestDate);
    //     startDate.setDate(startDate.getDate() - (30 - 1));
    //     endDate = latestDate;
    //     break;
    //   case "3M":
    //     startDate = new Date(latestDate);
    //     startDate.setMonth(startDate.getMonth() - (3 - 1));
    //     endDate = latestDate;
    //     break;
    //   case "6M":
    //     startDate = new Date(latestDate);
    //     startDate.setMonth(startDate.getMonth() - (6 - 1));
    //     endDate = latestDate;
    //     break;
    //   case "12M":
    //     startDate = new Date(latestDate);
    //     startDate.setFullYear(startDate.getMonth() - (12 - 1));
    //     endDate = latestDate;
    //     break;
    //   default:
    //     throw new Error("Invalid period");
    // }

    // Converte as datas para o formato 'yyyy/mm/dd'
    // startDate = formatDate(startDate);
    // endDate = formatDate(endDate);

    return { startDate, endDate };
  }

  // Recebe os dados filtrados do charts_data.json e o converte para modelo que é usado no gráfico
  function transformData(data: any[]): any[] {
    return (
      data
        // .sort((a, b) => a.data.x - b.data.x)
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
        }))
    );
  }

  function formatDate(date: Date): string {
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adiciona um zero à frente se necessário
    var day = ("0" + date.getDate()).slice(-2); // Adiciona um zero à frente se necessário
    return year + "/" + month + "/" + day;
    // return month + "/" + day;
    return day;
  }

  return (
    <>
      <div className="h-[calc(100vh-123px)] p-[24px] w-full flex flex-col">
        <ButtonDatesFilter onButtonClick={handleDaysFilterSelected} />
        <ChartLine
          titleChart={titleChart}
          descriptionChart={descriptionChart}
          convertedGraphicDatas={convertedGraphicDatas.filter((d) => d.checked)}
        />

        <div className="overflow-x-auto min-h-[200px]">
          <TableGraphic
            convertedGraphicDatas={convertedGraphicDatas}
            handleCheckboxChange={handleCheckboxChange}
            handleCheckboxChangeAll={handleCheckboxChangeAll}
            allItensChecked={allItensChecked}
            hide={hide}
            handleClick={handleClick}
            qtColumns={qtColumns}
          />
        </div>
        <br/>
      </div>
    </>
  );
};

export default Chart;

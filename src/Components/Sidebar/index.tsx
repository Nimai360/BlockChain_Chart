import React, { useState, useEffect, useRef } from "react";
import Contract_datasources from "../../assets/data/contract_datasources.json";
import Charts_data from "../../assets/data/charts_data.json";
import ERC20_metrics from "../../assets/data/ERC20_metrics.json";

import Accordion_Title from "../Accordion_Title/";
import Metric_Options from "../Metric_Options";
import Metric_Card from "../Metric_Card";
import Contracts_DataSource from "../Contracts_DataSource";

import { Card, List, ListItem, AccordionBody } from "@material-tailwind/react";

const contract_type_Contracts = ["ERC20"];

interface SidebarProps {
  onChangeDatas: (data: any[]) => void;
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

interface Item {
  id: string;
  operations_id: string;
  checked: boolean;
}

interface Operation {
  id: string;
  operation_description: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onChangeDatas }) => {
  const [allContracts, setAllContracts] = useState<any[]>([]);
  const [allMetricsOptions, setAllMetricsOptions] = useState<any[]>([]);

  useEffect(() => {
    // Quando um contrato é selecionado e desmarcado, atualiza a lista de métricas e consequentemente os itens de cada operação que será exibido em Metrics
    updateMetrics(allContracts);
  }, [allContracts]);

  useEffect(() => {
    // Quando um item da operação de Metrics é alterado (marcado ou desmarcado), filtra a lista dos selecionados e envia para o gráfico
    onChangeDatas(allMetricsOptions.filter((item) => item.checked));
  }, [allMetricsOptions]);

  function updateMetrics(allContracts: any[]) {
    // Com base nos contratos selecionados, busca em Charts_data informações importantes para o item de Metrics
    let matchingChartDataIds = Charts_data.map((metric) => {
      const contract = metric.data.metadata["A: Transfer ERC-20"];
      const foundItem = allContracts.find(
        (item) => item.id === contract["contract_id"]
      );

      if (foundItem) {
        foundItem.metric_id = contract["metric_id"];
        foundItem.metric = contract["metric"];
        return foundItem;
      }

      return null;
    }).filter(Boolean);

    // Agora que possui o contrato selecionado, e informações intermediárias do Charts_data (como metric_id), agora consegue vincular as métricas as métricas em ERC20_metrics.json
    // Salva as informações básicas de cada métrica de ERC20_metrics.json
    matchingChartDataIds = matchingChartDataIds.map((chartDataId) => {
      const matchingMetric = ERC20_metrics[0].data.data.find(
        (metric) => metric.id === chartDataId.metric_id
      );
      if (matchingMetric) {
        chartDataId.metric_display_name = matchingMetric.metric_display_name;
        chartDataId.operations = matchingMetric.operations;
        chartDataId.operations_id = matchingMetric.operations[0].id;
        // pode ter erro aqui no [0]
      }
      return chartDataId;
    });

    expandContractsToMetrics(matchingChartDataIds);
  }

  // Agora que tem o contrato e já vinculou as métricas, essa função cria um item para cada operação da métrica de ERC20_metrics.json, baseado no contrato selecionado
  function expandContractsToMetrics(matchingChartDataIds: any[]) {
    setAllMetricsOptions([]);
    matchingChartDataIds.map((item) =>
      item.operations.map((operation: Operation) => {
        const metric = {
          id: item.id,
          name: item.name,
          chain_name: item.chain_name,
          contract_type: item.contract_type,
          metric_id: item.metric_id,
          metric: item.metric,
          metric_display_name: item.metric_display_name,
          operations_id: operation.id,
          operations: operation,
          checked: true, //item.checked,
          metric_description: `${operation.operation_description} for ${item.name} (${item.contract_type}) on ${item.chain_name}`,
        };
        setAllMetricsOptions((prevMetrics) => [...prevMetrics, metric]);
      })
    );
  }

  const handleContractChange = (contract: any, checked: boolean) => {
    // Cria um modelo base para o contrato, com algumas informações que serão usadas em outras partes
    const metric = {
      id: contract["id"],
      name: contract["name"],
      chain_name: contract["chain_name"],
      contract_type: "ERC20",
      metric_id: "",
      metric: "",
      metric_display_name: "",
      operations_id: "",
      operations: [],
      checked: false,
    };

    // Ao selecionar o contrato, ele vai pra lista AllContracts, para saber quais estão selecionados, senão remove ele da lista
    if (checked) {
      setAllContracts((prevMetrics) => [...prevMetrics, metric]);
    } else {
      setAllContracts((prevMetrics) => {
        const index = prevMetrics.findIndex((item) => item.id === metric.id);
        if (index !== -1) {
          const newMetrics = [...prevMetrics];
          newMetrics.splice(index, 1);
          return newMetrics;
        }
        return prevMetrics;
      });

      // Atualiza a lista de Metrics, com base nos contratos selecionados. Adicionando o contrato na lista ou removendo todos os itens de Metrics pertinente a aquele contrato
      setAllMetricsOptions(
        allMetricsOptions.filter((item) => item.id != contract.id)
      );
    }
  };

  const handleMetricChange = (item: Item) => {
    // Atualiza o status do item da Metrics (checked true ou false)
    setAllMetricsOptions((prevMetrics) => {
      const index = prevMetrics.findIndex(
        (metric) =>
          metric.operations_id === item.operations_id && metric.id === item.id
      );
      if (index !== -1) {
        const newMetrics = [...prevMetrics];
        newMetrics[index] = {
          ...newMetrics[index],
          checked: !newMetrics[index].checked,
        };
        return newMetrics;
      }
      return prevMetrics;
    });
  };

  return (
    <>
      <Card
        placeholder=""
        className=" m-0 p-0 h-[calc(100vh-123px)] w-full shadow-none bg-neutral_100 rounded-none border-t-0 border-l-0 border-b-0 border-r-2 border-solid border-r-neutral_300"
      >
        <List placeholder="" className="m-0 px-[18px] py-4">
          <Accordion_Title title="Data Source">
            <Contracts_DataSource
              contract_type_Contracts={contract_type_Contracts}
              onCheckboxChange={handleContractChange}
            />
          </Accordion_Title>

          <Accordion_Title title="Metrics">
            <Metric_Options
              allMetrics={allMetricsOptions}
              onOptionChange={handleMetricChange}
            />
          </Accordion_Title>

          <div className="flex flex-col gap-[10px]">
            {allMetricsOptions
              .filter((metric) => metric.checked)
              .map((item) => (
                <Metric_Card item={item} onOptionChange={handleMetricChange} />
              ))}
          </div>

          <Accordion_Title title="Filter">
            <AccordionBody className="py-1 bg-white_color rounded-md border border-solid border-neutral_300">
              <ListItem
                placeholder=""
                className="rounded-none h-[24px] m-0 p-0 justify-center text-neutral_700"
              >
                <div className="flex text-xs">
                  <span className="">Add new</span>
                </div>
              </ListItem>
            </AccordionBody>
          </Accordion_Title>

          <Accordion_Title title="Breakdown">
            <AccordionBody className="py-1 bg-white_color rounded-md border border-solid border-neutral_300">
              <ListItem
                placeholder=""
                className="rounded-none h-[24px] m-0 p-0 justify-center text-neutral_700"
              >
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
};

export default Sidebar;

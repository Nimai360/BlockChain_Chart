import React, { useState, useEffect, useRef } from "react";
import { ButtonGroup, Button } from "@material-tailwind/react";
import { ResponsiveLine } from "@nivo/line";

interface ChartLineProps {
    titleChart: string,
    descriptionChart: string,
    convertedGraphicDatas: any,
}

const ChartLine: React.FC<ChartLineProps> = ({titleChart, descriptionChart, convertedGraphicDatas}) => {
  return (
    <>
      <div className="my-[24px]">
        <div className="pt-[13px] pb-[15px] px-[16px] m-0 grid w-full gap-y-[4px]">
          <span className="m-0 p-0 text-[14px] font-semibold leading-[20px] text-neutral_900">
            {titleChart}
          </span>
          <span className="text-xs font-medium text-neutral_700">
            {descriptionChart}
          </span>
        </div>
        <hr className="border-1/2 border-solid border-neutral_300" />

        <div className="h-[450px]">
          <ResponsiveLine
            theme={{
              legends: {
                text: {
                  fontSize: 12,
                  fontFamily: "Inter",
                  fontWeight: 400,
                  lineHeight: 18,
                },
              },
            }}
            data={convertedGraphicDatas}
            margin={{ top: 80, right: 50, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            enableGridX={false}
            isInteractive={false}
            enablePoints={false}
            pointSize={10}
            pointColor={{ from: "color", modifiers: [] }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: -50,
                itemsSpacing: 50,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 1,
                symbolSize: 14,
                symbolShape: "square",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .0)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            motionConfig="default"
          />
        </div>
      </div>
    </>
  );
};

export default ChartLine;

import React from "react";
import { Typography } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface ConvertedGraphicDatasItem {
  metric_display_name: string;
  id: string;
  color: string;
  data: any[];
  checked: boolean;
}

const TABLE_HEAD = ["Average", "Jun"];

const TableGraphic: React.FC<{
  convertedGraphicDatas: ConvertedGraphicDatasItem[];
  handleCheckboxChange: (row: ConvertedGraphicDatasItem) => void;

  handleCheckboxChangeAll: () => void;
  allItensChecked: boolean;
  hide: boolean;
  handleClick: () => void;
  qtColumns: number;
}> = ({
  convertedGraphicDatas,
  handleCheckboxChange,
  handleCheckboxChangeAll,
  allItensChecked,
  hide,
  handleClick,
  qtColumns,
}) => {
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
  let maxArrayLength = Math.max(...convertedGraphicDatas.map(item => item.data.length));
  qtColumns = maxArrayLength;

  return (
    <>
      <table className="table-auto text-left">
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
                    {convertedGraphicDatas &&
                    convertedGraphicDatas.length > 0 &&
                    convertedGraphicDatas[0].id !== ""
                      ? convertedGraphicDatas.length
                      : 0}
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
          {convertedGraphicDatas &&
            convertedGraphicDatas.length > 0 &&
            convertedGraphicDatas[0].id !== "" &&
            convertedGraphicDatas.map((row, index) => {
              const classes =
                "break-words justify-center text-center bg-transparent border-solid border-neutral_300 border-none px-[27px]";
              const classTypography =
                "break-words font-inter text-[14px] leading-[20px] text-neutral_700 font-normal";
              return (
                <tr key={index} className="">
                  <td className="pl-2 py-2">
                    <div className="flex items-center gap-2 min-w-[150px]">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={() => handleCheckboxChange(row)}
                        // style={{color: hslToHex(row.color)}}
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
                        const sum = row.data.reduce(
                          (total, item) => total + item["y"],
                          0
                        );
                        // const firstValues = row.data.slice(0, qtColumns);
                        // const sum = firstValues.reduce(
                        //   (acc: string, curr: { y: any }) =>
                        //     acc + Number(curr.y),
                        //   0
                        // );
                        const average = sum / row.data.length;
                        return average.toFixed(2);
                      })()}
                    </Typography>
                  </td>
                  {/* {convertedGraphicDatas.map((item, index) => {
                    return (
                      <td key={index} className={classes}>
                        <Typography
                          placeholder=""
                          variant="small"
                          color="blue-gray"
                          className={classTypography}
                        >
                          {item.data[index]?.y || ""}
                        </Typography>
                      </td>
                    );
                  })} */}
                  {Array.from({ length: qtColumns }).map((_, i) => {
                    return (
                      <td key={i} className={`${classes}`}>
                        <Typography
                          placeholder=""
                          variant="small"
                          color="blue-gray"
                          className={classTypography}
                        >
                          {row.data[i]?.y.toFixed(2) || ""}
                        </Typography>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableGraphic;

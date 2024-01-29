import React from "react";

import { Card, Typography, CardBody } from "@material-tailwind/react";

interface Metric_CardProps {
  item: any;
  onOptionChange: (item: any) => void;
}

const Metric_Card: React.FC<Metric_CardProps> = ({ item, onOptionChange }) => {
  const handleChange = (event: React.MouseEvent, item: any) => {
    onOptionChange(item);
  };

  return (
    <>
      <Card
        placeholder=""
        className="cursor-pointer pt-[9px] pb-[6px] px-[12px] w-full inline-flex border-[1px] border-solid border-neutral_300 shadow-none"
        onClick={(event) => handleChange(event, item)}
      >
        <CardBody placeholder="" className="m-0 p-0">
          <Typography
            placeholder=""
            variant="h5"
            className="font-inter font-medium text-[12px] text-primary_500_brand"
          >
            {item.metric_display_name}
          </Typography>
          <Typography
            placeholder=""
            variant="h5"
            className="font-inter font-medium text-[12px] leading-[18px] text-neutral_600"
          >
            {item.metric_description}
          </Typography>
        </CardBody>
      </Card>
    </>
  );
};

export default Metric_Card;

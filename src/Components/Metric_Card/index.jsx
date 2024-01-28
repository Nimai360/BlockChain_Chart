import React from "react";

import {
    Card,
    Typography,
    CardBody,
} from "@material-tailwind/react";

export default function Metric_Card({ item, onOptionChange }) {
    const handleChange = (event, item) => {
        onOptionChange(item);
    };

    return (
        <>
            <Card className="cursor-pointer pt-[9px] pb-[6px] px-[12px] w-full inline-flex border-[1px] border-solid border-neutral_300 shadow-none" onClick={(event) => handleChange(event, item)}>
                <CardBody className="m-0 p-0">
                    <Typography variant="h5" className="font-inter font-medium text-[12px] text-primary_500_brand">
                        {item.metric_display_name}
                    </Typography>
                    <Typography variant="h5" className="font-inter font-medium text-[12px] leading-[18px] text-neutral_600">
                        {item.chain_name}
                    </Typography>
                </CardBody>                
            </Card>
        </>
    )
}
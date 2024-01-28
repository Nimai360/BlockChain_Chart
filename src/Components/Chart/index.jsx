import { useState } from 'react';

import { ButtonGroup, Button } from "@material-tailwind/react";
import { ResponsiveLine } from '@nivo/line'

import DataChart from './data.json';

export default function Chart({ graphicDatas }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(false);

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
                            Title
                        </span>
                        <span className="text-xs font-medium text-neutral_700">
                            You can identify your most engaged users by using cohorts.
                        </span>
                    </div>
                    <hr className="border-1/2 border-solid border-neutral_300" />

                    <div className="h-[300px]">
                        <ResponsiveLine
                            data={DataChart}
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

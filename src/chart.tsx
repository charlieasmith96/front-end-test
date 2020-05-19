import React, { useState, ReactNode } from 'react';
import { createContainer , VictoryLine, VictoryArea, VictoryStack, VictoryChart, VictoryBrushContainer, VictoryAxis, VictoryTooltip } from 'victory';


export interface ChartProps {
    dataSet1?: BroadcastData
    dataSet2?: BroadcastData 
    startDate: number
    endDate: number
    p2pMax?: number 
    cdnMax?: number 
}
const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export type BroadcastData = number[][]

export const Chart = (props : ChartProps)  => {
    const [selectedDomain, setSelectedDomain] = useState({});
    const [zoomDomain, setZoomDomain] = useState({});

    const handleZoom = (domain: any) => {
        setSelectedDomain(domain);
    }
    
    const handleBrush = (domain: any) => {
        setZoomDomain(domain);
     }

    return (
        <div>
            {props.startDate}
            <VictoryChart 
             width={1000}
             height={300}
             standalone={true}
             scale={{x: "time"}}
            containerComponent={
            //@ts-ignore
              <VictoryZoomVoronoiContainer responsive={true}
                zoomDimension="x"
                zoomDomain={zoomDomain}
                onZoomDomainChange={handleZoom}
                //@ts-ignore
                labels={({datum }) => `Maximum: ${(datum[1])}`}
                voronoiDimension="x"
              />
            }>
            <VictoryStack>
                <VictoryArea data={props.dataSet1} x={0} y={1} style={{data: {fill: "#C42151"}}} />
                <VictoryArea data={props.dataSet2} x={0} y={1} style={{data: {fill: "#12A5ED"}}} />
             </VictoryStack>
            </VictoryChart>
            <VictoryChart 

             width={1000}
             height={90}
             scale={{x: "time"}}
             padding={{top: 0, left: 50, right: 50, bottom: 30}}
            containerComponent={
              <VictoryBrushContainer responsive={true}
              brushDimension="x"
              //@ts-ignore
              brushDomain={selectedDomain}
              onBrushDomainChange={handleBrush}
              />
            }>
            <VictoryAxis>

            </VictoryAxis>
              <VictoryLine data={props.dataSet1} x={0} y={1} />
              <VictoryLine data={props.dataSet2} x={0} y={1} />
            </VictoryChart>
        </div>
    )
}
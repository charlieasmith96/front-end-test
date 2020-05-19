import React, { useState, ReactNode } from 'react';
import { createContainer , VictoryLine, VictoryArea, VictoryStack, VictoryChart, VictoryBrushContainer, VictoryAxis, VictoryTooltip } from 'victory';
import { subtractDate } from '../utils';

export interface ChartProps {
    dataSet1?: BroadcastData
    dataSet2?: BroadcastData 
    startDate: number
    endDate: number
    p2pAndCdnMax?: number 
    cdnMax?: number 
}
const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export type BroadcastData = number[][]

export const Chart = (props : ChartProps)  => {
    const [selectedDomain, setSelectedDomain] = useState({ x: [subtractDate(10), subtractDate(5)] });
    const [zoomDomain, setZoomDomain] = useState({ x: [subtractDate(10), subtractDate(5)] });

    const handleZoom = (domain: any) => {
        setSelectedDomain(domain);
    }
    
    const handleBrush = (domain: any) => {
      // SET Y TO UNDEFINED TO RETAIN Y PROPORTIONS IN MAIN GRAPH
        domain.y = undefined;
        setZoomDomain(domain);
     }

    return (
        <div>
            {console.log(zoomDomain)}
            <VictoryChart width={1000} height={250} scale={{x: "time"}} containerComponent={
              <VictoryZoomVoronoiContainer 
                //@ts-ignore
        
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

             <VictoryLine data={[[props.startDate, props.cdnMax], [props.endDate, props.cdnMax]]}
              x={0} y={1} style={{data: {stroke: "red"}}} />

             <VictoryLine data={[[props.startDate, props.p2pAndCdnMax], [props.endDate, props.p2pAndCdnMax]]}
              x={0} y={1} style={{data: {stroke: "green"}}}/>

            </VictoryChart>
            <VictoryChart width={1000} height={100} scale={{x: "time"}} padding={{top: 0, left: 50, right: 50, bottom: 30}}
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
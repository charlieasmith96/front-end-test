import React, { useState } from 'react';
import { createContainer , VictoryLine, VictoryArea, VictoryStack, VictoryChart, VictoryBrushContainer, VictoryAxis } from 'victory';
import { subtractDate } from '../helpers/date-utils';

export interface ChartProps {
    dataSet1?: BroadcastData
    dataSet2?: BroadcastData 
    startDate: number
    endDate: number
    p2pAndCdnMax?: number 
    cdnMax?: number 
}

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
const INITIAL_ZOOM_DOMAIN = { x: [subtractDate(4), subtractDate(2)] }

export type BroadcastData = number[][]

export const Chart = (props : ChartProps)  => {
    const [zoomDomain, setZoomDomain] = useState(INITIAL_ZOOM_DOMAIN);

    const handleZoom = (domain: any) => {
      domain.y = undefined;
      setZoomDomain(domain);
    }
    
    return (
        <div>
            <VictoryChart width={1000} height={250} scale={{x: "time"}} 
            containerComponent={
              <VictoryZoomVoronoiContainer 
                //@ts-ignore
                zoomDimension="x"
                allowZoom={false}
                allowPan={false}
                zoomDomain={zoomDomain}
                onZoomDomainChange={(domain : any) => handleZoom(domain)}
                //@ts-ignore
                labels={({datum }) => `Maximum: ${(datum[1])}`}
                voronoiDimension="x"
              />
            }>

            <VictoryStack>
                <VictoryArea interpolation={"natural"} data={props.dataSet1} x={0} y={1} style={{data: {fill: "#C42151"}}} />
                <VictoryArea interpolation={"natural"} data={props.dataSet2} x={0} y={1} style={{data: {fill: "#12A5ED"}}} />
             </VictoryStack>

             <VictoryLine data={[[props.startDate - 1, props.cdnMax], [props.endDate - 1, props.cdnMax]]}
              x={0} y={1} style={{data: {stroke: "red"}}} />

             <VictoryLine data={[[props.startDate - 1, props.p2pAndCdnMax], [props.endDate - 1, props.p2pAndCdnMax]]}
              x={0} y={1} style={{data: {stroke: "green", strokeWidth: 3}}}/>

            </VictoryChart>
            <VictoryChart width={1000} height={100} scale={{x: "time"}} padding={{top: 0, left: 50, right: 50, bottom: 30}}
            style={{background: { fill: "#C9EDD9" }}}
            containerComponent={
              <VictoryBrushContainer responsive={true}
              brushDimension="x"
              //@ts-ignore
              brushDomain={zoomDomain}
              onBrushDomainChange={(domain : any) => handleZoom(domain)}
              />
            }>
            <VictoryAxis>

            </VictoryAxis>
              <VictoryLine data={props.dataSet1} x={0} y={1} interpolation={"natural"} />
              <VictoryLine data={props.dataSet2} x={0} y={1} interpolation={"natural"} />
            </VictoryChart>
        </div>
    )
}
import React, { useState, useEffect, useContext, SyntheticEvent } from 'react'
import { getBandwidthDataBySessionToken, BandwidthRequest, AGGREGATION } from './bandwidth-api'
import { RootContext } from './auth-context-provider';
import { Chart, BroadcastData } from './chart';
import { BIT_TO_GIGBABIT_DIVISOR, generateDates } from './constants'
import { Form } from 'react-bootstrap';

export enum DATA_TYPES { CDN = 'cdn', P2P = 'p2p'}

export const Dashboard = () => {

    const { getAuthenticationBody } = useContext(RootContext);

    const [cdnData, setCdnData] = useState<BroadcastData>();
    const [p2pData, setP2pData] = useState<BroadcastData>();
    const [startDate, setStartDate] = useState((new Date().getDate()-15).valueOf())
    const [endDate, setEndDate] = useState(Date.now())
    const [dates, setDates] = useState<Date[]>([])
    const [cdnMax, setCdnMax] = useState();
    const [p2pMax, setP2pMax] = useState();


     useEffect(() => {
        console.log(new Date().valueOf())
        var bandwidthRequest = {session_token: getAuthenticationBody(),
             from: startDate,
             to: endDate
            }

        getBandwidthDataBySessionToken(bandwidthRequest)
        .then((response) => { 
            
            let cdcData = response[DATA_TYPES.CDN];
            let p2pData = response[DATA_TYPES.P2P]
            let cdcDataTransformed = 
                    cdcData.map((element : number[]) => convertBitsArrayToGigabitsArray(element))
            let p2pDataTransformed = 
                    p2pData.map((element : number[]) => convertBitsArrayToGigabitsArray(element))

            setCdnData(cdcDataTransformed)
            setP2pData(p2pDataTransformed)
        })

        var bandwidthRequestForMax : BandwidthRequest = {session_token: getAuthenticationBody(),
            from: startDate,
            to: endDate,
            aggregation: AGGREGATION.MAX
           }

        getBandwidthDataBySessionToken(bandwidthRequestForMax)
        .then((response) => {
            setCdnMax(response[DATA_TYPES.CDN]);
            setP2pMax(response[DATA_TYPES.P2P])
        })

        setDates(generateDates())

     }, [startDate, endDate])

    const convertBitsArrayToGigabitsArray = (bitValueArray : number[]) => {
        return [bitValueArray[0], bitValueArray[1] / BIT_TO_GIGBABIT_DIVISOR]
    }

    const handleStartDateChange = (event : any) => {
        setStartDate(event.target.value)
    }

    const handleEndDateChange = (event : any) => {
        setEndDate(event.target.value)
    }

    return (
        <div>
            <Chart dataSet1={cdnData} dataSet2={p2pData} endDate={endDate} startDate={startDate} p2pMax={p2pMax} cdnMax={cdnMax}/>
            <Form.Control as="select" onChange={(e) => handleStartDateChange(e)}>
                {dates.map((date, i) => {
                    return (
                       <option key={i} value={date.valueOf()}>{date.toDateString()}</option> 
                    )
                })}
            </Form.Control>
            <Form.Control as="select" onChange={(e) => handleEndDateChange(e)}>
                {dates.map((date, i) => {
                    return (
                       <option key={i} value={date.valueOf()}>{date.toDateString()}</option> 
                    )
                })}
            </Form.Control>
        </div>
    )
}
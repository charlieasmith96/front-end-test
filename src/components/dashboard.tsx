import React, { useState, useEffect, useContext, SyntheticEvent } from 'react'
import { getBandwidthDataBySessionToken, BandwidthRequest, AGGREGATE } from '../api/bandwidth-api'
import { RootContext } from '../authentication/auth-context-provider';
import { Chart, BroadcastData } from './chart';
import { convertBitValueToGigabitValue, generateDates, subtractDate, convertBitsArrayToGigabitsArray } from '../utils'
import { Form } from 'react-bootstrap';
import {Error} from './error';

export enum DATA_TYPES { CDN = 'cdn', P2P = 'p2p'}

export const Dashboard = () => {

    const { getAuthenticationBody } = useContext(RootContext);

    const [cdnData, setCdnData] = useState<BroadcastData>();
    const [p2pData, setP2pData] = useState<BroadcastData>();
    const [startDate, setStartDate] = useState(subtractDate(15))
    const [endDate, setEndDate] = useState(Date.now())
    const [dates, setDates] = useState<Date[]>([])
    const [cdnMax, setCdnMax] = useState<number>();
    const [p2pAndCdnMax, setP2pAndCdnMax] = useState<number>();
    const [errorMessage, setErrorMessage] = useState(null);


     useEffect(() => {
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
        }).catch((err) => { setErrorMessage(errorMessage)});

        var bandwidthRequestForMax : BandwidthRequest = {session_token: getAuthenticationBody(),
            from: startDate,
            to: endDate,
            aggregate: AGGREGATE.MAX
           }

        getBandwidthDataBySessionToken(bandwidthRequestForMax)
        .then((response) => {
            setCdnMax(convertBitValueToGigabitValue(response[DATA_TYPES.CDN]));
            setP2pAndCdnMax(convertBitValueToGigabitValue(response[DATA_TYPES.P2P] + response[DATA_TYPES.CDN]));
        }).catch((err) => { setErrorMessage(errorMessage)})

        setDates(generateDates())

     }, [startDate, endDate])

    const handleStartDateChange = (event : any) => {
        setStartDate(event.target.value)
    }

    const handleEndDateChange = (event : any) => {
        setEndDate(event.target.value)
    }

    return (
        <div>
            <h2>Bandwidth</h2>
            {!errorMessage ? <div>
            (<Chart dataSet1={cdnData} dataSet2={p2pData} 
            endDate={endDate} startDate={startDate} p2pAndCdnMax={p2pAndCdnMax} cdnMax={cdnMax}/>
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
            </div>: (<Error errorMessage={errorMessage}/>)}
        </div>
    )
}
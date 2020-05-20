import React, { useState, useEffect, useContext, SyntheticEvent } from 'react'
import { getBandwidthDataByDateWithSessionToken, BandwidthRequest, AGGREGATE } from '../api/bandwidth-api'
import { RootContext } from '../authentication/auth-context-provider';
import { Chart, BroadcastData } from './chart';
import { generateDates, subtractDate} from '../helpers/date-utils'
import {Error} from './error';
import { DropdownSelect} from './dropdown-select'
import { Header } from '../components/header'
import { LegendItem } from './legend-item'
import { processBandwidthData, convertBitValueToGigabitValue } from '../helpers/bandwidth-data-processor';

import './dashboard.css'
import { UNEXPECTED_ERROR_STRING, UNAUTHORISED_ERROR_STRING } from './error-string-constants';

export enum DATA_TYPES { CDN = 'cdn', P2P = 'p2p'}

export const Dashboard = () => {

    const { getAuthenticationBody } = useContext(RootContext);

    const [cdnData, setCdnData] = useState<BroadcastData>();
    const [p2pData, setP2pData] = useState<BroadcastData>();
    const [startDate, setStartDate] = useState(subtractDate(5))
    const [endDate, setEndDate] = useState(Date.now())
    const [dates, setDates] = useState<Date[]>([])
    const [cdnMax, setCdnMax] = useState<number>();
    const [p2pAndCdnMax, setP2pAndCdnMax] = useState<number>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


     useEffect(() => {
        var bandwidthRequest = 
        {session_token: getAuthenticationBody(),
             from: startDate,
             to: endDate
            }

        getBandwidthDataByDateWithSessionToken(bandwidthRequest)
        .then((response) => { 
            let processedData = processBandwidthData(response);
            
            setCdnData(processedData[0])
            setP2pData(processedData[1])
        }).catch((err : any) => { 
            if (err.status === 403) {
                setErrorMessage(UNAUTHORISED_ERROR_STRING);
            } else {
                setErrorMessage(UNEXPECTED_ERROR_STRING);
            }
        })

        var bandwidthRequestForMax : BandwidthRequest = {session_token: getAuthenticationBody(),
            from: startDate,
            to: endDate,
            aggregate: AGGREGATE.MAX
           }

        getBandwidthDataByDateWithSessionToken(bandwidthRequestForMax)
        .then((response) => {
            setCdnMax(convertBitValueToGigabitValue(response[DATA_TYPES.CDN]));
            setP2pAndCdnMax(convertBitValueToGigabitValue(response[DATA_TYPES.P2P] + response[DATA_TYPES.CDN]));
        }).catch((err : any) => { 
            if (err.status === 403) {
                setErrorMessage(UNAUTHORISED_ERROR_STRING);
            } else {
                setErrorMessage(UNEXPECTED_ERROR_STRING);
            }
        })
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
            <Header/>
            {!errorMessage ? <div>
            <div className='chart-container'>
                <h2>Bandwidth</h2>
               <LegendItem label="P2P" colour="blue"/>
               <LegendItem label="CDN" colour="pink"/>
               <LegendItem label={`Maximum CDN + P2P: ${p2pAndCdnMax} Gbp/s`} colour="green"/>
               <LegendItem label={`Maximum CDN: ${cdnMax} Gbp/s`} colour="red"/>
                <p className="axis-label">Gbp/s</p>
                <Chart dataSet1={cdnData} dataSet2={p2pData} 
                endDate={endDate} startDate={startDate} p2pAndCdnMax={p2pAndCdnMax} cdnMax={cdnMax}/>
                <div className={"dropdown-container"}>
                    <DropdownSelect dates={dates} onChangeHandler={handleStartDateChange} selectedIndex={5}/>
                    <DropdownSelect dates={dates} onChangeHandler={handleEndDateChange} selectedIndex={0}/>
                </div>
            </div>
            </div>: (<Error className="dashboard-error" errorMessage={errorMessage}/>)}
        </div>
    )
}
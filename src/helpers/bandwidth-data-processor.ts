import { DATA_TYPES } from "../components/dashboard";

export const BIT_TO_GIGBABIT_DIVISOR = 1000000000;

interface RawData {
    cdn: number[][],
    p2p: number[][]
}

export const processBandwidthData = (data : RawData) : number[][][] => {

    let cdnData = data[DATA_TYPES.CDN];
    let p2pData = data[DATA_TYPES.P2P];

    let cdnDataTransformed = 
            cdnData.map((element : number[]) => convertBitsArrayToGigabitsArray(element))

    let p2pDataTransformed = 
            p2pData.map((element : number[]) => convertBitsArrayToGigabitsArray(element))

    return [cdnDataTransformed, p2pDataTransformed];
}

export const convertBitsArrayToGigabitsArray = (bitValueArray : number[]) : number[] => {
    return [bitValueArray[0], convertBitValueToGigabitValue(bitValueArray[1])]
}

export const convertBitValueToGigabitValue = (bitValue: number) : number => {
    return Number(((bitValue / BIT_TO_GIGBABIT_DIVISOR)).toPrecision(4));
}
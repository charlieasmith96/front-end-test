import { convertBitsArrayToGigabitsArray, convertBitValueToGigabitValue, processBandwidthData } from "../bandwidth-data-processor"


it('should convert bits array to gigabits array', () => {
    const result = convertBitsArrayToGigabitsArray([1000000000, 1000000000])

    expect(result).toEqual([1000000000, 1])
})
it('should convert bit value to gigabit value', () => {
    const result = convertBitValueToGigabitValue(1000000000);

    expect(result).toEqual(1);
})

it('should convert bit value to gigabit value with rounding', () => {
    const result = convertBitValueToGigabitValue(1100204001092);

    expect(result).toEqual(1100)
})

it('should convert bit value to gigabit value with rounding scenario 2', () => {
    const result = convertBitValueToGigabitValue(1100204001);

    expect(result).toEqual(1.1)
})

it('should convert unprocessed data to processed data', () => {
    const data = {"p2p": [[1000000000,30000000000], [30000000000,500000000000], [40000000000,5000000000000]],
     "cdn": [[300000000000,2000000000000], [400000000000,1000000000000], [30000000000000,80000000000000]]}

    const result = processBandwidthData(data);

    expect(result).toEqual([
        [
          [ 300000000000, 2000 ],
          [ 400000000000, 1000 ],
          [ 30000000000000, 80000 ]
        ],
        [ [ 1000000000, 30 ], [ 30000000000, 500 ], [ 40000000000, 5000 ] ]
      ])
})
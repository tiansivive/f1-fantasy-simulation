import fp from 'lodash/fp.js'

import { pace, drivers, driverToTeamMap } from '../data/data.js'

const driverList = drivers.map(d => d.id)
const maxPossiblePace = Math.max(...fp.values(pace.constructors)) + Math.max(...fp.values(pace.drivers))
const normalize = value => value / maxPossiblePace 
export const generate = () => driverList
    .slice()
    .sort((d1, d2) => {
        const d1Pace = normalize(pace.drivers[d1] + pace.constructors[driverToTeamMap[d1]])
        const d2Pace = normalize(pace.drivers[d2] + pace.constructors[driverToTeamMap[d2]])
        const threshold = 0.8
        const posChange = Math.random() > threshold + Math.abs(d1Pace - d2Pace)*(1-threshold)

        if(d1Pace < d2Pace) return posChange ? 1 : -1      
        if(d1Pace > d2Pace) return posChange ? -1 : 1
        if(d1Pace === d2Pace) return Math.random() > 0.5 ? 1 : -1
    })



export const getAverageFor = iterations => {
    const possibilities = fp.range(0, iterations).map(generate)
    return fp.orderBy(([, avg]) => avg)('asc')(driverList.map(driver => [
        driver,
        possibilities.reduce((sum, grid) => sum + grid.findIndex(d => d === driver), 0) / iterations
    ]))
    
}
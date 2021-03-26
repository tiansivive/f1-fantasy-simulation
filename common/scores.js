

import fp from 'lodash/fp.js'
import { points, driverToTeamMap } from '../data/data.js'
import { calculatePrice } from './selections.js'


const byConstructor = ([driver]) => driverToTeamMap[driver]

const prepareDriverPoints = fp.map(driver => [driver, 0])

const awardPoints = points => fp.pipe(
    prepareDriverPoints,
    fp.zipWith(
        (points = 0, [driver, currentScore = 0]) => [driver, currentScore + points]
    )(points)
)

const awardRacePoints = awardPoints(points.race) 
const awardQualiPoints = awardPoints(points.quali) 

export const qualiBonus = position => 
    position < 11 
        ? 3
        : position < 16
            ? 2
            : 1

export const positionChangeBonus = (racePos, qualiPositions, driver) => {
    const qualiPos = qualiPositions.findIndex(d => d === driver)
    const placesGained = Math.min(5, qualiPos - racePos)

    if(placesGained > 0) return placesGained * 2
    if(placesGained === 0) return 0

    // lost places, penalty bonus is doubled if starting inside top 10
    return qualiPos < 11 ? placesGained * 2 : placesGained
}           

export const raceCompletionBonus = () => 1

const awardMultipliers = (TD, MD) => fp.map(([ driver, points]) => 
    TD === driver
        ? [ driver, points * 2 ] 
        : [driver, points]
)

export const getScores = (TD, MD) => positions => {

    const qualiPoints =  awardQualiPoints(positions.quali).map(([driver, score], i) => [driver, score + qualiBonus(i)])
    const racePoints =  awardRacePoints(positions.race).map(([driver, score], i) => [driver, score + raceCompletionBonus() + positionChangeBonus(i, positions.quali, driver)])
    
    const driverTotals = racePoints.map(([ driver, score ]) => [driver, score + qualiPoints.find(([d]) => d === driver)[1] ])
    const constructorTotals = fp.pipe(
        fp.groupBy(byConstructor),
        fp.mapValues(([[, points1], [, points2]]) => points1 + points2 ),
        fp.toPairs
    )(driverTotals)

    
    return {
        drivers: awardMultipliers(TD)(driverTotals),
        constructors: constructorTotals
    }
}


export const calculateTeamScores = scores => fp.map(team => ({
    team,
    cost: calculatePrice(team),
    points: team.reduce((sum, { id }) => {
        const [, score] = scores.drivers.find(([d]) => d === id ) || scores.constructors.find(([c]) => c === id)
        return sum + score
     }, 0)
}))

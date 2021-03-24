
import fp from 'lodash/fp.js'
import { points } from './data/data.js'


const assignInitialPoints = fp.map(driver => [driver, 0])

const awardPoints = fp.zipWith(
    (points = 0, [driver, currentScore = 0]) => [driver, currentScore + points]
)

const awardRacePoints = awardPoints(points.racePosition) 
const awardQualiPoints = awardPoints(points.QualiPosition) 

const awardMultipliers = (TD, MD) => fp.map(([ driver, points]) => 
    TD === driver.id 
        ? [ driver, points * 2 ] 
        : [driver, points]
)

export const getScores = (TD, MD) => fp.pipe(
    assignInitialPoints,
    awardQualiPoints,
    awardRacePoints,
    awardMultipliers(TD, MD)
)
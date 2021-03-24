import chalk from 'chalk'
import fp from 'lodash/fp.js'
import { drivers } from './data/data.js'
import { getScores } from "./scores.js"



const positions = [
    'HAM', 'BOT', 
    'VER', 'PER', 
    'RIC', 'NOR', 
    'LEC', 'SAI',
    'VET', 'STR', 
    'ALO', 'OCO', 
    'GAS', 'TSU', 
    'RAI', 'GIO', 
    'RUS', 'LAT', 
    'MSC', 'MAZ'
]

const TD = 'PER'



fp.pipe(
    fp.map(driverCode => drivers.find(({ id }) => id === driverCode)),
    getScores(TD),
    fp.each(([driver, score]) => console.log(
        chalk.yellow(driver.id), ':', chalk.green(score))
    )
)(positions)





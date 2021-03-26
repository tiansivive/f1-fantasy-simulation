import chalk from 'chalk'
import fp from 'lodash/fp.js'

import { getScores, calculateTeamScores } from "./common/scores.js"
import { getPossibleTeams, } from './common/selections.js'


const positions = {
    race:  [
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
        ],
    quali: [
        'HAM', 'BOT', 
        'VER', 'PER', 
        'SAI', 'VET', 
        'ALO', 'RIC',
        'NOR', 'STR', 
        'LEC', 'OCO', 
        'GAS', 'TSU', 
        'RAI', 'GIO', 
        'MSC', 'LAT', 
        'MAZ', 'RUS'
    ]
}


const TD = 'PER';



(_ => {
    const scores = getScores(TD)(positions)
    const teams = getPossibleTeams(100)
    const teamScores = calculateTeamScores(scores)(teams)

    fp.pipe(
        fp.orderBy('points')('desc'),
        fp.slice(0)(10),
        fp.each((ts, i) => {
            console.log(`----------- TEAM ${i + 1} ----------- `)
            console.log('Points:', ts.points)
            console.log('Cost:', ts.cost)
            console.log('Team:', ts.team.map(fp.get('id')))
        })
    )(teamScores)
})()






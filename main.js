import chalk from 'chalk'
import fp from 'lodash/fp.js'

import { getScores, calculateTeamScores } from "./common/scores.js"
import { getPossibleTeams, } from './common/selections.js'
import { generate} from './common/positions.js'



(_ => {


    const options = process.argv
        .filter(arg => arg.startsWith('--'))
        .map(arg => arg.slice(2).split('='))
        .reduce((config, [arg, val]) => ({
            ...config, 
            [arg]: Number.isNaN(parseFloat(val)) ? val : parseFloat(val)
    }), {})

    console.log('Options:', options)

    const { TD, budget = 100, iterations = 100 } = options
    const teams = getPossibleTeams(budget)
    const calculateScores = getScores(TD)
    const quali = fp.range(0, iterations).map(generate)
    const race = fp.range(0, iterations).map(generate)
    const scores = fp.zipWith(
        (quali, race) => fp.pipe(
            calculateTeamScores(calculateScores({ race, quali }), { race, quali } ),
            fp.orderBy('points')('desc'),
            fp.slice(0, 100)
        )(teams)
    )(quali)(race)

 
    const final = fp.pipe(
        fp.flatten,
        fp.groupBy('id'),
        fp.mapValues(group => ({
            id: group[0].id,
            team: group[0].team,
            cost: group[0].cost,
            averagePoints: group.reduce((sum, t) => sum + t.points, 0) / group.length,
            frequency: group.length,
            points: group.map(t => [t.points, t.grid]),
        })),
        fp.values,
        fp.filter(team => team.frequency > 5)
    )(scores)

    
    const top10MostFrequent = fp.pipe(
        fp.orderBy('frequency')('desc'),
        fp.slice(0,10)
    )(final)
    const top10BestScoring = fp.pipe(
        fp.orderBy('averagePoints')('desc'),
        fp.slice(0,10)
    )(final)


    const log = ts => {
        console.log(`----------- TEAM ${ts.id} ----------- `)
        console.log('Team:', ts.team.map(fp.get('id')))
        console.log('Frequency:', ts.frequency)
        console.log('Average points:', ts.averagePoints)
        console.log('Cost:', ts.cost)
        // console.log('All scores:\n')
        // ts.points.forEach(([score, grid]) => {
        //     console.log('  [', chalk.yellow(score),
        //     '\n    race:', grid.race.map(d => chalk.green(`"${d}"`)).join(', '), 
        //     '\n    quali:', grid.quali.map(d => chalk.green(`"${d}"`)).join(', '),
        //     '\n  ]')
        // })
    }
    console.log('\n ----- Best average scoring teams ----- \n')
    top10BestScoring.forEach(log)
    console.log('\n\n\n ----- Most frequent teams ----- \n')
    top10MostFrequent.forEach(log)
    
 
})()







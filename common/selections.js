import { drivers, constructors, prices } from '../data/data.js'
import fp from 'lodash/fp.js'


const TEAM_SIZE = 5
export const calculatePrice = fp.reduce((sum, { id }) => sum + prices[id])(0)

const calculateDriverCombos = (combinations = [], i) => {

    
    if(i < 0) return combinations;

    const combination = fp.last(combinations)
    const index =  drivers.findIndex(({ id }) => id === combination[i].id)

    if(index < drivers.length - TEAM_SIZE + i){
        const newCombination = [
            ...combination.slice(0, i), 
            ...drivers.slice(index + 1, index + 1 + TEAM_SIZE - i)
        ]
        return calculateDriverCombos([...combinations, newCombination], i === TEAM_SIZE -1 ? i : i +1 )
    }
    return calculateDriverCombos(combinations, i - 1)
}

const combos = calculateDriverCombos([ drivers.slice(0, TEAM_SIZE) ], TEAM_SIZE -1)
export const getPossibleTeams = budget => fp.pipe(
    fp.flatMap(team => constructors.map(c => [...team, c])),
    fp.filter(team => calculatePrice(team) <= budget)
)(combos)


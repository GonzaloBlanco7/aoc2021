const input = require('fs').readFileSync('input', 'utf-8').split(",").map(Number)

function testA() {
    //Reorganize input as distribution
    let values_count = Math.max(...input)+1;
    let distribution = Array(values_count).fill(0);
    for (let pos of input) {
        distribution[pos]++
    }

    //Calc cost for each result
    let cost = Array(values_count).fill(0);
    for (let i in cost) {
        cost[i] = distribution.reduce((acc, pos_count, pos) => {
            return acc + (Math.abs(pos-i) * pos_count)
        }, 0)
    }
    
    //Get cheapest result
    return Math.min(...cost)
}

function testB() {
    //Reorganize input as distribution
    let values_count = Math.max(...input)+1;
    let distribution = Array(values_count).fill(0);
    for (let pos of input) {
        distribution[pos]++
    }

    //Calc cost for each result
    let cost = Array(values_count).fill(0);
    for (let i in cost) {
        cost[i] = distribution.reduce((acc, pos_count, pos) => {
            return acc + (getMoveCostB(pos,i)* pos_count)
        }, 0)
    }
    
    //Get cheapest result
    return Math.min(...cost)
}

function getMoveCostB(pos1, pos2) {
    let distance = Math.abs(pos1-pos2)
    let cost = 0
    for (let i = 1; i <= distance; i++) {
        cost += i
    }
    return cost
}


console.log("A: "+testA())
console.log("B: "+testB())



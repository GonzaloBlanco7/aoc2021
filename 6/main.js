const input = require('fs').readFileSync('input', 'utf-8').split(",").map(Number)

function testA() {
    let list = [...input] //copy by value (NOT BY REFERENCE)

    for (let day=1; day<=80; day++) {
        for (i in list) {
            let fish = list[i]
            if (fish == 0) {
                list[i] = 6
                list.push(8)
            } else {
                list[i]--
            }
        }
    }

    return list.length
}

//Same as A but more memory efficient
function testB() {

    //Reorganize input as distribution
    let distribution = Array(9).fill(0)
    for (let fish of input) {
        distribution[fish]++
    }

    for (let day=1; day<=256; day++) {
        let day_variation = Array(9).fill(0)
        
        //calculate day variations
        for (value in distribution) {
            let count = distribution[value]
            day_variation[value] -= count
            
            if (value == 0) {
                day_variation[6] += count
                day_variation[8] += count
            } else [
                day_variation[value-1] += count
            ]
        }
        distribution = distribution.map((val, index) => val+day_variation[index]) //apply day variations
    }

    return distribution.reduce((acc, count) => acc+count, 0);
}


console.log("A: "+testA())
console.log("B: "+testB())



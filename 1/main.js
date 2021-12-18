const input = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)
let data = input.map(Number)

function testA() {
    let result = 0;
    for (let i=0; i<data.length; i++) {
        if (i == 0) { continue }

        let now = data[i]
        let before = data[i-1]

        if (now > before) {
            result++
        }
    }
    return result
}

function testB() {
    let new_data = []
    for (let i=0; i<data.length; i++) {
        new_data.push(data[i]+data[i+1]+data[i+2])
    }

    let result = 0;
    for (let i=0; i<new_data.length; i++) {
        if (i == 0) { continue }

        let now = new_data[i]
        let before = new_data[i-1]

        if (now > before) {
            result++
        }
    }
    return result
}

console.log("A: "+testA())
console.log("B: "+testB())
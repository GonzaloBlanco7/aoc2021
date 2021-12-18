const input = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)

let data = input.map(row => row.split(" "))

function testA() {
    let x = 0
    let y = 0

    data.forEach(function(row) {
        let [dir, count] = row
        count = Number(count)

        switch (dir) {
            case 'forward':
                x += count
                break;
            case 'down':
                y += count
                break;
            case 'up':
                y -= count
                break;
        }
    })
    return x*y
}

function testB() {
    let aim = 0
    let x = 0
    let y = 0

    data.forEach(function(row) {
        let [dir, count] = row
        count = Number(count)
        
        switch (dir) {
            case 'forward':
                x += count
                y += aim*count
                break;
            case 'down':
                aim += count
                break;
            case 'up':
                aim -= count
                break;
        }
    })
    return x*y
}

console.log("A: "+testA())
console.log("B: "+testB())



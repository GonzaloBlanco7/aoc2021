const input = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)

const map = input.map(row => {
    return row.split('').map(Number)
})
//Already 2D map (Array)

function testA() {
    let sum = 0
    for (let y = 0; y < map.length; y++) {
        const row = map[y];
        for (let x = 0; x < row.length; x++) {
            const item = row[x];

            if (y>0) {
                //Check up
                if (map[y-1][x] <= item) {
                    continue
                }
            }
            if (y<map.length-1) {
                //Check down
                if (map[y+1][x] <= item) {
                    continue
                }
            }
            if (x>0) {
                //Check left
                if (map[y][x-1] <= item) {
                    continue
                }
            }
            if (x<row.length-1) {
                //Check right
                if (map[y][x+1] <= item) {
                    continue
                }
            }
            sum += 1+item
        }
    }
    return sum
}

function testB() {
    let basins = []

    for (let y = 0; y < map.length; y++) {
        const row = map[y];
        for (let x = 0; x < row.length; x++) {
            const item = row[x];

            if (y>0) {
                //Check up
                if (map[y-1][x] <= item) {
                    continue
                }
            }
            if (y<map.length-1) {
                //Check down
                if (map[y+1][x] <= item) {
                    continue
                }
            }
            if (x>0) {
                //Check left
                if (map[y][x-1] <= item) {
                    continue
                }
            }
            if (x<row.length-1) {
                //Check right
                if (map[y][x+1] <= item) {
                    continue
                }
            }
            basins.push(getBasin(map, x, y))
        }
    }
    
    console.log(basins)
}

function getBasin(map, x, y) {
    
}


//console.log("A: "+testA())
console.log("B: "+testB())



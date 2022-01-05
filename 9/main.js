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

            let basin = getBasin(map, x, y)
            //Get unique points in basin
            basin = [...new Set(basin)]
            basins.push(basin.length)
        }
    }
    
    basins = basins.sort((a, b) => b-a)
    return basins[0] * basins[1] * basins[2]
}

function getBasin(map, x, y) {
    let points = [`${y},${x}`]
    const item = map[y][x]

    //UP
    if (y>0) {
        if ((map[y-1][x] > item) && (map[y-1][x] != 9)) {
            points = points.concat(getBasin(map, x, y-1))
        }
    }
    //DOWN
    if (y<map.length-1) {
        if ((map[y+1][x] > item) && (map[y+1][x] != 9)) {
            points = points.concat(getBasin(map, x, y+1))
        }
    }
    //LEFT
    if (x>0) {
        if ((map[y][x-1] > item) && (map[y][x-1] != 9)) {
            points = points.concat(getBasin(map, x-1, y))
        }
    }
    //RIGHT
    if (x<map[0].length-1) {
        if ((map[y][x+1] > item) && (map[y][x+1] != 9)) {
            points = points.concat(getBasin(map, x+1, y))
        }
    }
    return points
}


console.log("A: "+testA())
console.log("B: "+testB())



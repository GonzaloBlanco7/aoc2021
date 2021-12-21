const input = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)
const rows = input.map(row => row.split("->"))

//Parse input
let data = Array()
for (row of rows) {
    let start = row[0].split(",").map(Number)
    let end = row[1].split(",").map(Number)
    row_data = [start, end]
    data.push(row_data)
}

//Get matrix size
let x_size = 0
let y_size = 0
for (row of data) {
    for (measure of row) {
        x_size = Math.max(measure[0], x_size)
        y_size = Math.max(measure[1], y_size)
    }
}
x_size +++ //both are indexes
y_size +++ //both are indexes
console.log(`Matrix size: ${x_size} x ${y_size}`)


function testA() {
    //Create Matrix (filled with zeros)
    let matrix = Array(y_size)
    for (let i=0; i<y_size; i++) {
        matrix[i] = Array(x_size)
        for (let j=0; j<x_size; j++) {
            matrix[i][j] = 0
        }
    }

    for (let row of data) {
        let x_affected = Array()
        let y_affected = Array()
        //X axis
        let x_distance = Math.abs(row[0][0] - row[1][0])
        let x_start = Math.min(row[0][0], row[1][0])
        for (let i=x_start; i<=(x_start+x_distance); i++) {
            x_affected.push(i)
        }
        //Y axis
        let y_distance = Math.abs(row[0][1] - row[1][1])
        let y_start = Math.min(row[0][1], row[1][1])
        for (let i=y_start; i<=(y_start+y_distance); i++) {
            y_affected.push(i)
        }

        //Add to matrix
        //Due to only vertical or horizontal
        if (x_affected.length == 1) {
            //Vertical (fill y axis)
            for (y of y_affected) {
                matrix[y][x_start]++
            }
        } else if (y_affected.length == 1) {
            //Horizontal (fill x axis)
            for (x of x_affected) {
                matrix[y_start][x]++
            }
        }
    }

    //result
    let count = 0
    for (row of matrix) {
        for (value of row) {
            if (value >= 2) {
                count ++
            }
        }
    }
    return count
}

function testB() {
    //Create Matrix (filled with zeros)
    let matrix = Array(y_size)
    for (let i = 0; i < y_size; i++) {
        matrix[i] = Array(x_size)
        for (let j = 0; j < x_size; j++) {
            matrix[i][j] = 0
        }
    }

    for (let row of data) {
        let x_affected = Array()
        let y_affected = Array()

        //X axis
        let x_distance = Math.abs(row[0][0] - row[1][0])
        let x_start = Math.min(row[0][0], row[1][0])
        for (let i = x_start; i <= (x_start + x_distance); i++) {
            x_affected.push(i)
        }
        if (row[0][0] < row[1][0]) {
            x_affected.reverse()
        }

        //Y axis
        let y_distance = Math.abs(row[0][1] - row[1][1])
        let y_start = Math.min(row[0][1], row[1][1])
        for (let i = y_start; i <= (y_start + y_distance); i++) {
            y_affected.push(i)
        }
        if (row[0][1] < row[1][1]) {
            y_affected.reverse()
        }

        //Add to matrix
        if (x_affected.length == 1) {
            //Vertical (fill y axis)
            for (y of y_affected) {
                matrix[y][x_start]++
            }
        } else if (y_affected.length == 1) {
            //Horizontal (fill x axis)
            for (x of x_affected) {
                matrix[y_start][x]++
            }
        } else if (x_affected.length == y_affected.length) {
            //Diagonal
            for (let i in y_affected) {
                matrix[y_affected[i]][x_affected[i]]++
            }
        }
        
    }

    //result
    let count = 0
    for (row of matrix) {
        for (value of row) {
            if (value >= 2) {
                count++
            }
        }
    }
    return count
}


console.log("A: "+testA())
console.log("B: "+testB())



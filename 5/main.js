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
console.log(`Matrix size: ${x_size} x ${y_size}`)


function testA() {
    //Create Matrix (filled with zeros)
    let matrix_row = Array(x_size).fill(0)
    let matrix = Array(y_size).fill(matrix_row)
    console.log(matrix)
    
    for (row of data) {
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
        console.log(x_affected)
        console.log(y_affected)
        //Add to matrix
        //Due to only vertical or horizontal
        if (x_distance == 0) {
            //Vertical (fill y axis)
            for (affected of y_affected) {
                matrix.map((row, index) => {
                    if (y_affected.includes(index)) {
                        row[affected]++
                    }
                })
            }
        } else {
            //Horizontal (fill x axis)
            for (affected of x_affected) {
                matrix[y_start][affected]++
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
    
}


console.log("A: "+testA())
//console.log("B: "+testB())



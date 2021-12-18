const input = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)
let data = input.map(row => row.split(""))

function transpose(matrix) {
    let rows = matrix.length
    let cols = matrix[0].length
    let new_matrix = Array()

    //Template
    for (let i=0; i<cols; i++) {
        new_matrix[i] = Array(rows)
    }

    //Fill data
    for (let row=0; row<rows; row++) {
        for(let col=0; col<cols; col++) {
            new_matrix[col][row] = matrix[row][col]
        }
    }

    return new_matrix
}

function testA() {
    let matrix = transpose(data)
    let gamma = '' //most common
    let epsilon = '' //least common

    matrix.forEach(function(row) {
        let zeros = 0
        let ones = 0
        for (let i=0; i<row.length; i++) {
            if (row[i] == 0) {
                zeros++
            } else {
                ones++
            }
        }
        gamma += (zeros > ones)? '0' : '1' //most common
        epsilon += (zeros < ones)? '0' : '1' //least common
    })

    //Binary to decimal
    gamma = parseInt(gamma, 2)
    epsilon = parseInt(epsilon, 2)
    
    return gamma*epsilon
}


function testB() {
    let oxigen = data
    let co2 = data
    let i = 0
    
    //OXIGEN
    do {
        oxigen = getByCriteria(oxigen, 'oxigen', i)
        i++
    } while(oxigen.length > 1)
    oxigen = oxigen[0].join("")
    //console.log(oxigen)

    //co2
    i = 0
    do {
        co2 = getByCriteria(co2, 'co2', i)
        i++
    } while(co2.length > 1)
    co2 = co2[0].join("")
    //console.log(co2)
    
    //Binary to decimal
    oxigen = parseInt(oxigen, 2)
    co2 = parseInt(co2, 2)
    
    return oxigen*co2
    
}


/* Type:
    'oxigen' => most common
    'co2' => least common
*/
function getByCriteria(tmp, type, count) {
    let filter = undefined;
    
    //count 0s and 1s
    let zeros = 0;
    let ones = 0;
    let criteria_col = tmp.map((row => row[count]))
    for (criteria_val of criteria_col) {
        if (criteria_val == 0) {
            zeros++
        } else {
            ones++
        }
    }

    if (type == 'oxigen') {
        //most common
        //1 if equal
        filter = (ones >= zeros) ? 1 : 0
    }
    if (type == 'co2') {
        //least common
        //0 if equal
        filter = (zeros <= ones) ? 0 : 1
    }

    return tmp.filter((row) => row[count] == filter)
}

console.log("A: "+testA())
console.log("B: "+testB())



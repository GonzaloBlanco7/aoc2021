const input = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)

//get random number list
const number_list = input[0].split(",").map(Number)

//Boards
const raw_boards = input.slice(2)
let boards = []
let n_board = 0
for (row of raw_boards) {
    if (row == '') {
        n_board++
    } else {
        if ( !Array.isArray(boards[n_board]) ) {
            boards[n_board] = Array()
        }

        let formated_row = row.split(" ").map(Number).filter(val => val !== 0)
        boards[n_board].push(formated_row)
    }
}

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
    let extracted_nums = new Set()

    //Each number extracted
    for (num of number_list) {
        extracted_nums.add(num)
        //Each player board
        for (board of boards) {
            //Each row of this board
            for (row of board) {
                let full_row = row.reduce(
                    (accumulator, val) => accumulator &= extracted_nums.has(val)
                , true)
                
                if (full_row) {
                    //WIN
                    return calcWin(extracted_nums, board, num)
                }
            }

            //Each col of this board
            for (col of transpose(board)) {
                let full_col = col.reduce(
                    (accumulator, val) => accumulator &= extracted_nums.has(val)
                , true)

                if (full_col) {
                    //WIN
                    return calcWin(extracted_nums, board, num)
                }
            }
        } 
    }
}


function calcWin(num_list, board, last_num) {
    let accum = 0;

    for (row of board) {
        for (val of row) {
            if ( !num_list.has(val) ) {
                accum += val
            }
        }
    }

    return accum*last_num
}


function testB() {
    let extracted_nums = new Set()
    let winner_values = Object()
    let winners_order = Array()

    //Each number extracted
    for (num of number_list) {
        extracted_nums.add(num)
        //Each player board
        for (board_index in boards) {
            let board = boards[board_index]

            //Each row of this board
            for (row of board) {
                let full_row = row.reduce(
                    (accumulator, val) => accumulator &= extracted_nums.has(val)
                , true)
                
                if (full_row) {
                    //WIN
                    if (!winner_values.hasOwnProperty(board_index)) {
                        winner_values[board_index] = calcWin(extracted_nums, board, num)
                        winners_order.push(board_index)
                    }
                }
            }

            //Each col of this board
            for (col of transpose(board)) {
                let full_col = col.reduce(
                    (accumulator, val) => accumulator &= extracted_nums.has(val)
                , true)

                if (full_col) {
                    //WIN
                    if (!winner_values.hasOwnProperty(board_index)) {
                        winner_values[board_index] = calcWin(extracted_nums, board, num)
                        winners_order.push(board_index)
                    }
                }
            }

            if (winner_values.length == boards.length) {
                break
            }
        } 
    }

    let last_winner = winners_order.pop()
    return winner_values[last_winner]
}


console.log("A: "+testA())
console.log("B: "+testB())



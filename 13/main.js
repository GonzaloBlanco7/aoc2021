const input = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)

const split_input_index = input.indexOf('')
const input_points = input.slice(0, split_input_index).map(row => row.split(',').map(Number))
const input_instructions =  input.slice(split_input_index+1).map(line => line.split(' ')[2])


function fold(instruction, input) {
    const [instruction_direction, instruction_value] = instruction.split('=')

    let folded_points = input.map(point => {
        let modify_index = (instruction_direction == 'x')
            ? 0 //Fold line vertical -> Modify horizontal (x)
            : 1 //Fold line horizontal -> Modify vertical (y)

        if (point[modify_index] > instruction_value) {
            //fold it
            const distance_to_fold_line = point[modify_index] - instruction_value
            const new_coord = instruction_value - distance_to_fold_line
            if (modify_index == 0) {
                return [new_coord, point[1]]
            } else {
                return [point[0], new_coord]
            }
        } 
        
        if (point[modify_index] == instruction_value) {
            //fold line over point -> delete it
            return false
        }

        return point
    })
    
    //delete empty points
    folded_points = folded_points.filter(point => point !== false)

    //delete duplicateds
    folded_points = Array.from(new Set(folded_points.map(JSON.stringify)), JSON.parse)

    return folded_points 
}


function draw(points) {
    let width = points.reduce((max_w, p) => Math.max(max_w, p[0]), 0)+1
    let heigth = points.reduce((max_h, p) => Math.max(max_h, p[1]), 0)+1

    let output = []
    for (let h = 0; h<heigth; h++) {
        output[h] = []

        for (let w = 0; w<width; w++) {
            output[h][w] = ' '
        }
    }

    for (let p of points) {
        output[p[1]][p[0]] = 'X'
    }

    let drawing = ''
    for (let y in output) {
        for (let x in output[y]) {
            drawing += output[y][x]
        }
        drawing += "\n"
    }

    console.log(drawing)
}


function testA() {
    return fold(input_instructions[0], input_points).length
}
  

function testB() {
    let input = input_points

    for (let inst of input_instructions) {
        input = fold(inst, input)
    }

    draw(input)
    return
}


console.log("A: "+testA())
console.log("B: "+testB())



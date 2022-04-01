const input = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)

const map = input.map(row => {
    return row.split('');
})
//Already 2D map (Array)

const open = ['(', '[', '{', '<'];
const close = [')', ']', '}', '>'];

function testA() {
    const puntuation = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    }
    let score = 0
    
    //each line
    map.forEach((line, index) => {
        try {
            let stack = [];
            line.forEach((item) => {

                if (open.includes(item)) {
                    stack.push(item)
                }

                if (close.includes(item)) {
                    let last_item = stack.pop(item)

                    let open_index = open.indexOf(last_item)
                    let close_index = close.indexOf(item)

                    if (open_index != close_index) {
                        score += puntuation[item]
                        throw new Error('corrupt line')
                    }
                }
            })
        } catch (error) { /* pass */ }
        
    }) //each line
    return score
}
  

function testB() {
    const puntuation = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    }
    let all_scores = []

    //each line
    map.forEach((line, index) => {
        try {
            let stack = [];
            let score = 0

            line.forEach((item) => {

                if (open.includes(item)) {
                    stack.push(item)
                }
                
                if (close.includes(item)) {
                    let last_item = stack.pop(item)

                    let open_index = open.indexOf(last_item)
                    let close_index = close.indexOf(item)

                    if (open_index != close_index) {
                        throw new Error('corrupt line')
                    }
                }
            })

            //line incomplete
            if (stack.length > 0) {
                let reverse_stack = stack.reverse()
                
                reverse_stack.forEach(open_item => {
                    const close_item = close[open.indexOf(open_item)]
                    score = (score*5) + puntuation[close_item];
                })
                all_scores.push(score)
            }
            
        } catch (error) { /* pass */ }
    }) //each line

    //order scores and find the one in the middle
    all_scores.sort((a, b) => {
        return a-b
    })
    return all_scores[Math.ceil(all_scores.length  / 2) - 1]
}


console.log("A: "+testA())
console.log("B: "+testB())



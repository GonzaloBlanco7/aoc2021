const input = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)


let decoded_input = input.map((row) => {
    let [input1, input2] = row.split('|')
    input1 = input1.trim().split(" ")
    input2 = input2.trim().split(" ")
    return [input1, input2]
})
console.log(decoded_input)

function testA() {
   
}

function testB() {
   
}



console.log("A: "+testA())
//console.log("B: "+testB())



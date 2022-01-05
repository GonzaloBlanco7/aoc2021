const input = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)
const num_segments = [
    'abcefg',
    'cf',
    'acdeg',
    'acdfg',
    'bcdf',
    'abdfg',
    'abdefg',
    'acf',
    'abcdefg',
    'abcdfg'
]


let decoded_input = input.map((row) => {
    let [input1, input2] = row.split('|')
    input1 = input1.trim().split(" ")
    input2 = input2.trim().split(" ")
    return [input1, input2]
})
//console.log(decoded_input)


function testA() {
    let count = 0; // 1s, 4s, 7s and 8s
    for (row of decoded_input) {
        let [input1, input2] = row
        for (segments of input2) {
            let num = decodeByLength(segments.length)

            if (num != undefined) {
                count++
            }
        }
    }
    return count
}

function testB() {
    let sum = 0;
    for (row of decoded_input) {
        let [input1, input2] = row

        // ----------------------- DECODE -----------------------
        //Segments c and f (finding number 1)
        let segments_c_f = input1.find(item => item.length==2)
        //console.log('Seg C/F:', segments_c_f)
        
        //Segment a (finding number 7)
        let segment_a = input1.find(item => item.length==3)
        segment_a = segment_a.replace(segments_c_f[0], '').replace(segments_c_f[1], '')
        //console.log('Seg A:', segment_a)
        
        //Segments d and g (finding number 3)
        let segments_d_g = input1.find(item => {
            let has_c_and_f = item.includes(segments_c_f[0]) && item.includes(segments_c_f[1])
            return (item.length == 5) && has_c_and_f
        })
        segments_d_g = segments_d_g.replace(segments_c_f[0], '').replace(segments_c_f[1], '').replace(segment_a, '')
        //console.log('Seg D/G:', segments_d_g)
        
        //Segment b (finding number 4)
        let segment_b = input1.find(item => item.length==4)
        segment_b = segment_b
        .replace(segments_c_f[0], '').replace(segments_c_f[1], '')
        .replace(segments_d_g[0], '').replace(segments_d_g[1], '')
        //console.log('Seg B:', segment_b)
        
        //Segment d (filtering number 4) 
        let segment_d = input1.find(item => item.length==4)
        segment_d = segment_d
        .replace(segments_c_f[0], '').replace(segments_c_f[1], '')
        .replace(segment_b, '')
        //console.log('Seg D:', segment_d)
        
        //Segment g (filtering number 4) 
        let segment_g = segments_d_g.replace(segment_d, '')
        //console.log('Seg G:', segment_g)

        //Decode output and sum 
        let multiplier = 1000
        for (aux of input2) {
            let num = decodeBySegments(aux, segment_a, segment_b, segment_d, segment_g, segments_c_f)
            //console.log(aux + "=>" +num)
            sum += num*multiplier
            multiplier = multiplier/10
        }
    } //row

    return sum
}

function decodeByLength(length) {
    switch (length) {
        case 2:
            return 1
        case 3:
            return 7
        case 4:
            return 4
        case 7:
            return 8
    }
    return undefined
}

function decodeBySegments(input, seg_a, seg_b, seg_d, seg_g, segs_c_f) {
    switch (input.length) {
        case 2:
            return 1
        case 3:
            return 7
        case 4:
            return 4
        case 5:
            if (input.includes(seg_b)) {
                return 5
            } else if ((input.includes(segs_c_f[0])) && (input.includes(segs_c_f[1]))) {
                return 3
            } else {
                return 2
            }
        case 6:
             if (!input.includes(seg_d)) {
                return 0
            } else if ((input.includes(segs_c_f[0])) && (input.includes(segs_c_f[1]))) {
                return 9
            } else {
                return 6
            }
        case 7:
            return 8
    }
    return undefined
}

console.log("A: "+testA())
console.log("B: "+testB())



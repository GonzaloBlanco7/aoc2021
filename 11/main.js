const input = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)

const input_map = input.map(row => {
    return row.split('').map(Number);
})
//Already 2D map (Array)

let a_score = 0;

function printMap(map) {
    let map_of_str = map.map(row => row.join(''))
    console.log('\n\n')
    console.log(map_of_str.join("\n"))
    console.log('\n\n')
}


function flash(map, flashed_items, r_index, c_index) {
    //only one flash per step
    let this_flash = `${r_index}_${c_index}`;
    if (flashed_items.includes(this_flash)) {
        return map;
    }
    flashed_items.push(this_flash)

    a_score++

    let r_start = Math.max(r_index -1, 0)
    let r_end = Math.min(r_index +1, map.length-1)

    let c_start = Math.max(c_index -1, 0)
    let c_end = Math.min(c_index +1, map[0].length-1)

    for (let r=r_start; r<=r_end; r++) {
        for (let c=c_start; c<=c_end; c++) {

            //if not the one flashing => +1
            if ( (r != r_index) || (c != c_index) ) {
                map[r][c]++;

                if (map[r][c] > 9) {
                    map = flash(map, flashed_items, r, c)
                }
            }

        }
    }

    return map
}


function testA() {
    let map = input_map
    
    for (let i = 0; i<100; i++) {
        let flashed_items = [];

        map = map.map((row) => {
            return row.map((item) => item+1)
        })
        
        
        //each row
        for (let r_index = 0; r_index < map.length; r_index++) {
            for (let c_index = 0; c_index < map[0].length; c_index++) {
                let item = map[r_index][c_index]
                
                if (item > 9) {
                    map = flash(map, flashed_items, r_index, c_index)
                }

            }
        }

        //Set flashed to 0
        map = map.map((row) => {
            return row.map(item => (item > 9) ? 0 : item )
        })

    }
    
    return a_score
}
  

function testB() {
    let map = input_map
    const map_length = map.length * map[0].length
    let i = 0;

    let flashed_items = []
    do {
        i++
        flashed_items = []

        map = map.map((row) => {
            return row.map((item) => item+1)
        })
        
        
        //each row
        for (let r_index = 0; r_index < map.length; r_index++) {
            for (let c_index = 0; c_index < map[0].length; c_index++) {
                let item = map[r_index][c_index]
                
                if (item > 9) {
                    map = flash(map, flashed_items, r_index, c_index)
                }

            }
        }
        
        //Set flashed to 0
        map = map.map((row) => {
            return row.map(item => (item > 9) ? 0 : item )
        })

    } while (flashed_items.length != map_length)

    return i
}


console.log("A: "+testA())
console.log("B: "+testB())



const { findSourceMap } = require('module');

const input = require('fs').readFileSync('input', 'utf-8').split(/\r?\n/)

const input_map = input.map(row => {
    return row.split('-');
})
//Already 2D map (Array)

const unionsMap = getUnionsMap(input_map);

function getUnions(node) {
    //find where node appears
    let unions_with_node = input_map.filter(union => union.includes(node))

    //find who node is united with
    return unions_with_node.map(union => {
        let node_index = union.indexOf(node)
        let union_index = (node_index == 0) ? 1 : 0
        return union[union_index];
    })
}

function getUnionsMap(input_map) {
    let unionsMap = {}
    
    //set keys
    for(let i=0; i<input_map.length; i++) {
        for (let j=0; j<2; j++) {
            let node = input_map[i][j]
            if (!Object.keys(unionsMap).includes(node)) {
                unionsMap[node] = []
            }
        }
    }

    let keys = Object.keys(unionsMap)
    for(let i=0; i<keys.length; i++) {
        let node = keys[i]
        unionsMap[node] = getUnions(node)
    }

    return unionsMap
}


function isRoadChecked(road, roads) {

    //console.log('this road', road)
    //console.log('all roads', roads)

    for (let tmp_road of roads) {
        //tmp_road = tmp_road.slice(0, tmp_road.length-1)

        if (JSON.stringify(tmp_road) == JSON.stringify(road)) {
            return true
        }
    }

    return false
}


function findWay(road, roads) {
    let this_node = road[road.length-1]

    if (this_node == 'end') {
        return road;
    }

    let unions = unionsMap[this_node]
    for (let u_node of unions) {

        //cannot go back to start
        if (u_node == 'start') {
            continue
        }

        //check if next node is lowercase
        if (u_node.toLowerCase() == u_node) {
            //if in road -> cannot access it again
            if (road.includes(u_node)) {
                continue
            }
        }

        
        //check if road for this u_node have been already saved
        let possible_road = [...road]
        possible_road.push(u_node)
        if (isRoadChecked(possible_road, roads)) {
            //console.log('road checked')
            continue;
        }
        
        let correct_road = findWay(possible_road, roads)
        if (correct_road) {
            return correct_road
        }
    }

    return false;
}


function testA() {
    let roads = []

    //do while no empty road
    let road = []
    do {
        road = findWay(['start'], roads)
        if (road) {
            console.log('correct road: ', road)
            roads.push(road)
        }
    } while (road)

    console.log('\n\nfinal roads', roads)
    return roads.length
}
  

function testB() {
   
}


console.log("A: "+testA())
//console.log("B: "+testB())



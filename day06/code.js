
import * as std from "std";
import * as os from "os";

const test = `
3,4,3,1,2
`

function parseInput(data) {
    return data.trim().split(",").map((s) => parseInt(s))
}

/* 
function run(data,days) {
    const fish = parseInput(data)
    let fishDays = new Array(9).fill(0)
    fish.map((d) => ++fishDays[d])
    for (let i = 0; i < days; ++i) {
        const next = new Array(9).fill(0)
        for (const d of fishDays.keys()) {
            if (d === 0) {
                next[8] += fishDays[d]
                next[6] += fishDays[d]
            } else {
                next[d-1] += fishDays[d]
            }
        }
        fishDays = next
    }
    return fishDays.reduce((cur,prev) => cur + prev)
}
*/

function run(data,days) {
    const fish = parseInput(data)
    const fishDays = new Array(9).fill(0)
    fish.map((d) => ++fishDays[d])
    for (let i = 0; i < days; ++i) {
        let next = 0
        const [d0,d1,d2,d3,d4,d5,d6,d7,d8] = fishDays
        fishDays.splice(0,9,d1,d2,d3,d4,d5,d6,d0+d7,d8,d0)
    }
    return fishDays.reduce((cur,prev) => cur + prev)
}

function part1(data) {
    return run(data,80)
}

function part2(data) {
    return run(data,256)
}


const part1_expected = 5934
const part2_expected = 26984457539

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = std.loadFile("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


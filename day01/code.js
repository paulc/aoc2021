
import * as std from "std";
import * as os from "os";

function part1(data) {
    let [ prev, ...rest ] = data
    let total = 0
    for (const cur of rest) {
        if (cur > prev) { total++ }
        prev = cur
    }
    return total
}

function part2(data) {
    let [ a,b,c, ...rest ] = data
    let total = 0
    for (const d of rest) {
        if (b+c+d > a+b+c) {
            total++
        }
        [a,b,c] = [b,c,d]
    }
    return total
}

const test = `
199
200
208
210
200
207
240
269
260
263
`.trim().split("\n").map(s => parseInt(s))

const part1_expected = 7
const part2_expected = 5

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

const data = std.loadFile("input.txt").trim().split("\n").map(s => parseInt(s))

print("Part1:",part1(data))
print("Part2:",part2(data))


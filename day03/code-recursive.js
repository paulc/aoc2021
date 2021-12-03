
import * as std from "std";
import * as os from "os";


function part1(data) {
    const width = data[0].length
    const count = new Array(width).fill(0)
    for (const reading of data) {
        for (const [i,v] of reading.entries()) {
            count[i] += (v === 1) ? 1 : -1
        }
    }
    const gamma = count.reduce((prev,cur) => (prev*2) + ((cur > 0) ? 1 : 0),0)
    const epsilon = count.reduce((prev,cur) => (prev*2) + ((cur < 0) ? 1 : 0),0)
    return gamma * epsilon
}

function mostCommon(data,index) {
    let count = 0
    for (const reading of data) {
        count += (reading[index] === 1) ? 1 : -1
    }
    return (count >= 0) ? 1 : 0
}

function leastCommon(data,index) {
    let count = 0
    for (const reading of data) {
        count += (reading[index] === 1) ? 1 : -1
    }
    return (count < 0) ? 1 : 0
}

function *msbFilter(data,index,value) {
    for (const reading of data) {
        if (reading[index] === value) {
            yield reading
        }
    }
}

function calcOxygen(data,index) {
    if (data.length == 1) {
        return data[0].reduce((prev,cur) => (prev*2) + cur)
    } else {
        data = Array.from(msbFilter(data,index,mostCommon(data,index)))
        return calcOxygen(data,index+1)
    }
}

function calcCO2(data,index) {
    if (data.length == 1) {
        return data[0].reduce((prev,cur) => (prev*2) + cur)
    } else {
        data = Array.from(msbFilter(data,index,leastCommon(data,index)))
        return calcCO2(data,index+1)
    }
}

function part2(data) {
    return calcOxygen(data,0) * calcCO2(data,0)
}

const test = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`.trim().split("\n").map((l) => l.split("").map((c) => parseInt(c)))

const part1_expected = 198
const part2_expected = 230

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

const data = std.loadFile("input.txt").trim().split("\n").map((l) => l.split("").map((c) => parseInt(c)))

print("Part1:",part1(data))
print("Part2:",part2(data))


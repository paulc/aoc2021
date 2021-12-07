
import * as std from "std";
import * as os from "os";

const test = `
16,1,2,0,4,2,7,1,2,14
`

function *range(start,end,step=1) {
    for (let i = ((end === undefined) ? 0 : start);
         (step < 0) ? i > ((end === undefined) ? start : end):
                      i < ((end === undefined) ? start : end);
         i += step) {
        yield i
    }
}

function parseInput(data) {
    return data.trim().split(",").map((s) => parseInt(s))
}

function part1(data) {
    const crabs = parseInput(data)
    const align = (target) => crabs.reduce((prev,cur) => prev + Math.abs(cur-target),0)
    return Math.min(...Array.from(range(Math.min(...crabs),Math.max(...crabs)), (i) => align(i)))
}

function part2(data) {
    const crabs = parseInput(data)
    const costs = [0]
    const cost = (n) => (costs[n] === undefined) ? Array.from(range(costs.length,n+1),(i) => costs[i] = i + costs[i-1]).pop() : costs[n]
    const align = (t) => crabs.reduce((prev,cur) => prev + cost(Math.abs(cur-t)),0)
    return Math.min(...Array.from(range(Math.min(...crabs),Math.max(...crabs)), (i) => align(i)))
}


const part1_expected = 37
const part2_expected = 168

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = std.loadFile("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


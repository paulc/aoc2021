
import * as std from "std";
import * as os from "os";

const test = `
16,1,2,0,4,2,7,1,2,14
`

function parseInput(data) {
    return data.trim().split(",").map((s) => parseInt(s))
}

function part1(data) {
    const crabs = parseInput(data)
    const align = (t) => crabs.reduce((prev,cur) => prev + Math.abs(cur-t),0)
    const min = Math.min(...crabs)
    const max = Math.max(...crabs)
    let minCost = undefined
    for (let target = min;target <= max; ++target) {
        if (minCost === undefined) {
            minCost = align(target)
        } else {
            const cost = align(target)
            if (cost < minCost) {
                minCost = cost
            }
        }
    }
    return minCost
}

function part2(data) {
    const crabs = parseInput(data)
    const costs = [0,1]
    const cost = (n) => {
        if (costs[n] === undefined) {
            for (let i = 0; i <= n; ++i) {
                if (costs[i] === undefined) {
                    costs[i] = costs[i-1] + i
                }
            }
        }
        return costs[n]
    }
    const align = (t) => crabs.reduce((prev,cur) => prev + cost(Math.abs(cur-t)),0)
    const min = Math.min(...crabs)
    const max = Math.max(...crabs)
    let minCost = undefined
    for (let target = min;target <= max; ++target) {
        if (minCost === undefined) {
            minCost = align(target)
        } else {
            const cost = align(target)
            if (cost < minCost) {
                minCost = cost
            }
        }
    }
    return minCost
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


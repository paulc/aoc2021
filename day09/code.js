
import * as std from "std";
import * as os from "os";

const test = `
2199943210
3987894921
9856789892
8767896789
9899965678
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
}

function part1(data) {
}

function part2(data) {
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


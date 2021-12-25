
import { loadFile as read } from "std"

const test = `
`

function parseInput(data) {
}

function part1(data) {
}

function part2(data) {
}

const part1_expected = 0
const part2_expected = 0

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = read("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


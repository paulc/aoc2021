
import * as std from "std";
import * as os from "os";

const test_a = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`

const test_b = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`

const test_c = `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`

function parseInput(data) {
    // Add reverse paths
    return data.trim().split("\n").flatMap((line) => [line.split("-"),line.split("-").reverse()])
}

function findPath(visited,paths) {
    const last = visited[visited.length-1]
    if (last === "end") {
        return visited
    } else {
        const valid = paths.filter(([start,end]) => (start === last && !visited.filter((n) => /^[a-z]+$/.test(n)).includes(end)))
        return(valid.map(([_,next]) => findPath(Array.from([...visited,next]),paths)))
    }
}

function part1(data) {
    const paths = parseInput(data)
    return findPath(["start"],paths).flat(Infinity).filter((n) => n === "end").length
}

function part2(data) {
}

const part1_expected_a = 10
const part1_expected_b = 19
const part1_expected_c = 226

const part2_expected_a = 10
const part2_expected_b = 103
const part2_expected_c = 3509

if (part1(test_a) !== part1_expected_a) {
    throw("Part1 Test A Failed")
}

if (part1(test_b) !== part1_expected_b) {
    throw("Part1 Test B Failed")
}

if (part1(test_c) !== part1_expected_c) {
    throw("Part1 Test C Failed")
}

const data = std.loadFile("input.txt")

print("Part1:",part1(data))

if (part2(test_a) !== part2_expected_a) {
    throw("Part2 Test A Failed")
}

if (part2(test_b) !== part2_expected_b) {
    throw("Part2 Test B Failed")
}

if (part2(test_c) !== part2_expected_c) {
    throw("Part2 Test C Failed")
}

print("Part2:",part2(data))



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
    // Add reverse paths and remove paths returning to start
    return data.trim().split("\n").flatMap((line) => [line.split("-"),line.split("-").reverse()]).filter(([start,end]) => end !== "start")
}

Map.prototype.incr = function(k) { this.has(k) ? this.set(k,this.get(k)+1) : this.set(k,1); return this.get(k) }
Map.prototype.getDefault = function(k,d) { return this.has(k) ? this.get(k) : d }

function findPath(visited,paths,small,done) {
    const last = visited[visited.length-1]
    if (last === "end") {
        done.add(visited.join(","))
    } else {
        if (/^[a-z]+$/.test(last)) {
            small = new Set([...small,last])
        }
        const valid = paths.filter(([start,end]) => (start === last && !small.has(end)))
        valid.map(([_,next]) => findPath(Array.from([...visited,next]),paths,small,done))
    }
}

function findPath2(visited,paths,small,done) {
    const last = visited[visited.length-1]
    if (last === "end") {
        done.add(visited.join(","))
    } else {
        if (/^[a-z]+$/.test(last)) {
            small = new Map([...small])
            small.incr(last)
        }
        if (Array.from(small.values()).reduce((prev,cur) => cur > 1 ? prev + 1 : prev,0) > 1) {
            // skip
        } else {
            const valid = paths.filter(([start,end]) => (start === last && !(small.getDefault(end,0) > 1)))
            valid.map(([_,next]) => findPath2(Array.from([...visited,next]),paths,small,done))
        }
    }
}

function part1(data) {
    const paths = parseInput(data)
    const small = new Set()
    const done = new Set()
    findPath(["start"],paths,small,done)
    return done.size
}

function part2(data) {
    const paths = parseInput(data)
    const small = new Map()
    const done = new Set()
    findPath2(["start"],paths,small,done)
    return done.size
}

const part1_expected_a = 10
const part1_expected_b = 19
const part1_expected_c = 226

const part2_expected_a = 36
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


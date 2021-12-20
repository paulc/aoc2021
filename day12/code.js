
import { loadFile as read } from "std"

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

Map.prototype.addList = function (k,v) { this.has(k) ? this.get(k).push(v) : this.set(k,[v]) }
Map.prototype.incr = function(k) { this.has(k) ? this.set(k,this.get(k)+1) : this.set(k,1); return this.get(k) }
String.prototype.isLowerCase = function () { return this.toLowerCase() === this.valueOf() }

function findPath(visited,paths) {
    const last = visited[visited.length-1]
    if (last === 'end') {
        return 1
    }
    const valid = paths.get(last).filter((next) => !(next.isLowerCase() && visited.includes(next)))
    return valid.map((next) => findPath(Array.from([...visited,next]),paths)).reduce((prev,cur) => prev + cur,0)
}

function findPath2(visited,paths,twice) {
    const last = visited[visited.length-1]
    if (last === 'end') {
        return 1
    }
    if (!twice) {
        const counts = new Map()
        visited.filter((node) => node.isLowerCase()).forEach((v) => counts.incr(v))
        if (Math.max(...Array.from(counts.values())) > 1) {
            twice = true
        }
    }
    const valid = twice ? paths.get(last).filter((next) => !(next.isLowerCase() && visited.includes(next))) : paths.get(last)
    return valid.map((next) => findPath2(Array.from([...visited,next]),paths,twice)).reduce((prev,cur) => prev + cur,0)
}

function part1(data) {
    const paths = new Map()
    parseInput(data).forEach(([k,v]) => paths.addList(k,v))
    return findPath(['start'],paths)
}

function part2(data) {
    const paths = new Map()
    parseInput(data).forEach(([k,v]) => paths.addList(k,v))
    return findPath2(['start'],paths,false)
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

const data = read("input.txt")

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


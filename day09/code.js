
import { loadFile as read } from "std"

const test = `
2199943210
3987894921
9856789892
8767896789
9899965678
`

function *genXY(maxX,maxY) {
    for (let x = 0; x < maxX; ++x) {
        for (let y = 0; y < maxY; ++y) {
            yield [x,y]
        }
    }
}

function parseInput(data) {
    return data.trim().split("\n").map((l) => l.split("").map((v) => parseInt(v)))
}

function getAdjacent(map,x,y) {
    return [[x-1,y],[x+1,y],[x,y-1],[x,y+1]].filter(([x,y]) => x >= 0 && x < map[0].length && y >= 0 && y < map.length)
}

function isLower(map,x,y) {
    return getAdjacent(map,x,y).map(([x1,y1]) => map[y1][x1]).map((v) => map[y][x] < v).reduce((cur,prev) => cur && prev)
}

function findBasin(map,x,y) {
    let basin = new Set([[x,y].toString()])
    for (const [x1,y1] of getAdjacent(map,x,y)) {
        if (map[y1][x1] > map[y][x] && map[y1][x1] !== 9) {
            findBasin(map,x1,y1).forEach((v) => basin.add(v))
        }
    }
    return basin
}

function part1(data) {
    const map = parseInput(data)
    return Array.from(genXY(map[0].length,map.length),([x,y]) => isLower(map,x,y) ? map[y][x]+1 : 0).reduce((cur,prev) => cur + prev)
}

function part2(data) {
    const map = parseInput(data)
    const lowPoints = Array.from(genXY(map[0].length,map.length)).filter(([x,y]) => isLower(map,x,y))
    const basins = lowPoints.map(([x,y]) => findBasin(map,x,y).size).sort((a,b) => a - b)
    return basins.slice(-3).reduce((cur,prev) => cur * prev)
}

const part1_expected = 15
const part2_expected = 1134

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = read("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


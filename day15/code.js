
import * as std from "std";
import * as os from "os";

const test = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`

Map.prototype.getDefault = function(k,d) { return this.has(k) ? this.get(k) : d }

class Grid {
    constructor(grid) {
        this.grid = grid
        this.maxX = grid[0].length - 1
        this.maxY = grid.length - 1
        this.visited = new Map([[`${this.maxX},${this.maxY}`,this.grid[this.maxY][this.maxX]]])
    }
    getXY(x,y) {
        return this.grid[y][x]
    }
    getCost(x,y) {
        if (this.visited.has(`${x},${y}`)) {
            return this.visited.get(`${x},${y}`)
        }
        let cost = this.grid[y][x]
        if (x === this.maxX) { 
            cost += this.getCost(x,y+1)
        } else if (y === this.maxY) {
            cost += this.getCost(x+1,y)
        } else {
            cost += Math.min(this.getCost(x+1,y),this.getCost(x,y+1))
        }
        this.visited.set(`${x},${y}`,cost)
        return cost
    }
    toString() {
        return this.grid.map((r) => r.join("")).join("\n") 
    }
    visitedToString() {
        const rows = []
        for (let y = 0; y <= this.maxY; ++y) {
            const row = []
            for (let x = 0; x <= this.maxX; ++x) {
                row.push(("000" + this.visited.getDefault(`${x},${y}`,0)).slice(-3))
            }
            rows.push(row.join(" "))
        }
        return rows.join("\n")
    }
}

function parseInput(data) {
    return data.trim().split("\n").map((l) => l.split("").map((i) => parseInt(i)))
}

function part1(data) {
    const g = new Grid(parseInput(data))
    return g.getCost(0,0) - g.getXY(0,0)
}

function part2(data) {
    const tiles = parseInput(data) 
    const rowLen = tiles[0].length
    const colLen = tiles.length
    for (const row of tiles) {
        for (let i = 0; i < 4; ++i) {
            row.push(...row.slice(-rowLen).map((v) => (v === 9) ? 1 : v + 1))
        }
    }
    for (let i = 0; i < 4; ++i) {
        tiles.push(...tiles.slice(-colLen).map((r) => r.map((v) => (v === 9) ? 1 : v + 1)))
    }
    const g = new Grid(tiles)
    print("Cost:",g.getCost(0,0))
    print(g.visitedToString())
    return g.getCost(0,0) - g.getXY(0,0)
}

const part1_expected = 40
const part2_expected = 315

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = std.loadFile("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


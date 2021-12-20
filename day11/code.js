
import { loadFile as read } from "std"

const test = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`

class Grid {
    constructor(data) {
        const rows = data.trim().split("\n")
        this.grid = rows.flatMap((l) => l.split("").map((c) => parseInt(c)))
        this.X = rows[0].length
        this.Y = rows.length
    }
    checkBounds(x,y) {
        return x >= 0 && x < this.X && y >= 0 && y < this.Y
    }
    getAdjacent(i) {
        const [x,y] = [i % this.X, Math.floor(i / this.X)]
        return [[x-1,y-1],[x,y-1],[x+1,y-1],[x-1,y],[x+1,y],[x-1,y+1],[x,y+1],[x+1,y+1]].filter(([x,y]) => this.checkBounds(x,y)).map(([x,y]) => x + y * this.X)
    }
    increment(i,flashes) {
        if (++this.grid[i] > 9 && !flashes.has(i)) {
            flashes.add(i)
            this.getAdjacent(i).map((adj) => this.increment(adj,flashes))
        }
    }
    step() {
        const flashes = new Set()
        this.grid.forEach((_,i) => this.increment(i,flashes))
        flashes.forEach((i) => this.grid[i] = 0)
        return flashes.size
    }
}
        
function part1(data) {
    const grid = new Grid(data)
    let count = 0
    for (let i = 0; i < 100; ++i) {
        count += grid.step()
    }
    return count
}

function part2(data) {
    const grid = new Grid(data)
    let count = 0
    for (let i = 0; i < 1000; ++i) {
        if (grid.step() === 100) {
            return i + 1
        }
    }
}

const part1_expected = 1656
const part2_expected = 195

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = read("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


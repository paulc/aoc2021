
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

function *graph(grid) {
    const ADJ = [[-1,0],[1,0],[0,-1],[0,1]]
    const valid = ([x,y]) => x >= 0 && x < grid[0].length && y >=0 && y < grid.length
    const adj = (x,y) => [[-1,0],[1,0],[0,-1],[0,1]].map(([dx,dy]) => [x+dx,y+dy]).filter((xy) => valid(xy))
    for (let x = 0; x < grid[0].length; ++x) {
        for (let y = 0; y < grid.length; ++y) {
            yield [`${x},${y}`, adj(x,y).map(([x,y]) => [`${x},${y}`,grid[y][x]])]
        }
    }
}

function shortestPath(graph,start,end) {
    const Q = new Set(graph.keys())
    const known = new Set()
    const dist = new Map(Array.from(graph.keys(),(k) => [k,Infinity]))
    dist.set(start,0)
    known.add(start)
    while (Q.size > 0) {
        let min = Infinity
        let u = undefined
        for (const v of known) {
            if (dist.get(v) < min) {
                min = dist.get(v)
                u = v
            }
        }
        Q.delete(u)
        known.delete(u)
        if (u === end) {
            return dist.get(end)
        }
        for (const [v,dv] of graph.get(u).filter(([v,d]) => Q.has(v))) {
            known.add(v)
            const alt = dist.get(u) + dv
            if (alt < dist.get(v)) {
                dist.set(v,alt)
            }
        }
    }
}

function parseInput(data) {
    return data.trim().split("\n").map((l) => l.split("").map((i) => parseInt(i)))
}

function part1(data) {
    const grid = parseInput(data)
    const maxX = grid[0].length - 1
    const maxY = grid.length - 1
    const g = new Map(graph(grid))
    return shortestPath(g,"0,0",`${maxX},${maxY}`)
}

function part2(data) {
    const grid = parseInput(data) 
    const rowLen = grid[0].length
    const colLen = grid.length
    for (const row of grid) {
        for (let i = 0; i < 4; ++i) {
            row.push(...row.slice(-rowLen).map((v) => (v === 9) ? 1 : v + 1))
        }
    }
    for (let i = 0; i < 4; ++i) {
        grid.push(...grid.slice(-colLen).map((r) => r.map((v) => (v === 9) ? 1 : v + 1)))
    }
    const maxX = grid[0].length - 1
    const maxY = grid.length - 1
    const g = new Map(graph(grid))
    return shortestPath(g,"0,0",`${maxX},${maxY}`)
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


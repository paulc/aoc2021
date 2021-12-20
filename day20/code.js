
import * as std from "std";
import * as os from "os";

const test = `
..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###
`

function parseInput(data) {
    const [algorithm,_,...image] = data.trim().split("\n")
    return [algorithm.split("").map((p) => (p === ".") ? 0 : 1), 
            image.map((l) => l.split("").map((p) => (p === ".") ? 0 : 1))]
}

class Grid {
    constructor(a) {
        this.data = a
        this.maxX = this.data[0].length
        this.maxY = this.data.length
    }
    clone() {
        const out = []
        for (let y = 0; y < this.maxY; ++y) {
            out.push(new Array(this.maxX).fill(0))
        }
        return new Grid(out)
    }
    getXY(x,y,d=0) {
        return this.data[y] ? (this.data[y][x] === undefined ? d : this.data[y][x]) : d 
    }
    setXY(x,y,d) {
        this.data[y][x] = d
    }
    toString() { 
        return this.data.map((r) => r.map((v) => (v === 0) ? "." : "#").join("")).join("\n")
    }
    square(x,y,d) { 
        return [y,y+1,y+2].flatMap((y) => [x,x+1,x+2].map((x) => this.getXY(x,y,d))).reduce((prev,cur) => prev * 2 + cur,0)
    }
    enhance(algorithm,defaultXY) {
        let out = this.clone()
        for (let x = 0; x < this.maxX; ++x) {
            for (let y = 0; y < this.maxX; ++y) {
                out.setXY(x,y,algorithm[this.square(x,y,defaultXY)])
            }
        }
        return out
    }
    pixels() {
        return this.data.flat().reduce((prev,cur) => prev + cur,0)
    }
    pad(n) {
        const out = []
        const width = this.data[0].length + 2 * n
        const zeros = (n) => new Array(n).fill(0)
        for (let i = 0; i < n; ++i) {
            out.push(zeros(width))
        }
        for (const r of this.data) {
            out.push([...zeros(n),...r,...zeros(n)])
        }
        for (let i = 0; i < n; ++i) {
            out.push(zeros(width))
        }
        return new Grid(out)
    }
}

function part1(data) {
    const [algorithm,image] = parseInput(data)
    const g = new Grid(image).pad(5)
    const out = g.enhance(algorithm,0).enhance(algorithm,algorithm[0])
    return out.pixels()
}

function part2(data) {
    const [algorithm,image] = parseInput(data)
    const g = new Grid(image).pad(150)
    let out = g.enhance(algorithm,0)
    for (let i = 1; i < 50; ++i) {
        out = g.enhance(algorithm,(i % 2) ? algorithm[0] : algorithm[511])
    }
    return out.pixels()
}

const part1_expected = 35
const part2_expected = 3351

globalThis.Grid = Grid

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = std.loadFile("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


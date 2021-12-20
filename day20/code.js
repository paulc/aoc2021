
import { loadFile as read } from "std"

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
    constructor(a,iv=0) {
        this.data = a
        this.maxX = this.data[0].length
        this.maxY = this.data.length
        this.iv = iv
    }
    clone(pad,iv) {
        const out = []
        for (let y = 0; y < this.maxY + pad; ++y) {
            out.push(new Array(this.maxX + pad).fill(iv))
        }
        return new Grid(out,iv)
    }
    getXY(x,y) {
        return this.data[y] ? (this.data[y][x] === undefined ? this.iv : this.data[y][x]) : this.iv 
    }
    toString() { 
        return this.data.map((r) => r.map((v) => (v === 0) ? "." : "#").join("")).join("\n")
    }
    square(x,y) { 
        return [y,y+1,y+2].flatMap((y) => [x,x+1,x+2].map((x) => this.getXY(x,y))).reduce((prev,cur) => prev * 2 + cur,0)
    }
    enhance(algorithm) {
        const iv = algorithm[new Array(9).fill(this.iv).reduce((prev,cur) => prev * 2 + cur,0)]
        const pad = 3
        const out = this.clone(pad,iv)
        for (let x = 0; x < this.maxX; ++x) {
            for (let y = 0; y < this.maxX; ++y) {
                out.data[y+pad][x+pad] = algorithm[this.square(x,y)]
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
    const out1 = g.enhance(algorithm)
    const out2 = out1.enhance(algorithm)
    return out2.pixels()
}

function part2(data) {
    const [algorithm,image] = parseInput(data)
    let out = new Grid(image).pad(5)
    for (let i = 0; i < 50; ++i) {
        out = out.enhance(algorithm)
    }
    return out.pixels()
}

const part1_expected = 35
const part2_expected = 3351

globalThis.Grid = Grid

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = read("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


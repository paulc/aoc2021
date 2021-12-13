
import * as std from "std";
import * as os from "os";

const test = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0\n
fold along y=7
fold along x=5
`

class Grid {
    constructor(maxX,maxY,dots) {
        this.maxX = maxX
        this.maxY = maxY
        this.dots = new Map(dots.map((v) => [v.join(","),v]))
    }
    get count() {
        return this.dots.size
    }
    foldY(fold) {
        const top = new Map(Array.from(this.dots.entries()).filter(([k,[x,y]]) => y < fold))
        for (const [k,[x,y]] of Array.from(this.dots.entries()).filter(([k,[x,y]]) => y > fold)) {
            const my = this.maxY - y - 1
            top.set([x,my].join(","),[x,my])
        }
        return new Grid(this.maxX,fold,Array.from(top.values()))
    }
    foldX(fold) {
        const left = new Map(Array.from(this.dots.entries()).filter(([k,[x,y]]) => x < fold))
        for (const [k,[x,y]] of Array.from(this.dots.entries()).filter(([k,[x,y]]) => x > fold)) {
            const mx = this.maxX - x - 1
            left.set([mx,y].join(","),[mx,y])
        }
        return new Grid(fold,this.maxY,Array.from(left.values()))
    }
    toString() {
        const str = []
        const grid = new Array(this.maxX * this.maxY).fill(" ")
        Array.from(this.dots.values(),([x,y]) => grid[x + y * this.maxX] = "#")
        for (let y = 0; y < this.maxY; ++y) {
            str.push(grid.slice(y * this.maxX, (y+1) * this.maxX).join(""))
        }
        return str.join("\n")
    }
}
        
function part1(data) {
    const [dots,_folds] = data.trim().split("\n\n")
    const coords = dots.split("\n").map((l) => l.split(",").map((c) => parseInt(c)))
    const maxX = Math.max(...coords.map(([x,y]) => x)) + 1
    const maxY = Math.max(...coords.map(([x,y]) => y)) + 1
    const g = new Grid(maxX,maxY,coords)
    const folds = _folds.split("\n")
    const [axis,value] = (([x,v]) => [x.replace(/.* /,""),parseInt(v)])(folds[0].split("="))
    if (axis === "x") {
        return g.foldX(value).count
    } else {
        return g.foldY(value).count
    }
}

function part2(data) {
    const [dots,_folds] = data.trim().split("\n\n")
    const coords = dots.split("\n").map((l) => l.split(",").map((c) => parseInt(c)))
    const maxX = Math.max(...coords.map(([x,y]) => x)) + 1
    const maxY = Math.max(...coords.map(([x,y]) => y)) + 1
    const folds = _folds.split("\n")
    let g = new Grid(maxX,maxY,coords)
    for (const fold of folds) {
        const [axis,value] = (([x,v]) => [x.replace(/.* /,""),parseInt(v)])(fold.split("="))
        g = (axis === "x") ? g.foldX(value) : g.foldY(value)
    }
    return "\n" + g.toString()
}

const part1_expected = 17

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = std.loadFile("input.txt")

print("Part1:",part1(data))
print("Part2:",part2(data))


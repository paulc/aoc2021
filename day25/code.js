
import { loadFile as read } from "std"

const test = `
v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>
`

function *genXY(X,Y) {
    for (let y = 0; y < Y; ++y) {
        for (let x = 0; x < X; ++x) {
            yield [x,y]
        }
    }
}

class Grid {
    constructor(data) {
        const rows = data.trim().split("\n")
        this.grid = rows.map((l) => l.split(""))
        this.X = rows[0].length
        this.Y = rows.length 
    }
    step() {
        const E = [], S = [], SS = []
        for (const [x,y] of genXY(this.X,this.Y)) {
            if (this.grid[y][x] === '>' && this.grid[y][(x+1)%this.X] === '.') {
                E.push([x,y])
            }
            if (this.grid[y][x] === 'v') {
                S.push([x,y])
            }
        }
        for (const [x,y] of E) {
            this.grid[y][x] = '.'
            this.grid[y][(x+1)%this.X] = '>'
        }
        for (const [x,y] of S) {
            if (this.grid[(y+1)%this.Y][x] === '.') {
                SS.push([x,y])
            }
        }
        for (const [x,y] of SS) {
            this.grid[(y+1)%this.Y][x] = 'v'
            this.grid[y][x] = '.'
        }
        return E.length + SS.length
    }
    toString() {
        return this.grid.map((l) => l.join("")).join("\n")
    }
}

function part1(data) {
    const g = new Grid(data)
    let count = 0
    while (g.step() > 0) { count++ }
    return(count+1)
}

const part1_expected = 58

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = read("input.txt")

print("Part1:",part1(data))




import * as std from "std";
import * as os from "os";

const test = `
[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]
`

const isPair = (v) => Pair.prototype.isPrototypeOf(v)
const isArray = (v) => Array.prototype.isPrototypeOf(v)

Array.prototype.pairs = function() { return this.flatMap((x) => this.flatMap((y) => (x != y) ? [[x,y]] : [])) }

class Pair {
    constructor(LR,parent=undefined) {
        this.parent = parent
        const [L,R] = [...LR]
        this.setChild("L",L)
        this.setChild("R",R)
    }
    setChild(LR,val) {
        if (isPair(val)) {
            this[LR] = val
            this[LR].parent = this
        } else if (isArray(val)) {
            this[LR] = new Pair(val,this)
        } else {
            this[LR] = val
        }
    }
    depth() {
        let p = this
        let count = 0
        while(p.parent !== undefined) {
            p = p.parent
            ++count
        }
        return count
    }
    _explode() {
        const [adjL,adjR] = this.adjacent()
        if (adjL) {
            adjL.p[adjL.s] += this.L
        }
        if (adjR) {
            adjR.p[adjR.s] += this.R
        }
        this.parent.L === this ? this.parent.L = 0 : this.parent.R = 0
        return true
    }
    _split(side) {
        if (side === "L") {
            this.setChild("L",new Pair([Math.floor(this.L/2),Math.ceil(this.L/2)]))
        } else {
            this.setChild("R",new Pair([Math.floor(this.R/2),Math.ceil(this.R/2)]))
        }
        return true
    }
    explode() {
        const p = Array.from(this.walk()).filter((p) => p.depth() === 4).shift()
        return p ? p._explode() : false
    }
    split() {
        const l = this.leaves().filter((p) => p.v >= 10).shift()
        return l ? l.p._split(l.s) : false
    }
    reduce() {
        while (this.explode() || this.split()) {}
        return this
    }
    flat() {
        return [ isPair(this.L) ? this.L.flat() : this.L, isPair(this.R) ? this.R.flat() : this.R ] 
    }
    leaves() {
        return [ isPair(this.L) ? this.L.leaves() : {p:this,s:"L",v:this.L}, isPair(this.R) ? this.R.leaves() : {p:this,s:"R",v:this.R} ].flat()
    }
    root() {
        let root = this
        while (root.parent) {
            root = root.parent
        }
        return root
    }
    adjacent() {
        const leaves = this.root().leaves()
        const map = leaves.map((l) => l.p === this)
        return [ leaves[map.indexOf(true)-1], leaves[map.lastIndexOf(true)+1] ]
    }
    magnitude() {
        return 3 * (isPair(this.L) ? this.L.magnitude() : this.L) + 2 * (isPair(this.R) ? this.R.magnitude() : this.R)
    }
    *walk(f) {
        yield f ? f(this) : this
        for (const LR of [this.L,this.R]) {
            if (isPair(LR)) {
                for (const p of LR.walk(f)) {
                    yield p 
                }
            }
        }
    }
    toString() {
        return JSON.stringify(this.flat())
    }
}

function parseInput(data) {
    return data.trim().split("\n").map((l) => eval(l))
}

function part1(data) {
    const numbers = parseInput(data).map((n) => new Pair(n))
    const result = numbers.reduce((prev,cur) => new Pair([prev,cur]).reduce())
    return result.magnitude()
}

function part2(data) {
    let max = 0
    const pairs = parseInput(data).pairs()
    for (const [a,b] of pairs) {
        const s = new Pair([a,b]).reduce().magnitude()
        if (s > max) {
            max = s
        }
    }
    return max
}

const part1_expected = 4140
const part2_expected = 3993

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = std.loadFile("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))

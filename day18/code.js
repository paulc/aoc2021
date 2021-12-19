
import * as std from "std";
import * as os from "os";

const test = `
`

const isPair = (v) => Pair.prototype.isPrototypeOf(v)
const isArray = (v) => Array.prototype.isPrototypeOf(v)

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
    /*
    getL() {
        let p = this
        while (isPair(p.L)) {
            p = p.L
        }
        return p.L
    }
    getR() {
        let p = this
        while (isPair(p.R)) {
            p = p.R
        }
        return p.R
    }
    getAdjL() {
        if (this.parent === undefined || this.parent.L === this) {
            return undefined
        }
        return this.parent.getL()
    }
    getAdjR() {
        if (this.parent === undefined || this.parent.R === this) {
            return undefined
        }
        return this.parent.getL()
    }
    */
    addL(val) {
        if (this.parent === undefined || this.parent.L === this) {
            return undefined
        }
        let p = this.parent
        while (isPair(p.L)) {
            p = p.L
        }
        return (p.L += val)
    }
    addR(val) {
        if (this.parent === undefined || this.parent.R === this) {
            return undefined
        }
        let p = this.parent
        while (isPair(p.R)) {
            p = p.R
        }
        return (p.R += val)
    }
    explode() {
        this.addL(this.L)
        this.addR(this.R)
        this.parent.L === this ? this.parent.L = 0 : this.parent.R = 0
        return true
    }
    split() {
        if (!this.isPair(this.L) && this.L > 10) {
            this.setChild("L",new Pair([Math.floor(this.L/2),Math.ceil(this.L/2)]))
        } else {
            this.setChild("R",new Pair([Math.floor(this.R/2),Math.ceil(this.R/2)]))
        }
    }
    explodePairs() {
        const p = Array.from(this.walk()).filter((p) => p.depth() === 4).shift()
        return p ? p.explode() : false
    }
    splitPairs() {
        const p = Array.from(p.walk()).filter((p) => (isPair(p.L) ? false : p.L > 10) || (isPair(p.R) ? false : p.R > 10)).shift()
        return p ? p.split() : false
    }
    flat() {
        return [ isPair(this.L) ? this.L.flat() : this.L, isPair(this.R) ? this.R.flat() : this.R ] 
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
        return JSON.stringify(this.flatten())
    }
}

globalThis.Pair = Pair

/*
function parseInput(data) {
}

function part1(data) {
}

function part2(data) {
}

const part1_expected = 45
const part2_expected = 112

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = std.loadFile("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))
*/

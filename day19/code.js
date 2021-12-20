
import { loadFile as read } from "std"

const test = `
--- scanner 0 ---
-1,-1,1
-2,-2,2
-3,-3,3
-2,-3,1
5,6,-4
8,0,7

--- scanner 0 ---
1,-1,1
2,-2,2
3,-3,3
2,-1,3
-5,4,-6
-8,-7,0

--- scanner 0 ---
-1,-1,-1
-2,-2,-2
-3,-3,-3
-1,-3,-2
4,6,5
-7,0,8

--- scanner 0 ---
1,1,-1
2,2,-2
3,3,-3
1,3,-2
-4,-6,5
7,0,8

--- scanner 0 ---
1,1,1
2,2,2
3,3,3
3,1,2
-6,-4,-5
0,7,-8
`

Array.prototype.symmetricPairs = function () {
    const c = []
    for (let b = this.slice(0), x = b.pop(); x; x = b.pop()) { b.forEach((y) => c.push([x,y])) }
    return c
}

function parseInput(data) {
    return data.trim().split("\n\n").map((s) => s.trim().split("\n").slice(1).map((p) => p.split(",").map((i) => parseInt(i))))
}

class Point {
    constructor(x,y,z) {
        this.x = x
        this.y = y
        this.z = z
    }
    add(p2) {
        return new Point(this.x + p2.x, this.y + p2.y, this.z + p2.z)
    }
    vector() {
        return new Point(0,0,0).vectorTo(this)
    }
    vectorTo(p2) {
        const dx = p2.x - this.x
        const dy = p2.y - this.y
        const dz = p2.z - this.z
        const r = Math.sqrt(dx*dx + dy*dy + dz*dz)
        const phi = Math.acos(dz/r)
        const theta = Math.atan2(dy,dx)
        return new Vector(r,theta,phi)
    }
    toString() {
        return `(${this.x},${this.y},${this.z})`
    }
}

class Vector {
    constructor(r,theta,phi) {
        this.r = r
        this.theta = theta
        this.phi = phi
    }
    toXYZ() {
        return [this.r * Math.cos(this.theta) * Math.sin(this.phi),
                this.r * Math.sin(this.theta) * Math.sin(this.phi),
                this.r * Math.cos(this.phi) ]
    }
    rotate(dtheta,dphi) {
        return new Vector(this.r,this.theta + dtheta,this.phi + dphi)
    }
    toString() {
        const deg = (r) => (r * 180 / Math.PI).toFixed(2)
        return `r: ${this.r.toFixed(2)} theta: ${deg(this.theta)} phi: ${deg(this.phi)} [${this.toXYZ().map((i) => i.toFixed(2)).join(",")}]`
    }
}


globalThis.test = test
globalThis.Vector = Vector
globalThis.Point = Point



function part1(data) {
}

function part2(data) {
}

const part1_expected = 79
const part2_expected = 3993

/*
if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = read("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))
*/


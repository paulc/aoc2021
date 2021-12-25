
import { loadFile as read } from "std"

Array.prototype.sum = function() { return this.reduce((a,c) => a + c) }

class Cube {
    constructor(state,x1,x2,y1,y2,z1,z2) {
        this.state = state
        this.x1 = Math.min(x1,x2)
        this.x2 = Math.max(x1,x2)
        this.y1 = Math.min(y1,y2)
        this.y2 = Math.max(y1,y2)
        this.z1 = Math.min(z1,z2)
        this.z2 = Math.max(z1,z2)
    }
    volume() {
        return (this.state === 'on' ? 1 : -1) * (this.x2-this.x1+1) * (this.y2-this.y1+1) * (this.z2-this.z1+1)
    }
    intersection(other,state) {
        const x1 = Math.max(this.x1,other.x1)
        const x2 = Math.min(this.x2,other.x2)
        const y1 = Math.max(this.y1,other.y1)
        const y2 = Math.min(this.y2,other.y2)
        const z1 = Math.max(this.z1,other.z1)
        const z2 = Math.min(this.z2,other.z2)
        return (x1 > x2 || y1 > y2 || z1 > z2) ? undefined : new Cube(state,x1,x2,y1,y2,z1,z2)
    }
    toString() {
        return `${this.state} x=${this.x1}..${this.x2},y=${this.y1}..${this.y2},z=${this.z1}..${this.z2} vol=${this.volume()}`
    }
}

function parseInput(data) {
    return data.trim().split("\n").map((l) => l.split(" ")).map(([a,b]) => [a,...[...b.matchAll(/(-?\d+)/g)].map((m) => parseInt(m))])
}

function run(steps) {
    const invert = (s) => s === 'on' ? 'off' : 'on'
    const seen = []
    for (const step of steps) {
        seen.push(...seen.map((s) => s.intersection(step,invert(s.state))).filter((s) => s))
        if (step.state === 'on') {
            seen.push(step)
        }
    }
    return seen.map((s) => s.volume()).sum()
}

function part1(data) {
    const checkBounds = ([state,x1,x2,y1,y2,z1,z2]) => Math.max(x1,x2,y1,y2,z1,z2) <= 50 && Math.min(x1,x2,y1,y2,z1,z2) >= -50
    const steps = parseInput(data).filter((c) => checkBounds(c)).map((c) => new Cube(...c))
    return run(steps)
}

function part2(data) {
    const steps = parseInput(data).map((c) => new Cube(...c))
    return run(steps)
}

const part1_expected = 590784
const part2_expected = 2758514936282235

const data = read("input.txt")
const test1 = read("test1.txt")
const test2 = read("test2.txt")

if (part1(test1) !== part1_expected) {
    throw("Part1 Test Failed")
}

print("Part1:",part1(data))

const t2 = part2(test2)
if (t2 !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))



import { loadFile as read } from "std"

const test = `
inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2
`

function parseInput(data) {
    return data.trim().split("\n").map((l) => l.split(" "))
}

function run(instructions,input) {
    const regs = new Map([["w",0],["x",0],["y",0],["z",0]])
    const reg_names = new Set(["w","x","y","z"])
    const val = (x) => reg_names.has(x) ? regs.get(x) : parseInt(x)
    for (const [i,a,b] of instructions) {
        // print(">>",i,a,b,"::",Array.from(regs),"::",input)
        switch (i) {
            case "inp":
                regs.set(a,input.shift())
                break
            case "add":
                regs.set(a,val(a)+val(b))
                break
            case "mul":
                regs.set(a,val(a)*val(b))
                break
            case "div":
                regs.set(a,Math.trunc(val(a)/val(b)))
                break
            case "mod":
                regs.set(a,Math.trunc(val(a) % val(b)))
                break
            case "eql":
                regs.set(a,val(a) === val(b) ? 1 : 0)
                break
            default:
                throw("Unkown instruction: " + [i,a,b])
        }
    }
    return regs
}

const digits = (n) => { const d = []; while (n) { d.push(n%10); n = Math.floor(n/10) }; return d.reverse() }

function part1(data) {
    const instructions = parseInput(data)
    for (let i = 11111111111111; i <= 99999999999999; ++i) {
        if (i % 1000000 === 0) { print(">>",i) }
        if (!i.toString().includes("0")){
            const out = run(instructions,digits(i))
            if (out.get("z") === 0) {
                print("VALID:",i)
            }
        }
    }
}

function part2(data) {
}

const part1_expected = 0
const part2_expected = 0

/*
if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}
*/

const data = read("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))



import * as std from "std";
import * as os from "os";

function part1(data) {
    let horiz = 0
    let depth = 0
    for (const command of data) {
        const [cmd,val] = command.trim().split(" ")
        if (cmd === "forward") {
            horiz = horiz + parseInt(val)
        } else if (cmd === "down") {
            depth = depth + parseInt(val)
        } else if (cmd === "up") {
            depth = depth - parseInt(val)
        }
    }
    return horiz*depth
}

function part2(data) {
    let horiz = 0
    let depth = 0
    let aim = 0
    for (const command of data) {
        const [cmd,val] = command.trim().split(" ")
        if (cmd === "forward") {
            horiz = horiz + parseInt(val)
            depth = depth + (aim * parseInt(val))
        } else if (cmd === "down") {
            aim = aim + parseInt(val)
        } else if (cmd === "up") {
            aim = aim - parseInt(val)
        }
    }
    return horiz*depth
}

const test = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`.trim().split("\n")

const part1_expected = 150
const part2_expected = 900

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

const data = std.loadFile("input.txt").trim().split("\n")

print("Part1:",part1(data))
print("Part2:",part2(data))

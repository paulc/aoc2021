
import { loadFile as read } from "std"

const test = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`

function parseInput(data) {
    return data.trim().split("\n")
}

function checkLine(line) {
    const stack = new Array()
    const open = ["(","[","{","<"]
    const close = [")","]","}",">"]
    const score = [3,57,1197,25137]
    for (const c of line) {
        if (open.includes(c)) {
            stack.push(c) 
        } else if (close.includes(c)) {
            if (stack.pop() !== open[close.indexOf(c)]) {
                return score[close.indexOf(c)]
            }
        } else {
            throw "Invalid character: " + c
        }
    }
    return 0
}

function fixLine(line) {
    const stack = new Array()
    const open = ["(","[","{","<"]
    const close = [")","]","}",">"]
    const score = [1,2,3,4]
    for (const c of line) {
        if (open.includes(c)) {
            stack.push(c) 
        } else if (close.includes(c)) {
            if (stack.pop() !== open[close.indexOf(c)]) {
                return 0
            }
        } else {
            throw "Invalid character: " + c
        }
    }
    return stack.reverse().map((c) => score[open.indexOf(c)]).reduce((prev,cur) => prev*5 + cur)
}

function part1(data) {
    return parseInput(data).map((l) => checkLine(l)).reduce((cur,prev) => cur + prev)
}

function part2(data) {
    const scores = parseInput(data).map((l) => fixLine(l)).filter((s) => s > 0).sort((a,b) => a-b)
    return scores[Math.floor(scores.length/2)]
}

const part1_expected = 26397
const part2_expected = 288957

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = read("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


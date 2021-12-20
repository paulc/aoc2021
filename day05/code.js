
import { loadFile as read } from "std"

const test = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`

function parseInput(data) {
    const parseXY = (s) => s.split(",").map((n) => parseInt(n))
    const parseLine = (s) => s.split(" -> ").map((s) => parseXY(s))
    return data.trim().split("\n").map((s) => parseLine(s))
}

function setupBoard(data) {
    const lines = parseInput(data)
    const maxX = lines.flat().reduce((p,[x,y]) => x > p ? x : p, 0) + 1
    const maxY = lines.flat().reduce((p,[x,y]) => y > p ? y : p, 0) + 1
    const board = new Array(maxX*maxY).fill(0)
    const convXY = (x,y) => x + (y * maxX)
    return [lines,board,convXY]
}

function drawLine(line,board,convXY) {
    const [[x1,y1],[x2,y2]] = line
    if (x1 === x2) {
        for (let y = Math.min(y1,y2); y <= Math.max(y1,y2); ++y) {
            ++board[convXY(x1,y)]
        }
    } else if (y1 === y2) {
        for (let x = Math.min(x1,x2); x <= Math.max(x1,x2); ++x) {
            ++board[convXY(x,y1)]
        }
    } else {
        const [startX,endX,startY,endY] = (x1 > x2) ? [x2,x1,y2,y1] : [x1,x2,y1,y2]
        const dy = (endY > startY) ? 1 : -1
        for (let x = startX, y = startY; x <= endX; ++x, y += dy) {
            ++board[convXY(x,y)]
        }
    }
}

function part1(data) {
    const [lines,board,convXY] = setupBoard(data)
    lines.filter(([[x1,y1],[x2,y2]]) => (x1 === x2) || (y1 === y2)).map((line) => drawLine(line,board,convXY))
    return board.filter((c) => c > 1).length
}

function part2(data) {
    const [lines,board,convXY] = setupBoard(data)
    lines.map((line) => drawLine(line,board,convXY))
    return board.filter((c) => c > 1).length
}

const data = read("input.txt")

const part1_expected = 5
const part2_expected = 12

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


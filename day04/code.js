
import { loadFile as read } from "std"

const test = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`

function parseInput(data) {
    data = data.trim().split(/\n+/)
    const lines = data.slice()
    const numbers = lines.shift().split(",").map((c) => parseInt(c))
    const boards = []
    const getRow = () => lines.shift().trim().split(/ +/).map((c) => parseInt(c))
    while (lines.length) {
        boards.push({
            numbers: new Array(5).fill(undefined).flatMap(() => getRow()),
            marked: new Array(),
            markedRows: new Array(5).fill(0),
            markedCols: new Array(5).fill(0),
            win: false
        })
    }
    return { numbers: numbers, boards: boards } 
}

function markBoard(board,draw) {
    const pos = board.numbers.indexOf(draw)
    if (pos !== -1) {
        const col = pos % 5
        const row = Math.trunc(pos/5)
        board.marked.push(draw)
        ++board.markedRows[Math.trunc(pos/5)]
        ++board.markedCols[pos%5]
        board.win = board.markedRows.includes(5) || board.markedCols.includes(5)
    }
}

function sum(a) {
    return a.reduce((prev,cur) => prev += cur)
}

function part1(data) {
    const bingo = parseInput(data)
    for (const draw of bingo.numbers) {
        for (const board of bingo.boards) {
            markBoard(board,draw)
            if (board.win) {
                return (sum(board.numbers) - sum(board.marked)) * draw
            }
        }
    }
}

function part2(data) {
    const bingo = parseInput(data)
    let lastWin
    for (const draw of bingo.numbers) {
        for (const board of bingo.boards) {
            if (!board.win) {
                markBoard(board,draw)
                if (board.win) {
                    lastWin = { board:board, draw:draw }
                }
            }
        }
    }
    return (sum(lastWin.board.numbers) - sum(lastWin.board.marked)) * lastWin.draw
}

const part1_expected = 4512
const part2_expected = 1924

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

const data = read("input.txt")

print("Part1:",part1(data))
print("Part2:",part2(data))


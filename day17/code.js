
import { loadFile as read } from "std"

const test = `
target area: x=20..30, y=-10..-5
`

function parseInput(data) {
    return Array.from(data.matchAll(/-?\d+/g)).flatMap((i) => parseInt(i))
}

function guessRange([x1,x2,y1,y2]) {
    let [min,max,sum] = [0,0,0]
    const dxrange = []
    for (min = 0, sum = 0; sum < Math.min(x1,x2); ++min ) {
        sum += min
    }
    for (max = min; sum <= Math.max(x1,x2); ++max ) {
        dxrange.push(max)
        sum += max
    }
    return dxrange
}

function launchProbe(dx,dy,[x1,x2,y1,y2]) {
    const xmin = Math.min(x1,x2),
          xmax = Math.max(x1,x2),
          ymin = Math.min(y1,y2),
          ymax = Math.max(y1,y2)
    const hit = (x,y) => x >= xmin && x <= xmax && y >= ymin && y <= ymax
    const overshot = (x,y,dx,dy) => ((dx > 0) && x > xmax) || ((dy < 0) && y < ymin)
    let [x,y,max] = [0,0,-Infinity]
    while (!hit(x,y) && !overshot(x,y,dx,dy)) {
        x += dx
        y += dy
        dx = (dx > 0) ? dx - 1 : (dx < 0) ? dx + 1 : dx
        dy -= 1
        max = (y > max) ? y : max
    }
    return [hit(x,y),max]
}

function part1(data) {
    const target = parseInput(data)
    const dxrange = guessRange(target)
    let maxY = -Infinity
    for (let dx of dxrange) {
        for (let dy = 0; dy < 500; ++dy) {
            const [hit,max] = launchProbe(dx,dy,target)
            if (hit && (max > maxY)) {
                maxY = max
            }
        }
    }
    return maxY
}

function part2(data) {
    const target = parseInput(data)
    const [startx,stopx,starty,stopy] = [0,target[1],target[2],500]
    let count = 0
    for (let dx = startx; dx <= stopx; ++dx) {
        for (let dy = starty; dy < stopy; ++dy) {
            const [hit,max] = launchProbe(dx,dy,target)
            if (hit) {
                count++
            }
        }
    }
    return count
}

const part1_expected = 45
const part2_expected = 112

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = read("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


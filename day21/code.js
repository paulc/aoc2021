
import { loadFile as read } from "std"

const test = `
Player 1 starting position: 4
Player 2 starting position: 8
`

function *deterministicDice() {
    let i = 0
    while (true) { 
        yield (i++ % 100) + 1
    }
}

function parseInput(data) {
    return data.trim().split("\n").map((l) => parseInt(l[l.length-1]))
}

function part1(data) {
    let [p1,p2] = parseInput(data)
    let [s1,s2] = [0,0]
    let rolls = 0
    const d = deterministicDice()
    const roll = (d) => { ++rolls; return d.next().value }
    while(true) {
        p1 = (p1 + roll(d) + roll(d) + roll(d)) % 10
        s1 += (p1 === 0) ? 10 : p1
        if (s1 >= 1000) {
            return s2 * rolls
        }
        p2 = (p2 + roll(d) + roll(d) + roll(d)) % 10
        s2 += (p2 === 0) ? 10 : p2
        if (s2 >= 1000) {
            return s1 * rolls
        }
    }
}

Map.prototype.incr = function(k,v) { this.has(k) ? this.set(k,this.get(k)+v) : this.set(k,v); return this.get(k) }

const encodeState = (p1,p2,s1,s2,turn) => (p1<<21) + (p2<<17) + (s1<<9) + (s2<<1) + (turn&1)
const decodeState = (n) => [(n>>21)&15,(n>>17)&15,(n>>9)&255,(n>>1)&255,n&1]
const rolls = [1,2,3].flatMap((a) => [1,2,3].flatMap((b) => [1,2,3].flatMap((c) => a+b+c)))
const score = (pos) => (pos === 0) ? 10 : pos

function quantum(states) {
    let win1 = 0, win2 = 0
    const next = new Map()
    for (const [state,count] of states) {
        const [p1,p2,s1,s2,turn] = decodeState(state)
        for (const r of rolls) {
            const new_pos = (turn === 0) ? (p1 + r) % 10 : (p2 + r) % 10
            const new_score = (turn === 0) ? s1 + score(new_pos) : s2 + score(new_pos)
            if (new_score >= 21 && turn === 0) {
                win1 += count
            } else if (new_score >= 21 && turn === 1) {
                win2 += count
            } else {
                const next_state = encodeState((turn === 0) ? new_pos : p1,
                                               (turn === 1) ? new_pos : p2, 
                                               (turn === 0) ? new_score : s1,
                                               (turn === 1) ? new_score : s2,
                                               (turn ^ 1))
                next.incr(next_state,count)
            }
        }
    }
    return [next,win1,win2]
}
            
function part2(data) {
    const [p1,p2] = parseInput(data)
    const start = encodeState(p1,p2,0,0,0)
    let states = new Map([[start,1]])
    let win1 = 0, win2 = 0, tot1 = 0, tot2 = 0
    while (states.size > 0) {
        [states,win1,win2] = quantum(states)
        tot1 += win1
        tot2 += win2
    }
    return Math.max(tot1,tot2)
}

const part1_expected = 739785
const part2_expected = 444356092776315

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = read("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


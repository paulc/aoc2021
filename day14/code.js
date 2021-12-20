
import { loadFile as read } from "std"

const test = `
NNCB\n
CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`

Map.prototype.incr = function(k,n=1) { this.has(k) ? this.set(k,this.get(k)+n) : this.set(k,n); return this.get(k) }
Map.prototype.getDefault = function(k,d) { return this.has(k) ? this.get(k) : d }

/*
function parseInput(data) {
    const [template,_,...rules] = data.trim().split("\n")
    const rulesMap = new Map(rules.map((r) => r.split(" -> ")).map(([a,b]) => [a,a[0]+b+a[1]]))
    return [template,rulesMap]
}

function run(template,rulesMap,count) {
    for (let i = 0; i < count; ++i) {
        const pairs = template.split("").map((e,i,a) => e+a[i+1])
        pairs.pop()
        template = pairs.map((p) => rulesMap.getDefault(p,p)).reduce((prev,cur) => prev.slice(0,-1) + cur)
    }
    const counter = new Map()
    template.split("").forEach((c) => counter.incr(c))
    return Math.max(...Array.from(counter.values())) - Math.min(...Array.from(counter.values()))
}
*/

function parseInput(data) {
    const [template,_,...rules] = data.trim().split("\n")
    const rulesMap = new Map(rules.map((r) => r.split(" -> ")).map(([a,b]) => [a,[a[0]+b,b+a[1]]]))
    return [template,rulesMap]
}

function run(template,rulesMap,count) {
    const pairs = template.split("").map((e,i,a) => e+a[i+1]).slice(0,-1)
    // Last element will always be pushed to end and isnt counted with pairs
    const counter = new Map([[template[template.length-1],1]])
    const pairCounter = new Map()
    pairs.forEach((p) => pairCounter.incr(p))
    for (let i = 0; i < count; ++i) {
        for (const [k,v] of Array.from(pairCounter)) {
            const [l,r] = rulesMap.get(k)
            pairCounter.incr(l,v)
            pairCounter.incr(r,v)
            pairCounter.incr(k,-v)
        }
    }
    for (const [k,v] of pairCounter) {
        counter.incr(k[0],v)
    }
    return Math.max(...Array.from(counter.values())) - Math.min(...Array.from(counter.values()))
}

function part1(data) {
    let [template,rulesMap] = parseInput(data)
    return run(template,rulesMap,10)
}

function part2(data) {
    let [template,rulesMap] = parseInput(data)
    return run(template,rulesMap,40)
}

const part1_expected = 1588
const part2_expected = 2188189693529

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = read("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


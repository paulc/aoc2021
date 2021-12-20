
import { loadFile as read } from "std"

const test = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`

function parseInput(data) {
    return data.trim().split("\n").map((s) => s.split(" | ").map((s) => s.split(" ")))
}

Set.prototype.isSubset = function (subset) { return Array.from(this).filter((e) => subset.has(e)).length === this.size } 
Map.prototype.matchValue = function (value) { for (const [k,v] of this) { if (v.size === value.size && v.isSubset(value)) { return k }}}

function mapPattern(patterns) {
    let digits = new Map()
    digits.set(1,patterns.filter(p => p.size === 2).pop())
    digits.set(7,patterns.filter(p => p.size === 3).pop())
    digits.set(4,patterns.filter(p => p.size === 4).pop())
    digits.set(8,patterns.filter(p => p.size === 7).pop())
    digits.set(3,patterns.filter(p => p.size === 5 && digits.get(1).isSubset(p)).pop())
    digits.set(9,patterns.filter(p => p.size === 6 && digits.get(4).isSubset(p)).pop())
    digits.set(0,patterns.filter(p => p.size === 6 && digits.get(1).isSubset(p) && !digits.get(3).isSubset(p)).pop())
    digits.set(5,patterns.filter(p => p.size === 5 && p.isSubset(digits.get(9)) && !digits.get(1).isSubset(p)).pop())
    digits.set(6,patterns.filter(p => p.size === 6 && digits.get(5).isSubset(p) && !digits.get(1).isSubset(p)).pop())
    digits.set(2,patterns.filter(p => p.size === 5 && !p.isSubset(digits.get(9))).pop())
    return digits
}

function part1(data) {
    return parseInput(data).flatMap(([x,y]) => y.map(z => z.length)).filter((l) => [2,3,4,7].includes(l)).length
}

function part2(data) {
    let sum = 0
    for (const [digits,values] of parseInput(data).map(([a,b]) => [mapPattern(a.map((p) => new Set(p))),b.map((v) => new Set(v))])) { 
        sum += values.reduce((prev,cur) => prev * 10 + digits.matchValue(cur),0)
    }
    return sum
}

const part1_expected = 26
const part2_expected = 61229

if (part1(test) !== part1_expected) {
    throw("Part1 Test Failed")
}

const data = read("input.txt")

print("Part1:",part1(data))

if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))


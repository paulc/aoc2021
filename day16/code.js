
import { loadFile as read } from "std"

class Packet {
    constructor(packet) {
        this.packet = packet.split("").map((x) => parseInt(x,16).toString(2).padStart(4,'0')).join("")
        this.index = 0
        this.packets = []
    } 
    getBits(n) {
        const val = parseInt(this.packet.slice(this.index,this.index+n),2)
        this.index += n
        return val
    }
    getHeader() {
        return [this.getBits(3),this.getBits(3)]
    }
    getLiteral() {
        let val = BigInt(0)
        while(this.getBits(1) === 1) {
            val = (val << BigInt(4)) + BigInt(this.getBits(4))
        }
        val = (val << BigInt(4)) + BigInt(this.getBits(4))
        return val
    }
}

class Root {
    constructor() {
        this.children = []
    }
    addChild(version,type,value) {
        const child = new Node(version,type,value)
        this.children.push(child)
        return child
    }
    eval() {
        return this.children.map((c) => c.eval())
    }
    toString() {
        return JSON.stringify(this,null,2)
    }
    flatten(f) {
        return this.children.flatMap((n) => n.flatten(f))
    }
    parse(packet) {
        const [version,type] = packet.getHeader()
        if (type === 4) {
            const value = packet.getLiteral()
            this.addChild(version,type,value)
        } else {
            const child = this.addChild(version,type)
            if (packet.getBits(1) === 0) {
                const len = packet.getBits(15)
                const end = packet.index + len
                while (packet.index < end) {
                    child.parse(packet)
                }
            } else {
                const subpackets = packet.getBits(11)
                for (let i = 0; i < subpackets; ++i) {
                    child.parse(packet)
                }
            }
        }
        return this
    }
}

class Node extends Root {
    constructor(version,type,value) {
        super()
        this.version = version
        this.type = type
        this.value = value
        this.children = []
    }
    eval(depth=0) {
        const i = (n) => "".padStart(n+1,">")
        const c = this.children.map((n) => n.eval(depth+1))
        switch (this.type) {
            case 0:     // sum
                return c.reduce((prev,cur) => prev + cur)
            case 1:     // mul
                return c.reduce((prev,cur) => prev * cur)
            case 2:     // min
                return c.reduce((prev,cur) => (cur < prev) ? cur : prev, BigInt(Number.MAX_VALUE))
            case 3:     // max
                return c.reduce((prev,cur) => (cur > prev) ? cur : prev, BigInt(0))
            case 4:     // value
                return this.value
            case 5:     // greater than
                return c[0] > c[1] ? BigInt(1) : BigInt(0)
            case 6:     // less than
                return c[0] < c[1] ? BigInt(1) : BigInt(0)
            case 7:     // equal
                return c[0] === c[1] ? BigInt(1) : BigInt(0)
            default:
                return undefined
        } 
    }
    flatten(f) {
        return [f(this),...this.children.flatMap((n) => n.flatten(f))]
    }
}

function part1(data) {
    const root = new Root()
    root.parse(new Packet(data))
    return root.flatten((n) => n.version).reduce((prev,cur) => prev + cur, 0)
}

function part2(data) {
    const root = new Root()
    root.parse(new Packet(data))
    return root.eval().pop()
}

const test1 = [["8A004A801A8002F478",16],
               ["620080001611562C8802118E34",12],
               ["C0015000016115A2E0802F182340",23],
               ["A0016C880162017C3686B18A3D4780",31]]

const test2 = [
               ["C200B40A82",3],
               ["04005AC33890",54],
               ["880086C3E88112",7],
               ["CE00C43D881120",9],
               ["D8005AC2A8F0",1],
               ["F600BC2D8F",0],
               ["9C005AC2F8F0",0],
               ["9C0141080250320F1802104A08",1],
]

for (const [packet,result] of test1) {
    if (part1(packet) !== result) {
        throw("Part1 Test Failed: " + packet)
    }
}

const data = read("input.txt")

print("Part1:",part1(data))

for (const [packet,result] of test2) {
    if (part2(packet) !== BigInt(result)) {
        throw("Part2 Test Failed: " + packet)
    }
}

print("Part2:",part2(data))


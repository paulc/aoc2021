
import * as std from "std";
import * as os from "os";

Array.prototype.sum = function() { return this.reduce((prev,cur) => prev + cur) }

const Literal = (level,version,type,value) => new Object({kind:"LITERAL",level:level,version:version,type:type,value:value})
const Operator = (level,version,type) => new Object({kind:"OPERATOR",level:level,version:version,type:type,value:undefined})

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
    parse(level=0) {
        const [version,type] = this.getHeader()
        if (type === 4) {
            const value = this.getLiteral()
            this.packets.push(Literal(level,version,type,value))
        } else {
            this.packets.push(Operator(level,version,type))
            if (this.getBits(1) === 0) {
                const len = this.getBits(15)
                const end = this.index + len
                while (this.index < end) {
                    this.parse(level+1)
                }
            } else {
                const subpackets = this.getBits(11)
                for (let i = 0; i < subpackets; ++i) {
                    this.parse(level+1)
                }
            }
        }
    }
    getHeader() {
        return [this.getBits(3),this.getBits(3)]
    }
    getLiteral() {
        let val = 0
        while(this.getBits(1) === 1) {
            val = (val << 4) + this.getBits(4)
        }
        val = (val << 4) + this.getBits(4)
        return val
    }
}

function part1(data) {
    const p = new Packet(data) 
    p.parse()
    return p.packets.map((p) => p.version).sum()
}

function part2(data) {
    const p = new Packet(data) 
    p.parse()
    print(JSON.stringify(p.packets))
}

const test1 = [["8A004A801A8002F478",16],
               ["620080001611562C8802118E34",12],
               ["C0015000016115A2E0802F182340",23],
               ["A0016C880162017C3686B18A3D4780",31]]

for (const [packet,result] of test1) {
    if (part1(packet) !== result) {
        throw("Part1 Test Failed",packet)
    }
}

const data = std.loadFile("input.txt")

print("Part1:",part1(data))

part2("C200B40A82")

/*
if (part2(test) !== part2_expected) {
    throw("Part2 Test Failed")
}

print("Part2:",part2(data))
*/


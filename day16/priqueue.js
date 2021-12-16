
Array.prototype.addPri = function(v) { let ip = 0; while (this[ip] < v && ip < this.length) { ++ip }; this.splice(ip,0,v); return this }
                        


AoC2021

Implemented in ES2020

Can be run using QuickJS (https://bellard.org/quickjs/):

- `qjs code.js`

(Some days need larger stack size: `qjs --stack-size 1000000 code.js`)

To run with V8 (about 10x faster):

- `d8 =(sed -e '/std/d' code.js)`




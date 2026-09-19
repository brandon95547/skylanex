// shotmatrix-pow.js — the proof-of-work solver for Shot Matrix, run as a Web Worker so
// the page stays responsive while it works.
//
// Finds a number n such that SHA-256("<salt>:<n>") begins with `bits` zero bits. The
// service checks the answer with a single hash (lib/pow.mjs in the shotmatrix repo).
//
// Its own SHA-256 rather than crypto.subtle: subtle.digest is asynchronous, and even
// batched two thousand at a time it managed 27–176k hashes a second across the three
// engines, where this does 800–950k. The message is always under 56 bytes — a
// 32-character salt, a colon, and at most 15 digits — so it is one block, and this only
// implements that case.
//
// EVERY 32-BIT VALUE LIVES IN A TYPED ARRAY, including the working variables, and that
// is not style. The first version kept them in plain locals initialised from hex
// literals, and ran at 1M hashes a second in Node and 16k — sixty times slower — in
// Chromium. Chromium's V8 uses pointer compression, which shrinks its small integers to
// 31 bits, so half of SHA-256's constants became heap numbers and the optimiser gave up on
// the function. Read from an Int32Array, every value is an int32 as far as the compiler
// can see, and all three engines run it at full speed.
(function () {
  "use strict";

  var K = new Int32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ]);
  var IV = new Int32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);
  var W = new Int32Array(64);
  var S = new Int32Array(8);
  var block = new Uint8Array(64);

  // Leading zero bits of SHA-256(block[0..len)). Only the first two words of the digest are
  // ever needed: no difficulty in use comes near 64 bits.
  function leadingZeros(len) {
    var i, x, y, a, b, c, d, e, f, g, h, t1, t2;
    block[len] = 0x80;
    for (i = len + 1; i < 62; i += 1) block[i] = 0;
    block[62] = (len * 8) >>> 8;
    block[63] = (len * 8) & 0xff;
    for (i = 0; i < 16; i += 1) {
      W[i] = (block[i * 4] << 24) | (block[i * 4 + 1] << 16) | (block[i * 4 + 2] << 8) | block[i * 4 + 3];
    }
    for (i = 16; i < 64; i += 1) {
      x = W[i - 15];
      y = W[i - 2];
      W[i] = (W[i - 16]
        + (((x >>> 7) | (x << 25)) ^ ((x >>> 18) | (x << 14)) ^ (x >>> 3))
        + W[i - 7]
        + (((y >>> 17) | (y << 15)) ^ ((y >>> 19) | (y << 13)) ^ (y >>> 10))) | 0;
    }
    S.set(IV);
    for (i = 0; i < 64; i += 1) {
      a = S[0]; b = S[1]; c = S[2]; d = S[3]; e = S[4]; f = S[5]; g = S[6]; h = S[7];
      t1 = (h
        + (((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7)))
        + ((e & f) ^ (~e & g))
        + K[i] + W[i]) | 0;
      t2 = ((((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10)))
        + ((a & b) ^ (a & c) ^ (b & c))) | 0;
      S[7] = g; S[6] = f; S[5] = e; S[4] = (d + t1) | 0;
      S[3] = c; S[2] = b; S[1] = a; S[0] = (t1 + t2) | 0;
    }
    x = (IV[0] + S[0]) | 0;
    if (x !== 0) return Math.clz32(x);
    return 32 + Math.clz32((IV[1] + S[1]) | 0);
  }

  function solve(salt, bits) {
    var prefix = salt + ":";
    var i, j, n, digits;
    for (i = 0; i < prefix.length; i += 1) block[i] = prefix.charCodeAt(i) & 0xff;
    for (n = 0; n < 1e15; n += 1) {
      digits = String(n);
      for (j = 0; j < digits.length; j += 1) block[prefix.length + j] = digits.charCodeAt(j);
      if (leadingZeros(prefix.length + digits.length) >= bits) return String(n);
    }
    return null;
  }

  self.onmessage = function (e) {
    self.postMessage({ nonce: solve(String(e.data.salt), Number(e.data.bits)) });
  };
})();

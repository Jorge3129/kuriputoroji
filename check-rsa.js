function modExp(a, b, n) {
  a = BigInt(a);
  b = BigInt(b);
  n = BigInt(n);
  a = a % n;
  var result = 1n;
  var x = a;
  while (b > 0n) {
    var leastSignificantBit = b % 2n;
    b = b / 2n;
    if (leastSignificantBit == 1n) {
      result = (result * x) % n;
    }
    x = (x * x) % n;
  }
  return Number(result);
}

function checkRSASignature({ x, sigX, n, e }) {
  console.log(`\nx = ${x}, sig(x) = ${sigX}, n = ${n}, e = ${e}`);
  const powMod = modExp(sigX, e, n);

  const eq = powMod === x ? `=` : `!=`;

  const answer = `σ^e (mod n) = ${sigX}^${e} (mod ${n}) = ${powMod} ${eq} x`;
  console.log(answer);

  return powMod === x;
}
console.log(checkRSASignature({ x: 123, sigX: 115, n: 221, e: 35 }));
console.log(checkRSASignature({ x: 43, sigX: 49, n: 221, e: 35 }));
console.log(checkRSASignature({ x: 87, sigX: 41, n: 221, e: 35 }));

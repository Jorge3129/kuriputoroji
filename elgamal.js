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

function modInverse(a, m) {
  a = BigInt(a);
  m = BigInt(m);
  a = ((a % m) + m) % m;
  for (let x = 1n; x < m; x++) {
    if ((a * x) % m === 1n) {
      return Number(x);
    }
  }
  return 1;
}
function mod(number, divisor) {
  if (number >= 0) {
    return number % divisor;
  } else {
    return ((number % divisor) + divisor) % divisor;
  }
}

function findBeta(g, p, sk) {
  console.log();
  let d = sk;
  const beta = modExp(g, d, p);

  const answer = `β = g^d (mod p) = ${g}^${d} (mod ${p}) = ${beta} (mod ${p})`;

  console.log(answer);

  return beta;
}

function findRS(g, p, sk, ek, m) {
  console.log();
  const d = sk;
  const r = modExp(g, ek, p);

  console.log(`r = g^ek (mod p) = ${g}^${ek} (mod ${p}) = ${r} (mod ${p})`);

  const $m = (num) => mod(num, p - 1);

  const s = $m(($m(m) - $m(d) * $m(r)) * modInverse(ek, p - 1));

  console.log(`s = (m - d * r) * (ek)^(-1) (mod p-1) = `);

  console.log(
    `= (${m} - ${d} * ${r}) * (${ek})^(-1) (mod ${p - 1}) = ${s} (mod ${p - 1})`
  );
  console.log(
    `= (${m} - ${d} * ${r}) * ${modInverse(ek, p - 1)} (mod ${
      p - 1
    }) = ${s} (mod ${p - 1})`
  );

  return [r, s];
}

findBeta(29, 101, 63);
findRS(29, 101, 63, 23, 19);

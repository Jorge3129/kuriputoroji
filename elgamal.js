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

function findBeta({ g, p, sk }) {
  console.log();
  let d = sk;
  const beta = modExp(g, d, p);

  const answer = `β = g^d (mod p) = ${g}^${d} (mod ${p}) = ${beta} (mod ${p})`;

  console.log(answer);

  return beta;
}

function findRS({ g, p, sk, ek, m }) {
  console.log();
  const d = sk;
  const r = modExp(g, ek, p);

  console.log(`r = g^ek (mod p) = ${g}^${ek} (mod ${p}) = ${r} (mod ${p})`);

  const $m = (num) => mod(num, p - 1);

  const s = $m(($m(m) - $m(d) * $m(r)) * modInverse(ek, p - 1));

  console.log();
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
function verifyRS({ beta, p, g, m, r, s }) {
  console.log();

  const $m = (num) => mod(num, p);

  const t = $m(modExp(beta, r, p) * modExp(r, s, p));
  const gm = modExp(g, m, p);

  console.log(`t = β^r * r^s (mod p) = ${beta}^${r} * ${r}^${s} (mod ${p}) =`);
  console.log(`= ${beta}^${r} * ${r}^${s} (mod ${p}) = ${t} (mod ${p})`);
  console.log();
  console.log(`g^m (mod p) = ${g}^${m} (mod ${p}) = ${gm} (mod ${p})`);
}

{
  const g = 29;
  const p = 101;
  const sk = 63;
  console.log(`\n\nPR7 Task 1`);
  const beta = findBeta({ g, p, sk });
  console.log(`\n\nPR7 Task 2`);
  const [r, s] = findRS({ g, p, sk, ek: 23, m: 19 });
  verifyRS({ beta, r, s, p, g, m: 19 });

  console.log(`\n\nPR7 Task 3`);
  verifyRS({ beta, p, g, m: 17, r: 15, s: 64 });
}

{
  const g = 23;
  const p = 97;
  const sk = 67;
  const pk = 15;
  const beta = pk;
  const [r, s] = findRS({ g, p, sk, ek: 31, m: 17 });
  verifyRS({ beta, r, s, p, g, m: 17 });

  verifyRS({ beta, p, g, m: 22, r: 37, s: 33 });
}

// findRS({ g: 23, p: 97, sk: 67, ek: 31, m: 17 });

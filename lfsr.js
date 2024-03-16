/**
 *
 * @param {number[]} cn_to_c0_list
 * @param {number[]} sn_to_s0_list
 * @param {number} n_of_iterations
 * @returns {number[]}
 */
function lfsr_seq(cn_to_c0_list, sn_to_s0_list, n_of_iterations) {
  let register = sn_to_s0_list;
  let seq = [];

  console.log("\n");

  for (let i = 0; i < n_of_iterations; i++) {
    let rev_reg = [...register].reverse();

    seq.push(rev_reg[0]);
    console.log(rev_reg.join(" ") + " | " + rev_reg[0]);

    [bit1, bit2] = cn_to_c0_list
      .map((bit, i) => [bit, i])
      .filter(([bit, _]) => bit)
      .map(([_, i]) => register[i]);

    new_bit = bit1 ^ bit2;

    register = [new_bit].concat(register.slice(0, register.length - 1));
  }

  return seq;
}

/**
 *
 * @param {string} message
 * @param {number[]} seq
 */
function lfsr_encrypt(message, seq) {
  const printData = [[], [], [], []];

  str_to_bitlist(message).forEach((bit1, i) => {
    const bit2 = seq[i];
    printData[0].push(bit1);
    printData[1].push(bit2);
    printData[2].push("-");
    printData[3].push(bit1 ^ bit2);
  });

  console.log("\n");

  printData.forEach((row) => {
    console.log(row.join(" "));
  });
}

function str_to_bitlist(str) {
  return [...str].map((c) => parseInt(c));
}

let seq = lfsr_seq([1, 0, 1], [1, 0, 0], 9);
lfsr_encrypt("1001", seq);

let seq2 = lfsr_seq([1, 0, 1], [0, 1, 1], 9);
lfsr_encrypt("1001", seq2);

/**
 *
 * @param {number[]} cn_to_c0_list
 * @param {number[]} sn_to_s0_list
 * @param {number} n_of_iterations
 * @returns {number[]}
 */
function lfsr_seq(cn_to_c0_list, sn_to_s0_list, n_of_iterations = 9) {
  let register = sn_to_s0_list;
  let seq = [];

  console.log(`\nGenerate sequence for: `);

  console.log(`cn ... c0: ${cn_to_c0_list.join(" ")}`);
  console.log(`sn ... s0: ${sn_to_s0_list.join(" ")}`);
  console.log("\nSequence generation algorithm: ");

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

  console.log(`\nSequence generated: ${seq.join("")}`);

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

  console.log(`\nEncrypt the message ${message}: `);

  printData.forEach((row) => {
    console.log(row.join(" "));
  });
}

function str_to_bitlist(str) {
  return [...str].map((c) => parseInt(c));
}

function gen_seq_and_encrypt(
  cn_to_c0_list,
  sn_to_s0_list,
  message,
  n_of_iterations
) {
  n_of_iterations ??= message.length * 2 + 1;

  const seq = lfsr_seq(cn_to_c0_list, sn_to_s0_list, n_of_iterations);

  lfsr_encrypt(message, seq);
}
gen_seq_and_encrypt([1, 0, 1], [1, 0, 0], "1001");
gen_seq_and_encrypt([1, 0, 1], [0, 1, 1], "1001");

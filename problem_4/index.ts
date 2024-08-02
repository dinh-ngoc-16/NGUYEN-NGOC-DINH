//
//complexity: 0(1)
//best solution
const sum_to_n_a = (n: number): number => {
  const lastNum = Math.abs(n);
  let result = ((1 + lastNum) * lastNum) / 2;
  return n < 0 ? result * -1 : result;
};
console.log("First solution: ", sum_to_n_a(99));

//
//complexity: O(n)
//takes the more time to execute
const sum_to_n_b = (n: number): number => {
  let result: number = 0;
  const lastNum: number = Math.abs(n);
  for (let i = 1; i < lastNum + 1; i++) {
    result += i;
  }
  return n < 0 ? result * -1 : result;
};
console.log("Second solution: ", sum_to_n_b(99));

//
//complexity: O(n)
//consumes the most memory can not use with the large number
const sum_to_n_c = (n: number): number => {
  try {
    let lastNum: number = Math.abs(n);
    if (lastNum == 0) return 0;
    if (lastNum == 1) return 1;
    return n < 0
      ? (lastNum + sum_to_n_c(lastNum - 1)) * -1
      : lastNum + sum_to_n_c(lastNum - 1);
  } catch (error) {
    console.log("Maximum call stack size exceeded");
    return -1;
  }
};
console.log("Third solution: ", sum_to_n_c(99));

// const start = performance.now();
// const end = performance.now();
// const mili = end - start;
// const seconds = mili / 1000;
// console.log(seconds);

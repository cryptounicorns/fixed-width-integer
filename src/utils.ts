/**
 * @file Various utilties for working with fixed-width integers.
 */

// PERF(mtwilliams): There's more efficient ways to compute CTZ/CLZ by
// iterating through 32-bit portions.

// /**
//  * Returns the number of leading zero bits in the 32-bit binary representation of a number.
//  */
// function clz32(x: number) {
//   return Math.clz32(x);
// }

// /**
//  * Returns the number of trailing zero bits in the 32-bit binary representation of a number.
//  */
// function ctz32(x: number) {
//   x = +x;
//   return x | 0 ? 31 - clz32(x & -x) : 32;
// }

/**
 * Counts the number of leading zero bits.
 *
 * If `int` is `0`, then `width` is returned, because all bits are `0`.
 */
export function clz(int: bigint, width: number) {
  // Most significant bit to least significant bit.
  const bits = toBitString(int, width);
  const index = bits.indexOf("1");
  return index >= 0 ? index : width;
}

/**
 * Counts the number of trailing zero bits.
 *
 * If `int` is `0`, then `width` is returned, because all bits are `0`.
 */
export function ctz(int: bigint, width: number) {
  // Least significant bit to most significant bit.
  const bits = toBitString(int, width);
  const index = bits.lastIndexOf("1");
  return index >= 0 ? width - 1 - index : width;
}

/**
 * Converts an integer into its binary representation.
 */
export function toBitString(int: bigint, width: number) {
  const bits = int.toString(2);
  return "0".repeat(width - bits.length) + bits;
}

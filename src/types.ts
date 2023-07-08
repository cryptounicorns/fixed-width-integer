/**
 * @file Defines a fixed-width integer type.
 */

/**
 * An integer type of a fixed bit width.
 */
export interface FixedWidthInteger {
  // Comparisons

  /**
   * Checks if the integer is equal to `other`.
   */
  eq(other: FixedWidthInteger): boolean;

  /**
   * Checks if the integer is not equal to `other`.
   */
  neq(other: FixedWidthInteger): boolean;

  /**
   * Checks if the integer is greater than `other`.
   */
  gt(other: FixedWidthInteger): boolean;

  /**
   * Checks if the integer is greater than or equal to `other`.
   */
  gte(other: FixedWidthInteger): boolean;

  /**
   * Checks if the integer is lesser than `other`.
   */
  lt(other: FixedWidthInteger): boolean;

  /**
   * Checks if the integer is less than or equal to `other`.
   */
  lte(other: FixedWidthInteger): boolean;

  // Operations

  /**
   * Returns the bitwise negation, or complement, of the integer.
   */
  not(): FixedWidthInteger;

  /**
   * Computes the bitwise AND with `other`.
   */
  and(other: FixedWidthInteger): FixedWidthInteger;

  /**
   * Computes the bitwise OR with `other`.
   */
  or(other: FixedWidthInteger): FixedWidthInteger;

  /**
   * Computes the bitwise XOR with `other`.
   */
  xor(other: FixedWidthInteger): FixedWidthInteger;

  /**
   * Returns the integer shifted `count` bits to the left.
   */
  shl(count: number): FixedWidthInteger;

  /**
   * Returns the integer shifted `count` bits to the right.
   */
  shr(count: number): FixedWidthInteger;

  /**
   * Returns the number of leading zero bits in the binary representation of
   * the integer.
   *
   * If no bit is set then this returns the width of the integer.
   */
  clz(): number;

  /**
   * Returns the number of trailing zero bits in the binary representation of
   * the integer.
   *
   * If no bit is set then this returns the width of the integer.
   */
  ctz(): number;

  // Conversions

  /**
   * Returns the integer as a `BigInt`.
   */
  toBigInt(): bigint;
}

/**
 * A constructor for a {@link FixedWidthInteger}.
 */
export interface FixedWidthIntegerConstructor {
  new (value: bigint | number | string): FixedWidthInteger;

  // Shorthand allows call to construct, like BigInt.
  (value: bigint | number | string): FixedWidthInteger;

  // The actual prototypes are more specific than these, but this captures the
  // interface provided by any fixed-width integer type.
  prototype: FixedWidthInteger;

  /**
   * Width of type in bits.
   */
  readonly WIDTH: number;

  /**
   * Mask covering all bits of the type.
   */
  readonly MASK: bigint;

  /**
   * Checks if `value` is within bounds of the {@link FixedWidthInteger}.
   */
  isInBounds(value: bigint): boolean;
}

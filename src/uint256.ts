/**
 * @file Implements an unsigned 256-bit integer.
 */

import { FixedWidthInteger, FixedWidthIntegerConstructor } from "./types";
import { OutOfBoundsError } from "./errors";
import * as FixedWidthIntegerUtils from "./utils";

export interface Uint256 extends FixedWidthInteger {
  /**
   * Integer stored as a BigInt.
   */
  value: bigint;
}

export interface Uint256Constructor extends FixedWidthIntegerConstructor {
  prototype: Uint256;
}

// To provide a constructor that is both newable and callable, like BigInt, we
// have to define the class and constructor this way.

/**
 * An unsigned 256-bit integer.
 */
export const Uint256 = function (
  this: Uint256 | void,
  value: bigint | number | string
) {
  if (!(this instanceof Uint256)) {
    return new Uint256(value);
  } else {
    // Coerce value to a BigInt if provided a number or a string.
    value = BigInt(value);

    if (!Uint256.isInBounds(value))
      throw new OutOfBoundsError("Supplied value exceeds width of this type.");

    this.value = value;
  }
} as Uint256Constructor;

// This works around our constructor properties being marked read only. There's
// a few ways we could approach this, but this is the least obstruse compared
// to the alternatives.
//
// If this were a larger library, with principled reduction of mutability, we
// would opt for casting through a generic `Mutable<T>` that leverages type
// modifiers (https://stackoverflow.com/questions/46634876).
Object.assign(Uint256, {
  WIDTH: 256,
  MASK: 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
});

Uint256.isInBounds = function (value: bigint) {
  return value & ~Uint256.MASK ? false : true;
};

Uint256.prototype.eq = function (other: Uint256) {
  return this.value === other.value;
};

Uint256.prototype.neq = function (other: Uint256) {
  return this.value !== other.value;
};

Uint256.prototype.gt = function (other: Uint256) {
  return this.value > other.value;
};

Uint256.prototype.gte = function (other: Uint256) {
  return this.value >= other.value;
};

Uint256.prototype.lt = function (other: Uint256) {
  return this.value < other.value;
};

Uint256.prototype.lte = function (other: Uint256) {
  return this.value <= other.value;
};

Uint256.prototype.not = function () {
  return new Uint256(~this.value & Uint256.MASK);
};

Uint256.prototype.and = function (other: Uint256) {
  return new Uint256(this.value & other.value);
};

Uint256.prototype.or = function (other: Uint256) {
  return new Uint256(this.value | other.value);
};

Uint256.prototype.xor = function (other: Uint256) {
  return new Uint256(this.value ^ other.value);
};

Uint256.prototype.shl = function (count: number) {
  return new Uint256((this.value << BigInt(count)) & Uint256.MASK);
};

Uint256.prototype.shr = function (count: number) {
  return new Uint256(this.value >> BigInt(count));
};

Uint256.prototype.clz = function () {
  return FixedWidthIntegerUtils.clz(this.value, Uint256.WIDTH);
};

Uint256.prototype.ctz = function () {
  return FixedWidthIntegerUtils.ctz(this.value, Uint256.WIDTH);
};

Uint256.prototype.toBigInt = function () {
  return BigInt.asUintN(256, this.value);
};

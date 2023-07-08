/**
 * @file Defines errors thrown by this package.
 */

/**
 * Base object for any errors thrown by this package.
 */
export class FixedWidthIntegerError extends Error {
  constructor(message: string) {
    super(message);

    // Restore prototype chain.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Raised when an operation would access or mutate bits outside the bounds of a
 * {@link FixedWidthInteger}.
 */
export class OutOfBoundsError extends FixedWidthIntegerError {
  constructor(message: string) {
    super(message);
  }
}

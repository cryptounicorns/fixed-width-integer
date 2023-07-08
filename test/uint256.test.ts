import { describe, it } from "mocha";
import { expect } from "chai";
import * as fc from "fast-check";

import { Uint256 } from "../src/index";

describe("Uint256", () => {
  it("is newable", () => {
    expect(new Uint256(0n).toBigInt()).to.be.equal(0n);
    expect(new Uint256(0).toBigInt()).to.be.equal(0n);
    expect(new Uint256("0").toBigInt()).to.be.equal(0n);
  });

  it("is callable", () => {
    expect(Uint256(0n).toBigInt()).to.be.equal(0n);
    expect(Uint256(0).toBigInt()).to.be.equal(0n);
    expect(Uint256("0").toBigInt()).to.be.equal(0n);
  });

  describe("isInBounds", () => {
    it("returns true when the supplied BigInt is within bounds", () => {
      // Verify lower and upper bounds.
      expect(Uint256.isInBounds(0n)).to.be.true;
      expect(
        Uint256.isInBounds(
          0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn
        )
      ).to.be.true;

      // Verify for anything in between bounds.
      fc.assert(
        fc.property(fc.bigUintN(256), (number) => {
          expect(Uint256.isInBounds(number)).to.be.true;
        })
      );
    });

    it("returns false when the supplied BigInt is out of bounds", () => {
      expect(Uint256.isInBounds(-1n)).to.be.false;
      expect(
        Uint256.isInBounds(
          0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn +
            1n
        )
      ).to.be.false;

      // Verify for arbitrarily negative integers.
      fc.assert(
        fc.property(fc.bigInt(-(2n ** 256n), -1n), (number) => {
          expect(Uint256.isInBounds(number)).to.be.false;
        })
      );
    });
  });

  describe("eq", () => {
    it("returns true when the numbers are the same", () => {
      fc.assert(
        fc.property(fc.bigUintN(256), (number) => {
          expect(Uint256(number).eq(Uint256(number))).to.be.true;
        })
      );
    });

    it("returns false when the numbers are different", () => {
      fc.assert(
        fc.property(
          fc
            .tuple(fc.bigUintN(256), fc.bigUintN(256))
            .filter(([x, y]) => x != y),
          ([x, y]) => {
            expect(Uint256(x).eq(Uint256(y))).to.be.false;
          }
        )
      );
    });
  });

  describe("neq", () => {
    it("returns true when the numbers are different", () => {
      fc.assert(
        fc.property(
          fc
            .tuple(fc.bigUintN(256), fc.bigUintN(256))
            .filter(([x, y]) => x != y),
          ([x, y]) => {
            expect(Uint256(x).neq(Uint256(y))).to.be.true;
          }
        )
      );
    });

    it("returns false when the numbers are the same", () => {
      fc.assert(
        fc.property(fc.bigUintN(256), (number) => {
          expect(Uint256(number).neq(Uint256(number))).to.be.false;
        })
      );
    });
  });

  describe("gt", () => {
    it("returns true when x > y and false otherwise", () => {
      fc.assert(
        fc.property(fc.tuple(fc.bigUintN(256), fc.bigUintN(256)), ([x, y]) => {
          expect(Uint256(x).gt(Uint256(y))).to.be.equal(x > y);
        })
      );
    });
  });

  describe("gte", () => {
    it("returns true when x >= y and false otherwise", () => {
      fc.assert(
        fc.property(fc.tuple(fc.bigUintN(256), fc.bigUintN(256)), ([x, y]) => {
          expect(Uint256(x).gte(Uint256(y))).to.be.equal(x >= y);
        })
      );
    });
  });

  describe("lt", () => {
    it("returns true when x < y and false otherwise", () => {
      fc.assert(
        fc.property(fc.tuple(fc.bigUintN(256), fc.bigUintN(256)), ([x, y]) => {
          expect(Uint256(x).lt(Uint256(y))).to.be.equal(x < y);
        })
      );
    });
  });

  describe("lte", () => {
    it("returns true when x <= y and false otherwise", () => {
      fc.assert(
        fc.property(fc.tuple(fc.bigUintN(256), fc.bigUintN(256)), ([x, y]) => {
          expect(Uint256(x).lte(Uint256(y))).to.be.equal(x <= y);
        })
      );
    });
  });

  describe("not", () => {
    it("inverts every bit", () => {
      Array.from(Array(256).keys()).forEach((bit) => {
        const integer = Uint256(1n << BigInt(bit));
        expect(integer.not().and(integer).toBigInt()).to.equal(0n);
      });
    });

    it("is its own inverse", () => {
      fc.assert(
        fc.property(fc.bigUintN(256), (number) => {
          const integer = Uint256(number);
          expect(integer.not().not().eq(integer)).to.be.true;
        })
      );
    });
  });

  describe("and", () => {
    it("with zero returns zero", () => {
      fc.assert(
        fc.property(fc.bigUintN(256), (number) => {
          const integer = Uint256(number);
          const zero = Uint256(0n);
          expect(integer.and(zero).eq(zero)).to.be.true;
        })
      );
    });

    it("with max returns itself", () => {
      fc.assert(
        fc.property(fc.bigUintN(256), (number) => {
          const integer = Uint256(number);
          const max = Uint256(0n).not();
          expect(integer.and(max).eq(integer)).to.be.true;
        })
      );
    });

    it("with itself returns itself", () => {
      fc.assert(
        fc.property(fc.bigUintN(256), (number) => {
          const integer = Uint256(number);
          expect(integer.and(integer).eq(integer)).to.be.true;
        })
      );
    });
  });

  describe("or", () => {
    it("with zero returns itself", () => {
      fc.assert(
        fc.property(fc.bigUintN(256), (number) => {
          const integer = Uint256(number);
          const zero = Uint256(0n);
          expect(integer.or(zero).eq(integer)).to.be.true;
        })
      );
    });

    it("with max returns max", () => {
      fc.assert(
        fc.property(fc.bigUintN(256), (number) => {
          const integer = Uint256(number);
          const max = Uint256(0n).not();
          expect(integer.or(max).eq(max)).to.be.true;
        })
      );
    });

    it("with itself returns itself", () => {
      fc.assert(
        fc.property(fc.bigUintN(256), (number) => {
          const integer = Uint256(number);
          expect(integer.or(integer).eq(integer)).to.be.true;
        })
      );
    });
  });

  describe("xor", () => {
    it("with itself returns zero", () => {
      fc.assert(
        fc.property(fc.bigUintN(256), (number) => {
          const integer = Uint256(number);
          const zero = Uint256(0n);
          expect(integer.xor(integer).eq(zero)).to.be.true;
        })
      );
    });

    it("with zero returns itself", () => {
      fc.assert(
        fc.property(fc.bigUintN(256), (number) => {
          const integer = Uint256(number);
          const zero = Uint256(0n);
          expect(integer.xor(zero).eq(integer)).to.be.true;
        })
      );
    });
  });

  describe("shl", () => {
    it("works for every bit", () => {
      Array.from(Array(256).keys()).forEach((bit) => {
        const integer = Uint256(1n).shl(bit);
        expect(integer.toBigInt()).to.equal(1n << BigInt(bit));
      });
    });

    it("drops bits shifted beyond width", () => {
      const integer = Uint256(0n).not().shl(256);
      expect(integer.toBigInt()).to.equal(0n);
    });
  });

  describe("shr", () => {
    it("works for every bit", () => {
      Array.from(Array(256).keys()).forEach((bit) => {
        const ones = (1n << 256n) - 1n;
        const integer = Uint256(ones).shr(bit);
        expect(integer.toBigInt()).to.equal(ones >> BigInt(bit));
      });
    });

    it("drops bits shifted beyond width", () => {
      const integer = Uint256(0n).not().shr(256);
      expect(integer.toBigInt()).to.equal(0n);
    });
  });

  describe("clz", () => {
    it("works for every bit", () => {
      Array.from(Array(256).keys()).forEach((bit) => {
        const ones = (1n << 256n) - 1n;
        const integer = Uint256(ones).shr(bit);
        expect(integer.clz()).to.be.equal(bit);
      });
    });
  });

  describe("ctz", () => {
    it("works for every bit", () => {
      Array.from(Array(256).keys()).forEach((bit) => {
        const integer = Uint256(1n).shl(bit);
        expect(integer.ctz()).to.be.equal(bit);
      });
    });
  });
});

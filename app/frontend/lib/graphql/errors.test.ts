/**
 * @jest-environment node
 */

import { isNotFoundError } from "./errors";

describe("#isNotFoundError", () => {
  describe("extensions.codeが「NOT_FOUND」の場合", () => {
    it("trueが返ってくる", () => {
      const err = {
        graphQLErrors: [
          {
            message: "error!!!",
            extensions: {
              code: "NOT_FOUND",
            },
          },
        ],
      };
      expect(isNotFoundError(err)).toBe(true);
    });
  });

  describe("extensions.codeが「INTERNAL_SERVER_ERROR」の場合", () => {
    it("falseが返ってくる", () => {
      const err = {
        graphQLErrors: [
          {
            message: "error!!!",
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          },
        ],
      };
      expect(isNotFoundError(err)).toBe(false);
    });
  });

  describe("err.graphQLErrors[0].extensionsが存在しない場合", () => {
    it("falseが返ってくる", () => {
      const err = {
        graphQLErrors: [
          {
            message: "error!!!",
          },
        ],
      };
      expect(isNotFoundError(err)).toBe(false);
    });
  });

  describe("err.graphQLErrors[0]が存在しない場合", () => {
    it("falseが返ってくる", () => {
      const err = {
        graphQLErrors: [],
      };
      expect(isNotFoundError(err)).toBe(false);
    });
  });

  describe("err.graphQLErrorsが存在しない場合", () => {
    it("falseが返ってくる", () => {
      const err = {};
      expect(isNotFoundError(err)).toBe(false);
    });
  });
});

import { describe, it } from "node:test";
import { addTwoPromises } from ".";

describe("Add two promises", () => {
  it("should add two promises results", async (t) => {
    const result = await addTwoPromises(Promise.resolve(2), Promise.resolve(4));

    t.assert.equal(result, 6);
  });
});

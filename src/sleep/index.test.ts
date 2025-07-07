import { describe, it } from "node:test";
import { sleep } from ".";

describe("Sleep", () => {
  it("should resolve a promise after a given time in millis", async (t) => {
    const time = 100;

    const result = await sleep(time);

    t.assert.equal(result, undefined);
  });
});

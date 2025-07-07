import { describe, it } from "node:test";
import { TimeLimitedCache } from ".";

describe("Cache With Time Limit", () => {
  it("should create cache instance with cache initialized", (t) => {
    const timeLimitedCache = new TimeLimitedCache();

    t.assert.equal(timeLimitedCache.cache[1], undefined);
  });

  it("should set a new value in cache", (t) => {
    const timeLimitedCache = new TimeLimitedCache();

    const result = timeLimitedCache.set(1, 69, 420);

    t.assert.equal(timeLimitedCache.cache[1].value, 69);
    t.assert.equal(timeLimitedCache.cache[1].duration, 420);
    t.assert.equal(result, false);
  });

  it("should get value from cache", (t) => {
    const timeLimitedCache = new TimeLimitedCache();

    timeLimitedCache.set(1, 69, 420);
    const value = timeLimitedCache.get(1);

    t.assert.equal(value, 69);
  });

  it("should return -1 if key not in cache", (t) => {
    const timeLimitedCache = new TimeLimitedCache();

    timeLimitedCache.set(1, 69, 420);
    const value = timeLimitedCache.get(2);

    t.assert.equal(value, -1);
  });

  it("should set new duration and value when key already occupied", (t) => {
    const timeLimitedCache = new TimeLimitedCache();

    const result = timeLimitedCache.set(1, 69, 420);

    t.assert.equal(timeLimitedCache.cache[1].value, 69);
    t.assert.equal(timeLimitedCache.cache[1].duration, 420);
    t.assert.equal(result, false);

    const nextResult = timeLimitedCache.set(1, 70, 421);

    t.assert.equal(timeLimitedCache.cache[1].value, 70);
    t.assert.equal(timeLimitedCache.cache[1].duration, 421);
    t.assert.equal(nextResult, true);
  });

  it("should remove key with values after set duration", (t) => {
    const timeLimitedCache = new TimeLimitedCache();

    const result = timeLimitedCache.set(1, 69, 5);

    t.assert.equal(timeLimitedCache.cache[1].value, 69);
    t.assert.equal(timeLimitedCache.cache[1].duration, 5);
    t.assert.equal(result, false);

    setTimeout(() => {
      const result = timeLimitedCache.get(1);

      t.assert.equal(result, -1);
    }, 7);
  });

  it("should return correct cache count", (t) => {
    const timeLimitedCache = new TimeLimitedCache();

    timeLimitedCache.set(1, 69, 5);
    timeLimitedCache.set(2, 69, 5);
    timeLimitedCache.set(3, 69, 5);

    const count = timeLimitedCache.count()

    t.assert.equal(count, 3)
  })

  it("should return 0 when nothing in cache", (t) => {
    const timeLimitedCache = new TimeLimitedCache();

    const count = timeLimitedCache.count()

    t.assert.equal(count, 0)
  })
});

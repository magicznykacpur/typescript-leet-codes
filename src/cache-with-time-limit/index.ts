export class TimeLimitedCache {
  cache: {
    [key: number]: { value: number; duration: number; ref: NodeJS.Timeout };
  };

  constructor() {
    this.cache = {};
  }

  set(key: number, value: number, duration: number): boolean {
    if (this.cache[key] && this.cache[key].duration > 0) {
      clearTimeout(this.cache[key].ref);

      const ref = setTimeout(() => {
        delete this.cache[key];
      }, duration);

      this.cache[key] = { value, duration, ref };

      return true;
    }

    const ref = setTimeout(() => {
      delete this.cache[key];
    }, duration);

    this.cache[key] = { value, duration, ref };

    return false;
  }

  get(key: number): number {
    return this.cache[key] ? this.cache[key].value : -1;
  }

  count(): number {
    return Object.values(this.cache).reduce((prev, curr) => {
      if (curr.duration > 0) {
        prev++;
      }
      return prev;
    }, 0);
  }
}

const timeLimitedCache = new TimeLimitedCache();
timeLimitedCache.set(1, 42, 1000); // false
timeLimitedCache.get(1); // 42
timeLimitedCache.count(); // 1

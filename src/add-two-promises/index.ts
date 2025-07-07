type P = Promise<number>;

export async function addTwoPromises(promise1: P, promise2: P): P {
  const results = await Promise.all([promise1, promise2]);

  return new Promise((resolve, _) => {
    resolve(results[0] + results[1]);
  });
}

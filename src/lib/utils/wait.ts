export async function wait(ms: number, promise: Promise<any>) {
  return new Promise((resolve) => setTimeout(resolve, ms)).then(() => promise);
}

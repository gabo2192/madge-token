export function parseBigNumber(bigint: BigInt): number {
  const n = Number(bigint);
  return n / 10 ** 8;
}

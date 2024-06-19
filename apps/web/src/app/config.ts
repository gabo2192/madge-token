const config = {
  claimableContract: process.env
    .NEXT_PUBLIC_CLAIMABLE_CONTRACT! as "0x${string}",
  tokenContract: process.env.NEXT_PUBLIC_TOKEN_CONTRACT! as "0x${string}",
  casinoContract: process.env.NEXT_PUBLIC_CASINO_CONTRACT! as "0x${string}",
};

export default config;

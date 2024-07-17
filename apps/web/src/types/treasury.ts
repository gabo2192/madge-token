export interface Treasury {
  tokenAddress: string;
  tokenName: string;
  tokenTicker: string;
}

export interface TreasuryDB {
  id: number;
  token_address: string;
  token_name: string;
  token_ticker: string;
  owner_address: string;
  balance: string;
  image_url: string;
  status: string;
  slug: string;
}

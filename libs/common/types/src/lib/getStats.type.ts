interface cryptoItem {
  name: string,
  slug: string,
  symbol: string;
  price: number;
  percentChange24h: number;
}

export interface GetStats {
  success: boolean;
  data: cryptoItem[];
}
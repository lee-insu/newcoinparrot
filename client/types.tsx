export interface KrwMarket {
  market: string;
  korean_name: string;
  english_name: string;
}

export interface KrwMarkets extends Array<KrwMarket> {}

export interface Skin {
  theme: string;
  start: string;
  loading: string;
  result: string;
}

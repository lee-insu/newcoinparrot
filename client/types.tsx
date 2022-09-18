export interface KrwMarket {
  market: string;
  korean_name: string;
  english_name: string;
}

export interface KrwMarkets extends Array<KrwMarket> {}

export interface Skin {
  theme: string;
  name: string;
  start: string;
  loading: string;
  result: string;
}

export interface MarketContents {
  market: string;
  title: string;
  sub: string;
  text: string;
  img: string;
}

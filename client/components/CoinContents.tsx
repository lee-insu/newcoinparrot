import React from 'react';
import { MarketContents } from '../types';

const CoinContents = (contents: MarketContents) => {
  return (
    <li>
      <div>{contents.img}</div>
      <div>{contents.title}</div>
    </li>
  );
};

export default CoinContents;

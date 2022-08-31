import { NextPage } from 'next';
import React from 'react';
import CoinList from '../components/CoinList';

const information: NextPage = () => {
  return (
    <section>
      <CoinList />
    </section>
  );
};

export default information;

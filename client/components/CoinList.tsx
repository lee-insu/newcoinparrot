import React from 'react';
import CoinContents from './CoinContents';

const contents = [
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
];

const CoinList = () => {
  return (
    <ul>
      {contents.map((content) => (
        <CoinContents
          market={content.market}
          title={content.title}
          sub={content.sub}
          img={content.img}
        />
      ))}
    </ul>
  );
};

export default CoinList;

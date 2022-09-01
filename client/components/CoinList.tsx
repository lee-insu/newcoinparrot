import React from 'react';
import CoinContents from './CoinContents';

const contents = [
  { market: 'bitcoin', title: '비트코인', sub: '울랄랄라', img: 'url' },
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
  { market: 'market', title: 'title', sub: 'sub', img: 'url' },
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
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <ul className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-2">
        {contents.map((content, i) => (
          <CoinContents
            key={i}
            market={content.market}
            title={content.title}
            sub={content.sub}
            img={content.img}
          />
        ))}
      </ul>
    </div>
  );
};

export default CoinList;

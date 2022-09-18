import Link from 'next/link';
import React from 'react';
import { MarketContents } from '../types';
import bitcoin from '../public/image/bitcoin.png';

const CoinContents = (contents: MarketContents) => {
  const styling = {
    backgroundImage: `url('${bitcoin.src}')`,
    width: 'auto',
    height: 'auto',
  };

  return (
    <Link
      href={{
        pathname: `/information/${contents.market}`,
        query: {
          market: contents.market,
          title: contents.title,
          sub: contents.sub,
          text: contents.text,
          img: contents.img,
        },
      }}
    >
      <li className="group cursor-pointer">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white drop-shadow-sm  xl:aspect-w-7 xl:aspect-h-8">
          <div
            className="bg-contain bg-center min-h-[200px] w-full object-cover object-center group-hover:opacity-75 bg-blue-200"
            style={styling}
          ></div>
          {/* <img
            src={contents.img}
            alt={contents.img}
            className="max-h-[200px] w-full object-cover object-center group-hover:opacity-75 bg-blue-200 "
          /> */}
          <div className="px-1 pb-4">
            <h3 className="mt-2 text-md font-bold text-gray-900">
              {contents.title}
            </h3>
            <p className="mt-1 text-sm text-gray-700">{contents.sub}</p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default CoinContents;

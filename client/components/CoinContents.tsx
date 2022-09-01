import Link from 'next/link';
import React from 'react';
import { MarketContents } from '../types';

const CoinContents = (contents: MarketContents) => {
  return (
    <Link href={`/information/${contents.market}`}>
      <li className="group ">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white drop-shadow-sm  xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={contents.img}
            alt={contents.img}
            className="min-h-[200px] w-full object-cover object-center group-hover:opacity-75 bg-blue-200"
          />
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

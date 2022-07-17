import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { KrwMarkets } from '../types';
import { Skin } from '../types';
import imageTheme from '../imageTheme.json';

const CoinImage = () => {
  const [tradePrice, getTradePrice] = useState<number>();
  const [tradeChange, getTradeChange] = useState<string>('');
  const [changeRate, getChangeRate] = useState<string>('');
  const [handleSkin, handleChangeSkin] = useState<Skin>();
  const [krwMarket, getKrwMarket] = useState<KrwMarkets>([]);
  const [coinName, getCoinName] = useState<string>('');

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;

    if (value) {
      imageTheme.map((theme) => {
        value == theme.theme ? handleChangeSkin(theme) : null;
      });
    }
  };

  const playAction = async () => {
    if (krwMarket) {
      const selected = krwMarket[Math.floor(Math.random() * krwMarket.length)];

      await axios
        .get(`https://api.upbit.com/v1/ticker?markets=${selected.market}`)
        .then((res) => {
          getCoinName(selected.korean_name);
          getTradePrice(res.data[0].trade_price);
          getTradeChange(res.data[0].change);
          getChangeRate((res.data[0].signed_change_rate * 100).toFixed(2));
        });
    } else {
      alert('홈페이지를 새로 고쳐주세요');
    }
  };

  useEffect(() => {
    return () => {
      axios.get('https://api.upbit.com/v1/market/all').then((res) => {
        const market = res.data.map((li: any) => li);
        const krw = market.filter((e: any) => {
          return e.market.includes('KRW-');
        });
        getKrwMarket(krw);
      });
    };
  }, []);

  // 스토리: 이미지가 보인다. 랜덤을 돌릴 수 있는 기능이 있다. 클릭하면 이미지가 다음으로 넘어간다. ( 그 이미지는 고정, 랜덤이미지, 결과 총 3장) 결과는 4초 뒤 코인과 가격이 보인다. (업비트 기준) 코인을 돌릴 수 있는 스킨 기능이 있다.
  return (
    <div className="w-2/3 mx-auto my-0 py-20 bg-blue-200">
      <div className="mx-auto my-0 w-full text-center">
        {handleSkin == undefined ? (
          <div>
            <div>{imageTheme[0].start}</div>
          </div>
        ) : (
          <div>
            <div>{handleSkin.start}</div>
          </div>
        )}
      </div>
      <div className="w-full bg-pink-200">
        {tradeChange && tradePrice && changeRate && coinName ? (
          <div className="w-full mx-auto my-auto text-center">
            <div>{coinName}</div>

            <div>
              {tradeChange == 'RISE' ? (
                <div className="bg-red-400">
                  <p>{tradePrice}</p>
                  <p>+{changeRate}</p>
                </div>
              ) : tradeChange == 'FALL' ? (
                <div className="bg-blue-400">
                  <p>{tradePrice}</p>
                  <p>{changeRate}</p>
                </div>
              ) : (
                <div className="bg-gray-400">
                  <p>{tradePrice}</p>
                  <p>{changeRate}</p>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <button onClick={playAction} className="w-full my-0 mx-auto">
        신탁 받기
      </button>
      <select
        name="skin"
        className="w-full py-5"
        onChange={(e) => handleChangeOption(e)}
      >
        <option value="parrot">앵무새</option>
        <option value="doge">도지</option>
        <option value="musk">머스크</option>
        <option value="rabbit">토끼</option>
      </select>
    </div>
  );
};

export default CoinImage;

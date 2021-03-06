import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { KrwMarkets } from '../types';
import { Skin } from '../types';
import imageTheme from '../imageTheme.json';

const CoinSelect = () => {
  const [tradePrice, getTradePrice] = useState<number>();
  const [tradeChange, getTradeChange] = useState<string>('');
  const [changeRate, getChangeRate] = useState<string>('');
  const [handleSkin, handleChangeSkin] = useState<Skin>();
  const [krwMarket, getKrwMarket] = useState<KrwMarkets>([]);
  const [coinName, getCoinName] = useState<string>('');

  const [start, handleStart] = useState<boolean>(true);
  const [loading, handleLoading] = useState<boolean>(false);
  const [result, handleResult] = useState<boolean>(false);

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;

    if (value) {
      imageTheme.map((theme) => {
        value == theme.theme ? handleChangeSkin(theme) : null;
      });
    }
    handleStart(true);
    handleLoading(false);
    handleResult(false);
    getTradePrice(undefined);
    getTradeChange('');
    getCoinName('');
  };

  const playAction = () => {
    result ? handleResult(false) : handleResult(false);
    handleStart(false);
    handleLoading(true);
    setTimeout(async () => {
      const selected = krwMarket[Math.floor(Math.random() * krwMarket.length)];

      await axios
        .get(`https://api.upbit.com/v1/ticker?markets=${selected.market}`)
        .then((res) => {
          getCoinName(selected.korean_name);
          getTradePrice(res.data[0].trade_price.toLocaleString('ko-KR'));
          getTradeChange(res.data[0].change);
          getChangeRate((res.data[0].signed_change_rate * 100).toFixed(2));
        });
      handleLoading(false);
      handleResult(true);
    }, 1100);
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

  // ?????????: ???????????? ?????????. ????????? ?????? ??? ?????? ????????? ??????. ???????????? ???????????? ???????????? ????????????. ( ??? ???????????? ??????, ???????????????, ?????? ??? 3???) ????????? 4??? ??? ????????? ????????? ?????????. (????????? ??????) ????????? ?????? ??? ?????? ?????? ????????? ??????.
  return (
    <div className="w-2/3 mx-auto my-0">
      <div className="mx-auto my-0 w-full h-80 py-40 text-center">
        {handleSkin == undefined ? (
          <div>
            {start ? (
              <div>{imageTheme[0].start}</div>
            ) : loading ? (
              <div>{imageTheme[0].loading}</div>
            ) : (
              <div>{imageTheme[0].result}</div>
            )}
          </div>
        ) : (
          <div>
            {start ? (
              <div>{handleSkin.start}</div>
            ) : loading ? (
              <div>{handleSkin.loading}</div>
            ) : (
              <div>{handleSkin.result}</div>
            )}
          </div>
        )}
      </div>
      <div className="w-full font-2">
        {tradeChange && tradePrice && changeRate && coinName ? (
          <div className="w-full mx-auto my-auto text-center">
            <h1 className="text-4xl font-semibold">{coinName}</h1>

            <div>
              {tradeChange == 'RISE' ? (
                <div className="py-2 text-red-500">
                  <p className="text-2xl font-semibold">{tradePrice}???</p>
                  <p>+{changeRate}%</p>
                </div>
              ) : tradeChange == 'FALL' ? (
                <div className="py-2 text-blue-500">
                  <p className="text-2xl font-semibold">{tradePrice}???</p>
                  <p>{changeRate}%</p>
                </div>
              ) : (
                <div className="py-2 text-gray-500">
                  <p className="text-2xl font-semibold">{tradePrice}???</p>
                  <p>{changeRate}%</p>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <button
        onClick={playAction}
        className="w-full h-full my-4 mx-auto py-4 text-lg rounded-lg bg-blue-400 font-bold text-white"
      >
        {start
          ? '?????? ??????'
          : loading
          ? '????????? ?????? ???...'
          : result
          ? '???..??? ?????? ??????!'
          : null}
      </button>
      <div className="w-full my-4 flex justify-center">
        <select
          name="skin"
          className="w-2/3 text-center p-1 border-2 rounded-lg"
          onChange={(e) => handleChangeOption(e)}
        >
          <option value="parrot">?????????</option>
          <option value="doge">??????</option>
          <option value="musk">?????????</option>
          <option value="rabbit">??????</option>
        </select>
      </div>
    </div>
  );
};

export default CoinSelect;

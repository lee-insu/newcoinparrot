import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { KrwMarkets } from '../types';
import { Skin } from '../types';
import imageTheme from '../imageTheme.json';
import { analytics } from '../service/firebase';
import { logEvent } from 'firebase/analytics';
import { useRouter } from 'next/router';

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

  const [adCount, setAdCount] = useState<number>(0);
  const router = useRouter();

  const DemandRsi = () => {
    logEvent(analytics, 'Demand_Coin_Rsi');
    alert('과매수, 과매도 정보가 잠시 보강중이에요🥹');
  };

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
    if (value == 'parrot') {
      logEvent(analytics, 'RD_Change_Parrot');
    } else if (value == 'doge') {
      logEvent(analytics, 'RD_Change_Doge');
    } else if (value == 'musk') {
      logEvent(analytics, 'RD_Change_Musk');
    }
  };

  const playAction = () => {
    setAdCount(adCount + 1);
    result ? handleResult(false) : handleResult(false);
    handleStart(false);
    handleLoading(true);
    getCoinName('');
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
      logEvent(analytics, 'RD_Click_Roulette');
    }, 1100);
  };

  useEffect(() => {
    // if (result) {
    //   if (adCount % 3 === 0) {
    //     router.push('/ad');
    //   }
    // }
    return () => {
      axios.get('https://api.upbit.com/v1/market/all').then((res) => {
        const market = res.data.map((li: any) => li);
        const krw = market.filter((e: any) => {
          return e.market.includes('KRW-');
        });
        getKrwMarket(krw);
      });
    };
  }, [result]);

  return (
    <div className="w-2/3 mx-auto my-0">
      <div className="mx-auto my-0 w-full h-auto py-5 text-center">
        {handleSkin == undefined ? (
          <div>
            {start ? (
              <div>
                <img
                  className="w-auto mx-auto my-0"
                  src={imageTheme[0].start}
                ></img>
                <p className="text-xl font-gmarket font-medium mt-10">
                  {imageTheme[0].name}에게 신탁을 받으세요..
                </p>
              </div>
            ) : loading ? (
              <div>
                <img
                  className="w-auto mx-auto my-0"
                  src={imageTheme[0].loading}
                ></img>
                <p className="text-xl font-gmarket font-medium mt-10">
                  신탁을 내리는 중...
                </p>
              </div>
            ) : (
              <div>
                <img
                  className="w-auto mx-auto my-0"
                  src={imageTheme[0].result}
                ></img>
                <p className="text-xl font-gmarket font-medium mt-10">
                  당신에게 내린 미친 신탁은?
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {start ? (
              <div>
                <img
                  className="w-auto mx-auto my-0"
                  src={handleSkin.start}
                ></img>
                <p className="text-xl font-gmarket font-medium mt-10">
                  {handleSkin.name}에게 신탁을 받으세요..
                </p>
              </div>
            ) : loading ? (
              <div>
                <img
                  className="w-auto mx-auto my-0"
                  src={handleSkin.loading}
                ></img>
                <p className="text-xl font-gmarket font-medium mt-10">
                  신탁을 내리는 중...
                </p>
              </div>
            ) : (
              <div>
                <img
                  className="w-auto mx-auto my-0"
                  src={handleSkin.result}
                ></img>
                <p className="text-xl font-gmarket font-medium mt-10">
                  당신에게 내린 미친 신탁은?
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="w-full font-2">
        {tradeChange && tradePrice && changeRate && coinName ? (
          <div className="w-full mx-auto my-auto text-center">
            <h1 className="text-4xl font-gmarket font-semibold">{coinName}</h1>

            <div>
              {tradeChange == 'RISE' ? (
                <div className="py-2 text-red-500">
                  <p className="text-2xl font-gamrket font-medium">
                    {tradePrice}원
                  </p>
                  <p>+{changeRate}%</p>
                </div>
              ) : tradeChange == 'FALL' ? (
                <div className="py-2 text-blue-500">
                  <p className="text-2xl font-gamrket font-medium">
                    {tradePrice}원
                  </p>
                  <p>{changeRate}%</p>
                </div>
              ) : (
                <div className="py-2 text-gray-500">
                  <p className="text-2xl font-gamrket font-medium">
                    {tradePrice}원
                  </p>
                  <p>{changeRate}%</p>
                </div>
              )}
            </div>
            <div
              onClick={DemandRsi}
              className="cursor-pointer py-2 font-gmarket font-medium text-gray-700 border-2 border-gray-200 rounded-lg"
            >
              {coinName}의 과매수, 과매도 상태는?
            </div>
          </div>
        ) : null}
      </div>
      <button
        onClick={playAction}
        className="w-full h-full font-gmarket font-semibold my-4 mx-auto py-4 text-lg rounded-lg bg-blue-400 font-bold text-white"
      >
        {start
          ? `신탁 받기`
          : loading
          ? '어서요 !!!'
          : result
          ? '한..한 번만 더요!'
          : null}
      </button>
      <div className="w-full my-4 flex justify-center">
        <select
          name="skin"
          className="w-2/3 text-center p-1 border-2 rounded-lg"
          onChange={(e) => handleChangeOption(e)}
        >
          <option value="parrot">앵무새</option>
          <option value="doge">도지</option>
          <option value="musk">일론 머스크</option>
        </select>
      </div>
    </div>
  );
};

export default CoinSelect;

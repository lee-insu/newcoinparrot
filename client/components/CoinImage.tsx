import React, { useEffect, useState } from 'react';
import styles from '../styles/Coinimage.module.css';
import axios from 'axios';

const CoinImage = () => {
  const coinApi = `https://api.upbit.com/v1/ticker?markets=KRW-BTC`;

  const [tradePrice, getTradePrice] = useState<number>();
  const [tradeChange, getTradeChange] = useState<string>('');
  const [changeRate, getChangeRate] = useState<string>('');
  const [handleeSkin, handleChangeSkin] = useState<string>('');

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;

    console.log(value);
  };

  const playAction = async () => {
    await axios.get(coinApi).then((res) => {
      getTradePrice(res.data[0].trade_price);
      getTradeChange(res.data[0].change);
      getChangeRate((res.data[0].signed_change_rate * 100).toFixed(2));
    });
  };

  console.log(tradePrice, tradeChange, changeRate);
  useEffect(() => {
    axios.get('https://api.upbit.com/v1/market/all').then((res) => {
      const market = res.data.map((li: any) => li.market);
      const btc = market.includes((e: any) => {
        return e.indexOf('KRW-');
      });
      console.log(btc);
    });
  }, []);

  // 이것으로 할 수 있는 기능은?
  // 스토리: 이미지가 보인다. 랜덤을 돌릴 수 있는 기능이 있다. 클릭하면 이미지가 다음으로 넘어간다. ( 그 이미지는 고정, 랜덤이미지, 결과 총 3장) 결과는 4초 뒤 코인과 가격이 보인다. (업비트 기준) 코인을 돌릴 수 있는 스킨 기능이 있다.

  // 이미지를 랜덤으로 고를 수 있는 기능 fetch(`https://api.upbit.com/v1/ticker?markets=${coinList}`)
  //
  return (
    <div className="w-2/3 mx-auto my-0 py-20 bg-blue-200">
      <div className="bg-green-200 mx-auto my-0 w-1/2">imagebox</div>

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

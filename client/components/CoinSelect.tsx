import React, { useEffect, useState, Fragment, useRef } from 'react';
import axios from 'axios';
import { KrwMarkets } from '../types';
import { Skin } from '../types';
import imageTheme from '../imageTheme.json';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { analytics } from '../service/firebase';
import { logEvent } from 'firebase/analytics';

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

  const [open, setOpen] = useState(false);
  const [adCount, setAdCount] = useState<number>(0);
  const cancelButtonRef = useRef(null);

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
    result ? handleResult(false) : handleResult(false);
    handleStart(false);
    handleLoading(true);
    getCoinName('');
    setAdCount(adCount + 1);
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
    if (result) {
      if (adCount % 3 === 0) {
        setOpen(true);
      }

      // setOpen(true);
    }
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
      {open ? (
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            타이틀
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">세부내용</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        닫기
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : null}
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

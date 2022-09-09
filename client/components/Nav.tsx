import Link from 'next/link';
import { analytics } from '../service/firebase';
import { logEvent } from 'firebase/analytics';

const Nav = () => {
  const DemandText = () => {
    logEvent(analytics, 'Demand_Coin_Information');
    alert('코인 한 줄 요약 정보가 잠시 보강중이에요🥹');
  };

  return (
    <nav className="flex h-[40px]">
      <Link href={'/'}>
        <div className="cursor-pointer text-2xl text-blue-600 font-cookierun font-bold w-5/6 p-3">
          코인앵무새
        </div>
      </Link>
      <div className="w-1/2 ">
        <div
          onClick={DemandText}
          className="cursor-pointer font-gmarket text-lg text-gray-700 p-3"
        >
          코인별 한 줄 요약
        </div>
      </div>
    </nav>
  );
};

export default Nav;

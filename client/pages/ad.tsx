import { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { AdBig } from '../components/Ad';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ad: NextPage = () => {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div
        onClick={goHome}
        className="min-h-screen md:w-screen lg:w-[640px] xl:w-[640px] bg-gray-800 m-auto"
      >
        <div className="p-5 text-white font-semibold text-2xl w-full h-full cursor-pointer">
          X
        </div>
        <div className="relative w-full h-screen ">
          <div className="text-white text-center"> 앵무새에게 모이 주기</div>
          <p className="text-white text-center">
            광고를 통해 앵무새에게 모이를 전달합니다. 빈칸을 누르면 다시
            되돌아갑니다.
          </p>
          <div className="absolute w-full h-[400px] text-center bottom-[24px]">
            <AdBig />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ad;

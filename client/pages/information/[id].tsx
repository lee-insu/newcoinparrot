import React from 'react';

const CoinContent = ({ item }: any) => {
  return <div>{item}</div>;
};

export default CoinContent;

export const getServerSideProps = async (context: any) => {
  const id = context.params.id;
  return {
    props: {
      item: id,
    },
  };
};

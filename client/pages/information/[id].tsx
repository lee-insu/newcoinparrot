import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const CoinContent = ({ item }: any) => {
  const router = useRouter();
  const [content, setContent] = useState<any>();

  useEffect(() => {
    return () => {
      setContent(router.query);
    };
  }, []);

  return (
    <div>
      {content ? (
        <>
          <div>{content.title}</div>
          <img src={content.img} />
          <strong>{content.sub}</strong>
          <p>{content.text}</p>
        </>
      ) : null}
    </div>
  );
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

import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="flex h-[40px]">
      <Link href={'/'}>
        <div className="cursor-pointer text-2xl text-blue-600 font-cookierun font-bold w-5/6 p-3">
          코인앵무새
        </div>
      </Link>
      <div className="w-1/6 "></div>
    </nav>
  );
};

export default Nav;

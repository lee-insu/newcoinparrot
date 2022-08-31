import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>코인앵무새</title>
        <meta name="description" content="코인앵무새" />

        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,user-scalable=no"
        ></meta>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9594488126161061"
          crossOrigin="anonymous"
        ></script>
        {/* <script
          type="text/javascript"
          src="//t1.daumcdn.net/kas/static/ba.min.js"
          async
        ></script> */}
      </Head>
      <Script
        src="//t1.daumcdn.net/kas/static/ba.min.js"
        strategy="lazyOnload"
      ></Script>
      <div className={styles.container}>
        <div className="md:w-screen lg:w-[640px] xl:w-[640px] h-auto bg-white m-auto">
          <header>
            <Nav />
          </header>

          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;

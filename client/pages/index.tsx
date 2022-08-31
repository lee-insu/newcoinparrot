import type { NextPage } from 'next';
import { AdSmall } from '../components/Ad';
import CoinSelect from '../components/CoinSelect';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <main>
        <section>
          <CoinSelect />
          <AdSmall />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;

import type { NextPage } from 'next';
import Coinroluette from '../components/Coinroluette';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className="md:w-screen lg:w-[640px] xl:w-[640px] h-screen bg-white m-auto">
        <header>
          <Nav />
        </header>
        <main>
          <section>
            <Coinroluette />
            <div>select_Coin_image</div>
            <footer>responsive</footer>
          </section>
          <section>chart</section>
        </main>
        <footer>footer</footer>
      </div>
    </div>
  );
};

export default Home;

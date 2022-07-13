import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useRouter, NextRouter } from "next/router";
import { faLocale } from "../components/locale/faLocale";
import { enLocale } from "../components/locale/enLocale";

const Home: NextPage = () => {
  const router: NextRouter = useRouter();
  const { locale } = router;
  const language = locale === "fa" ? faLocale : enLocale;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p>{language.homeDescribe}</p>
      </main>
    </div>
  )
}

export default Home;
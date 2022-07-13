import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { useRouter, NextRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();
  const { locale } = router;

  useEffect(() => {
    const direction = locale === "fa" ? "rtl" : "ltr";
    document.documentElement.dir = direction;
  }, [locale]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>

  )
}

export default MyApp

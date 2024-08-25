import Head from 'next/head';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Spreadsheet App</title>
        <meta name="description" content="A spreadsheet application built with Next.js and Tailwind CSS" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

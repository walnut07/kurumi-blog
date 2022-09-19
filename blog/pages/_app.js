import Layout from "../components/Layout";
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Kurumiのブログ</title>
        <meta property="og:site_name" content="Kurumiのブログ" />
        <meta property="og:description" content="非情報系の女子学生ががんばってプログラミングをするブログ" />
        <meta property="og:image" content="https://walnut07.com/images/image.png" />
        <meta property="twitter:card" content="summary_large_image" />
        
        { pageProps.frontmatter ?
          <>
          <meta property="og:type" content="article" />
          <meta property="og:title" content={`${pageProps.frontmatter.title}`} />
          </>
          :
          <>
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Kurumiのブログ" />
          </>
        }
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
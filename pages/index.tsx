import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Link href={'/login'}>
        <a>Login</a>
      </Link>
    </Layout>
  );
};

export default Home;

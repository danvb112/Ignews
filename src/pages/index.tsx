import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton/SubscribeButton';
import {GetStaticProps} from 'next';

import styles from './home.module.scss';
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get accessto all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton productId={product.priceId} />
        </section>

        <img src='/images/avatar.svg' alt='Gril coding'/>
      </main>

    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KveREHYWLZ2H8OUZXEnxpnX')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }

}
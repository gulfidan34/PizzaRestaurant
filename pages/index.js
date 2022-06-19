import Head from 'next/head';
import axios from 'axios';
import { Featured } from '../components/Featured';
import { PizzaList } from '../components/PizzaList';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import AddButton from '../components/AddButton';

export default function Home({ pizzaList, admin }) {
	const [close, setClose] = useState(true);
	return (
		<div className={styles.container}>
			<Head>
				<title>Best Pizza Rest in NY</title>
				<meta name="description" content="Best pizza shop in town" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Featured />
			{admin && <AddButton setClose={setClose} />}
			<PizzaList pizzaList={pizzaList} />
			{!close && <Add setClose={setClose} />}
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || '';
	let admin = false;
	if (myCookie.token === process.env.token) {
		admin = true;
	}
	const res = await axios.get('http://localhost:3000/api/products');
	return {
		props: {
			pizzaList: res.data,
			admin,
		},
	};
};

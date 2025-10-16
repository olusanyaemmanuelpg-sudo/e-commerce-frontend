/** @format */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProuctGrid } from './ProductGrid';

import './HomePage.css';

export function HomePage({ cart, loadCart }) {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const getHomeData = async () => {
			const response = await axios.get('/api/products');
			setProducts(response.data);
		};
		getHomeData();
	}, []);

	return (
		<>
			<title>Ecommerce Project</title>
			<link rel='icon' type='image/svg+xml' href='home-favicon.png' />
			<Header cart={cart} />
			<div className='home-page'>
				<ProuctGrid products={products} loadCart={loadCart} />
			</div>
		</>
	);
}

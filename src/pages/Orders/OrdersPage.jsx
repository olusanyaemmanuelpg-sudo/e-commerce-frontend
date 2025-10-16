/** @format */
import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { Header } from '../../components/Header';
import './OrdersPage.css';
import { OrderGrid } from './OrderGrid';
export function OrderPage({ cart }) {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		const fetchOrderData = async () => {
			const response = await axios.get('/api/orders?expand=products');
			setOrders(response.data);
		};
		fetchOrderData();
	}, []);
	return (
		<>
			<title>Orders</title>
			<link rel='icon' type='image/svg+xml' href='orders-favicon.png' />
			<Header cart={cart} />

			<div className='orders-page'>
				<div className='page-title'>Your Orders</div>

				<div className='orders-grid'>
					{orders.map((order) => {
						return <OrderGrid order={order} />;
					})}
				</div>
			</div>
		</>
	);
}

/** @format */
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrderPage } from './pages/Orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';

import './App.css';
import { NotFoundPage } from './pages/Notfound';

function App() {
	const apiUrl = import.meta.env.VITE_API_URL;
	const [cart, setCart] = useState([]);
	const loadCart = useCallback(async () => {
		const response = await axios.get(`${apiUrl}/api/cart-items?expand=product`);
		setCart(response.data);
	}, [apiUrl]);
	useEffect(() => {
		loadCart();
	}, [loadCart]);
	return (
		<Routes>
			<Route
				path='/'
				element={<HomePage cart={cart} loadCart={loadCart} apiUrl={apiUrl} />}
			/>
			<Route
				path='checkout'
				element={
					<CheckoutPage cart={cart} loadCart={loadCart} apiUrl={apiUrl} />
				}
			/>
			<Route
				path='orders'
				element={<OrderPage cart={cart} apiUrl={apiUrl} />}
			/>
			<Route path='tracking' element={<TrackingPage cart={cart} />} />
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;

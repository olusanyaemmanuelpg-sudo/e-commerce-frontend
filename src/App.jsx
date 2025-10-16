/** @format */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrderPage } from './pages/Orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';

import './App.css';
import { NotFoundPage } from './pages/Notfound';

function App() {
	const [cart, setCart] = useState([]);
	const loadCart = async () => {
		const response = await axios.get('/api/cart-items?expand=product');
		setCart(response.data);
	};
	useEffect(() => {
		loadCart();
	}, []);
	return (
		<Routes>
			<Route path='/' element={<HomePage cart={cart} loadCart={loadCart} />} />
			<Route
				path='checkout'
				element={<CheckoutPage cart={cart} loadCart={loadCart} />}
			/>
			<Route path='orders' element={<OrderPage cart={cart} />} />
			<Route path='tracking' element={<TrackingPage cart={cart} />} />
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;

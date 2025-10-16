/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { PaymentSummary } from './PaymentSummary';
import { CheckoutHeader } from './CheckoutHeader';
import { CheckoutOrderSummary } from './OrderSummary';
import './checkout-header.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart, loadCart }) {
	const [paymentSummary, setPaymentSummary] = useState(null);

	const [deliveryOptions, setDeliveryOptions] = useState([]);
	useEffect(() => {
		const fetchCheckoutData = async () => {
			const response = await axios.get(
				'/api/delivery-options?expand=estimatedDeliveryTime'
			);
			setDeliveryOptions(response.data);
		};
		fetchCheckoutData();
	}, []);
	useEffect(() => {
		const fetchPaymentData = async () => {
			const response = await axios.get('/api/payment-summary');
			setPaymentSummary(response.data);
		};
		fetchPaymentData();
	}, [cart]);
	return (
		<>
			<title>Checkout</title>
			<link rel='icon' type='image/svg+xml' href='cart-favicon.png' />

			<CheckoutHeader cart={cart} />
			<div className='checkout-page'>
				<div className='page-title'>Review your order</div>

				<div className='checkout-grid'>
					<CheckoutOrderSummary
						cart={cart}
						deliveryOptions={deliveryOptions}
						loadCart={loadCart}
					/>
					<PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
				</div>
			</div>
		</>
	);
}

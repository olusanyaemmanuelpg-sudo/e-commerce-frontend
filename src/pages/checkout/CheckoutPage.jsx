/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { PaymentSummary } from './PaymentSummary';
import { CheckoutHeader } from './CheckoutHeader';
import { CheckoutOrderSummary } from './OrderSummary';
import './checkout-header.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart, loadCart, apiUrl }) {
	const [paymentSummary, setPaymentSummary] = useState(null);

	const [deliveryOptions, setDeliveryOptions] = useState([]);
	useEffect(() => {
		const fetchCheckoutData = async () => {
			const response = await axios.get(
				`${apiUrl}/api/delivery-options?expand=estimatedDeliveryTime`
			);
			setDeliveryOptions(response.data);
		};
		fetchCheckoutData();
	}, [apiUrl]);
	useEffect(() => {
		const fetchPaymentData = async () => {
			const response = await axios.get(`${apiUrl}/api/payment-summary`);
			setPaymentSummary(response.data);
		};
		fetchPaymentData();
	}, [cart, apiUrl]);
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
						apiUrl={apiUrl}
					/>
					<PaymentSummary
						paymentSummary={paymentSummary}
						loadCart={loadCart}
						apiUrl={apiUrl}
					/>
				</div>
			</div>
		</>
	);
}

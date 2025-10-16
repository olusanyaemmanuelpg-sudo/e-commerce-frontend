/** @format */

import { formatCurrency } from '../../utills/money';
import axios from 'axios';
import { useNavigate } from 'react-router';

export function PaymentSummary({ paymentSummary, loadCart, apiUrl }) {
	const navigate = useNavigate();

	const createOrder = async () => {
		await axios.post(`${apiUrl}/api/orders`);
		await loadCart();
		navigate('/orders');
	};

	return (
		<>
			<div className='payment-summary'>
				<div className='payment-summary-title'>Payment Summary</div>
				{paymentSummary && (
					<>
						<div className='payment-summary-row'>
							<div>Items ({paymentSummary.totalItems}):</div>
							<div
								className='payment-summary-money'
								data-testid='payment-summary-product-cost'>
								{formatCurrency(paymentSummary.productCostCents)}
							</div>
						</div>

						<div className='payment-summary-row'>
							<div>Shipping &amp; handling:</div>
							<div
								className='payment-summary-money'
								data-testid='payment-summary-shipping-cost'>
								{formatCurrency(paymentSummary.shippingCostCents)}
							</div>
						</div>

						<div className='payment-summary-row subtotal-row'>
							<div>Total before tax:</div>
							<div
								className='payment-summary-money'
								data-testid='payment-summary-total-before-tax'>
								{formatCurrency(paymentSummary.totalCostBeforeTaxCents)}
							</div>
						</div>

						<div className='payment-summary-row'>
							<div>Estimated tax (10%):</div>
							<div
								className='payment-summary-money'
								data-testid='payment-summary-tax'>
								{formatCurrency(paymentSummary.taxCents)}
							</div>
						</div>

						<div className='payment-summary-row total-row'>
							<div>Order total:</div>
							<div
								className='payment-summary-money'
								data-testid='payment-summary-total'>
								{formatCurrency(paymentSummary.totalCostCents)}
							</div>
						</div>

						<button
							className='place-order-button button-primary'
							onClick={createOrder}>
							Place your order
						</button>
					</>
				)}
			</div>
		</>
	);
}

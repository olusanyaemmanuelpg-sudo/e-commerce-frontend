/** @format */
import dayjs from 'dayjs';
import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemDetails';
export function CheckoutOrderSummary({ cart, deliveryOptions, loadCart }) {
	return (
		<>
			<div className='order-summary'>
				{deliveryOptions.length > 0 &&
					cart.map((cartItem) => {
						const selectedDeliveryOption = deliveryOptions.find(
							(deliveryOption) => {
								return deliveryOption.id === cartItem.deliveryOptionId;
							}
						);

						return (
							<div className='cart-item-container' key={cartItem.id}>
								<div className='delivery-date'>
									Delivery date:
									{dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
										'dddd, MMMM D'
									)}
								</div>

								<div className='cart-item-details-grid'>
									<CartItemDetails cartItem={cartItem} loadCart={loadCart} />
									<DeliveryOptions
										cartItem={cartItem}
										deliveryOptions={deliveryOptions}
										loadCart={loadCart}
									/>
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
}

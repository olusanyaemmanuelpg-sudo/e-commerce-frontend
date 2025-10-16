/** @format */

import dayjs from 'dayjs';
import { Fragment } from 'react';

export function OrderDetails({ order }) {
	return (
		<>
			<div className='order-details-grid'>
				{order.products.map((OrderProduct) => {
					return (
						<Fragment key={OrderProduct.product.id}>
							<div className='product-image-container'>
								<img src={OrderProduct.product.image} />
							</div>

							<div className='product-details'>
								<div className='product-name'>{OrderProduct.product.name}</div>
								<div className='product-delivery-date'>
									Arriving on:{' '}
									{dayjs(OrderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
								</div>
								<div className='product-quantity'>
									Quantity: {OrderProduct.quantity}
								</div>
								<button className='buy-again-button button-primary'>
									<img
										className='buy-again-icon'
										src='images/icons/buy-again.png'
									/>
									<span className='buy-again-message'>Add to Cart</span>
								</button>
							</div>

							<div className='product-actions'>
								<a href='/tracking'>
									<button className='track-package-button button-secondary'>
										Track package
									</button>
								</a>
							</div>
						</Fragment>
					);
				})}
			</div>
		</>
	);
}

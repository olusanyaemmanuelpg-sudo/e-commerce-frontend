/** @format */

import { OrderHeader } from './OrderHeader';
import { OrderDetails } from './OrderDetails';
export function OrderGrid({ order }) {
	return (
		<>
			<div className='order-container' key={order.id}>
				<OrderHeader order={order} />

				<OrderDetails order={order} />
			</div>
		</>
	);
}

/** @format */
import { Product } from './Product';
export function ProuctGrid({ products, loadCart, apiUrl }) {
	return (
		<>
			<div className='products-grid'>
				{products.map((product) => {
					return (
						<>
							<Product
								key={product.id}
								loadCart={loadCart}
								product={product}
								apiUrl={apiUrl}
							/>
						</>
					);
				})}
			</div>
		</>
	);
}

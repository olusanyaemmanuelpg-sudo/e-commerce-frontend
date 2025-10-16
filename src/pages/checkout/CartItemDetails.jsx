/** @format */
import axios from 'axios';
import { useState } from 'react';
import { formatCurrency } from '../../utills/money';

export function CartItemDetails({ cartItem, loadCart }) {
	const [isUpdateQuantity, setIsUpdateQuantity] = useState(false);
	const [quantity, setQuantity] = useState(cartItem.quantity);
	const deleteCartItem = async () => {
		await axios.delete(`/api/cart-items/${cartItem.productId}`);
		await loadCart();
	};

	const updateQuantity = async () => {
		if (isUpdateQuantity) {
			await axios.put(`/api/cart-items/${cartItem.productId}`, {
				quantity: Number(quantity),
			});
			await loadCart();
			setIsUpdateQuantity(false);
		} else {
			setIsUpdateQuantity(true);
		}
	};
	const updateQuantityInput = (event) => {
		setQuantity(event.target.value);
	};
	const handleQuantityKeyDown = (event) => {
		const keyPressed = event.key;

		if (keyPressed === 'Enter') {
			updateQuantity();
		} else if (keyPressed === 'Escape') {
			setQuantity(cartItem.quantity);
			setIsUpdateQuantity(false);
		}
	};

	return (
		<>
			<img className='product-image' src={cartItem.product.image} />

			<div className='cart-item-details'>
				<div className='product-name'>{cartItem.product.name}</div>
				<div className='product-price'>
					{formatCurrency(cartItem.product.priceCents)}
				</div>
				<div className='product-quantity'>
					<span>
						Quantity:
						{isUpdateQuantity ? (
							<input
								type='text'
								className='quantity-input'
								value={quantity}
								onChange={updateQuantityInput}
								onKeyDown={handleQuantityKeyDown}
							/>
						) : (
							<span className='quantity-label'>{cartItem.quantity}</span>
						)}
					</span>
					<span
						className='update-quantity-link link-primary'
						onClick={updateQuantity}>
						Update
					</span>
					<span
						className='delete-quantity-link link-primary'
						onClick={deleteCartItem}>
						Delete
					</span>
				</div>
			</div>
		</>
	);
}

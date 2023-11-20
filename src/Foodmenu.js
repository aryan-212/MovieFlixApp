import React, { useState } from "react";
import "./FoodOrder.css";

const foodItems = [
	{
		id: 1,
		name: "Pizza",
		price: 10,
		image:
			"https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI=",
	},
	{
		id: 2,
		name: "Burger",
		price: 5,
		image:
			"https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=",
	},
	{
		id: 3,
		name: "Pasta",
		price: 8,
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaKq0kkHm3J7HmDN_LiF3PKpmelZ_Prw_Zy4BYlfsf&s",
	},
];

const FoodOrder = () => {
	const [order, setOrder] = useState(
		foodItems.map((item) => ({ ...item, quantity: 0 }))
	);

	const calculateTotalCost = () => {
		return order.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const orderTime = new Date().toLocaleTimeString();
	const expectedDeliveryTime = new Date(
		Date.now() + 60 * 1000
	).toLocaleTimeString();

	const handleQuantityChange = (itemId, quantity) => {
		const updatedOrder = order.map((item) => {
			if (item.id === itemId) {
				return { ...item, quantity: parseInt(quantity) };
			}
			return item;
		});
		setOrder(updatedOrder);
	};

	return (
		<div className="food-order">
			<h1>Food Order</h1>
			{order.map((item) => (
				<div className="food-item" key={item.id}>
					<img src={item.image} alt={item.name} />
					<h2>{item.name}</h2>
					<p>Price: ${item.price}</p>
					<input
						type="number"
						min="0"
						placeholder="Quantity"
						value={item.quantity}
						onChange={(e) => handleQuantityChange(item.id, e.target.value)}
					/>
				</div>
			))}
			<div className="order-summary">
				<h2>Order Summary</h2>
				<p>Total Cost: ${calculateTotalCost()}</p>
				<p>Order Time: {orderTime}</p>
				<p>Expected Delivery Time: {expectedDeliveryTime}</p>
			</div>
		</div>
	);
};

export default FoodOrder;
import React, { useState } from "react";
import "./FoodOrder.css";

const foodItems = [
	{
		id: 1,
		name: "Pizza",
		price: 10,
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiXsrX3Wg6oJAe4gxd8ftxXgLMBqisXyzk_6_0tKcw&s"
	},
	{
		id: 2,
		name: "Burger",
		price: 5,
		image:
			"https://upload.wikimedia.org/wikipedia/commons/4/4d/Cheeseburger.jpg"
	},
	{
		id: 3,
		name: "Pasta",
		price: 8,
		image:
			"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D",
	},
];

const FoodOrder = () =>
{
	const [ order, setOrder ] = useState(
		foodItems.map( ( item ) => ( { ...item, quantity: 0 } ) )
	);

	const calculateTotalCost = () =>
	{
		return order.reduce( ( total, item ) => total + item.price * item.quantity, 0 );
	};

	const orderTime = new Date().toLocaleTimeString();
	const expectedDeliveryTime = new Date(
		Date.now() + 60 * 1000
	).toLocaleTimeString();

	const handleQuantityChange = ( itemId, quantity ) =>
	{
		const updatedOrder = order.map( ( item ) =>
		{
			if ( item.id === itemId )
			{
				return { ...item, quantity: parseInt( quantity ) };
			}
			return item;
		} );
		setOrder( updatedOrder );
	};

	return (
		<div className="food-order">
			<h1>Food Order</h1>
			{order.map( ( item ) => (
				<div className="food-item" key={item.id}>
					<img src={item.image} alt={item.name} />
					<h2>{item.name}</h2>
					<p>Price: ${item.price}</p>
					<input
						type="number"
						min="0"
						placeholder="Quantity"
						value={item.quantity}
						onChange={( e ) => handleQuantityChange( item.id, e.target.value )}
					/>
				</div>
			) )}
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
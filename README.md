#Stationery Shop API
An Express and TypeScript-based RESTful API for managing a stationery shop with products and orders, integrated with MongoDB using Mongoose. This API supports CRUD operations, order placement, and revenue calculation.

#Features
1)CRUD Operations for Stationery Products:
Create, read, update, and delete stationery product details.
Filter products by category, name, or brand.

2)Order Management:
Place orders for stationery products.
Automatically updates product inventory upon order placement.
Handles insufficient stock scenarios gracefully.

3)Revenue Calculation:
Calculate total revenue from all orders using MongoDB's aggregation pipeline.

4)Error Handling:
Comprehensive error responses for validation errors, missing resources, and other issues.

5)Clean Code and Structure:
Modular codebase with proper separation of concerns for models, services, controllers, and routes.

#Endpoints
Product Endpoints:
Method         	Endpoint	                         Description
POST	         /api/products	            Create a new stationery product.
GET	           /api/products	            Retrieve all stationery products (supports query).
GET	           /api/products/:id	        Retrieve a specific stationery product by ID.
PUT	          /api/products/:id          	Update a stationery product.
DELETE      	/api/products/:id	           Delete a stationery product.
POST	         /api/orders              	Place an order for a stationery product.
GET         	/api/orders/revenue	        Calculate total revenue from all orders.

#Project Structure
src/
├── controllers/       # Controller logic for products and orders
├── interfaces/        # TypeScript interfaces for models
├── models/            # Mongoose schemas and models
├── routes/            # API routes
├── services/          # Business logic for database operations
├── app.ts             # Express app configuration
├── server.ts          # Server initialization

#Technologies Used
Framework: Express.js
Language: TypeScript
Database: MongoDB (Mongoose ODM)
Runtime: Node.js
Version Control: Git



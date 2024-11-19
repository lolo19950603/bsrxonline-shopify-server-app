# Shopify Order Management Server

This server application integrates with the Shopify API using the `shopify-api-node` library. It listens for order creation webhooks, validates orders based on custom conditions, and automatically cancels orders that do not meet the required criteria.

## Features
- Listens for new order creation events from Shopify.
- Validates each order based on predefined conditions.
- Automatically cancels orders that do not meet the validation conditions.

## Setup
1. Clone the repository.
2. Install the required dependencies with `npm install`.
3. Set up your environment variables (`SHOPIFY_SHOP`, `SHOPIFY_API_KEY`, `SHOPIFY_PASSWORD`) in a `.env` file.
4. Run the server with `npm start`.

## How It Works
- The server listens for incoming order creation webhooks.
- It checks each order to see if it meets the required conditions.
- If an order does not meet the conditions, it is automatically canceled using the Shopify API.

## Requirements
- Node.js
- Shopify API credentials

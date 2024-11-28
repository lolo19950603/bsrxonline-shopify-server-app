const express = require('express');
const app = express();
const Shopify = require('shopify-api-node');
require('dotenv').config();

// Add body parser middleware to parse JSON
app.use(express.json()); // For parsing application/json

const PORT = process.env.PORT || 3000;

// Initialize Shopify client
const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP, // Shopify shop name
  apiKey: process.env.SHOPIFY_API_KEY, // Admin API key
  password: process.env.SHOPIFY_PASSWORD, // Admin API password
});

// Webhook endpoint to handle order creation
app.post('/webhook/order-create', async (req, res) => {
  try {
    const orderData = req.body;

    console.log(orderData.note_attributes)

    // Validate the order against your conditions
    if (!areConditionsMet(orderData)) {
      console.log('Order does not meet conditions:', orderData);

      // Cancel the order if conditions are not met
      await cancelOrder(orderData.id);

      console.log('Order canceled:', orderData.id);
    } else {
      console.log('Order validated successfully:', orderData.id);
    }

    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Error processing webhook:', error.message);
    res.status(400).send('Bad Request');
  }
});

// Helper function to validate order conditions
function areConditionsMet(orderData) {
  // orderData.custom_attributes?.some(attr => attr.key === 'required_key')
  // Define your conditions here
  // Need to check if drop down is selected when there are icn/hp supplies
  // If ICN is selected, delivery address has to be selected clinic address
  // Need to check if the patient ids are inputed where there are  PSS items
  return true;
}

// Helper function to cancel an order using Shopify API
async function cancelOrder(orderId) {
  try {
    const result = await shopify.order.cancel(orderId);
    console.log(`Order ${orderId} successfully canceled.`);
    return result;
  } catch (error) {
    console.error(`Failed to cancel order ${orderId}:`, error.message);
    throw error;
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

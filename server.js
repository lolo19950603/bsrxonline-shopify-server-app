const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Verify Shopify HMAC for security
function verifyWebhook(req) {
  const hmac = req.headers['x-shopify-hmac-sha256'];
  const secret = process.env.SHOPIFY_API_SECRET; // Your app's API secret
  const body = JSON.stringify(req.body);
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('base64');

  return hash === hmac;
}

// Webhook endpoint to handle order creation
app.post('/webhook/order-create', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }

  const orderData = req.body;

  // Validate the order against your conditions
  if (!areConditionsMet(orderData)) {
    // Take action if conditions are not met

    // notify the customer that the condition is not met therefore order is canceled
    // Use Shopify Admin API to cancel the order
    // Send an email or notification to the customer or admin

    console.log('Order does not meet conditions:', orderData);
    
    // Optionally, notify the customer or initiate a refund
    // Use Shopify Admin API to refund the order
  } else {
    console.log('Order validated successfully:', orderData);
  }

  res.status(200).send('Webhook received');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

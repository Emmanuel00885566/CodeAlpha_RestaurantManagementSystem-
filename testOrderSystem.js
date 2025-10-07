// testOrderSystem.js
// Simple Node script to test your Order System automatically

import fetch from 'node-fetch'; // make sure to install this with: npm install node-fetch
const BASE_URL = 'http://localhost:4000/api/orders';

// Helper function to log results neatly
const log = (label, data) => {
  console.log(`\n==== ${label} ====`);
  console.log(JSON.stringify(data, null, 2));
};

// Main function to simulate workflow
const testOrders = async () => {
  try {
    console.log('🚀 Starting Order System Test...\n');

    // 1️⃣ Create a new order
    const newOrder = {
      customerName: 'Test Customer',
      items: [
        { menuId: 1, quantity: 2 },
        { menuId: 3, quantity: 1 }
      ]
    };

    const createRes = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    });
    const createdOrder = await createRes.json();
    log('1️⃣ Created Order', createdOrder);

    const orderId = createdOrder.order.id;

    // 2️⃣ Get all orders
    const allRes = await fetch(BASE_URL);
    const allOrders = await allRes.json();
    log('2️⃣ All Orders', allOrders);

    // 3️⃣ Get single order by ID
    const singleRes = await fetch(`${BASE_URL}/${orderId}`);
    const singleOrder = await singleRes.json();
    log('3️⃣ Single Order', singleOrder);

    // 4️⃣ Update order status to "completed"
    const updateRes = await fetch(`${BASE_URL}/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed' })
    });
    const updatedOrder = await updateRes.json();
    log('4️⃣ Updated Status', updatedOrder);

    console.log('\n✅ Test completed successfully!');
  } catch (error) {
    console.error('❌ Error during test:', error.message);
  }
};

testOrders();

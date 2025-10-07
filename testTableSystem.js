// testTableSystem.js
import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

console.log('🚀 Starting Table & Reservation System Test...\n');

async function testTableSystem() {
  try {
    // 1️⃣ Get all tables
    const tablesRes = await axios.get(`${API_BASE}/tables`);
    console.log('==== 🪑 All Tables ====');
    console.log(tablesRes.data);

    // 2️⃣ Get available tables
    const availableRes = await axios.get(`${API_BASE}/tables/available`);
    console.log('\n==== ✅ Available Tables ====');
    console.log(availableRes.data);

    // 3️⃣ Create a new reservation
    const newReservation = {
      name: 'Emmanuel Okoro',
      tableId: 3,
      time: '2025-10-07T19:00'
    };

    const reserveRes = await axios.post(`${API_BASE}/reservations`, newReservation);
    console.log('\n==== 📅 Created Reservation ====');
    console.log(reserveRes.data);

    // 4️⃣ View all reservations
    const reservationsRes = await axios.get(`${API_BASE}/reservations`);
    console.log('\n==== 🔍 All Reservations ====');
    console.log(reservationsRes.data);

    // 5️⃣ Cancel a reservation (using the newly created one)
    const cancelRes = await axios.delete(`${API_BASE}/reservations/${reserveRes.data.reservation.id}`);
    console.log('\n==== ❌ Canceled Reservation ====');
    console.log(cancelRes.data);

    // 6️⃣ Verify available tables again
    const availableAfterCancel = await axios.get(`${API_BASE}/tables/available`);
    console.log('\n==== 🔄 Available Tables After Cancellation ====');
    console.log(availableAfterCancel.data);

    console.log('\n✅ Table & Reservation System Test Completed Successfully!');
  } catch (error) {
    console.error('\n❌ Error during Table System Test:', error.response?.data || error.message);
  }
}

testTableSystem();

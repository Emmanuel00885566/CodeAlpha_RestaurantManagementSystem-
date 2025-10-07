import express from 'express';
import bodyParser from 'body-parser';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import tableRoutes from './routes/tableRoutes.js'; 

const app = express();
const PORT = 4000;


app.use(bodyParser.json());


app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/', tableRoutes); 

app.get('/', (req, res) => {
  res.send('Restaurant Management System API is running...');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

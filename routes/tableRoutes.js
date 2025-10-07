import express from 'express';
import {
  getAllTables,
  getAvailableTables,
  createReservation,
  cancelReservation,
  getAllReservations
} from '../controllers/tableController.js';

const router = express.Router();

router.get('/tables', getAllTables);


router.get('/tables/available', getAvailableTables);

router.get('/tables/reservations', getAllReservations);

router.post('/tables/reserve', createReservation);

router.delete('/tables/reservations/:id', cancelReservation);

export default router;

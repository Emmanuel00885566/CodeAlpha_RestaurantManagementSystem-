import { tables, reservations, generateReservationId } from '../data/tableData.js';

export const TableModel = {
 
  getAllTables() {
    return tables;
  },


  getAvailableTables() {
    return tables.filter(table => table.status === 'available');
  },


  reserveTable(name, tableId, time) {
    const table = tables.find(t => t.id === tableId);

    if (!table) {
      return { error: 'Table not found' };
    }

    if (table.status !== 'available') {
      return { error: 'Table is not available' };
    }

    const newReservation = {
      id: generateReservationId(),
      name,
      tableId,
      time,
      status: 'confirmed'
    };

    reservations.push(newReservation);

   
    table.status = 'occupied';

    return { message: 'Reservation created successfully', reservation: newReservation };
  },

  cancelReservation(reservationId) {
    const index = reservations.findIndex(r => r.id === reservationId);

    if (index === -1) {
      return { error: 'Reservation not found' };
    }

    const canceledReservation = reservations.splice(index, 1)[0];

    
    const table = tables.find(t => t.id === canceledReservation.tableId);
    if (table) {
      table.status = 'available';
    }

    return { message: 'Reservation canceled successfully', canceledReservation };
  },

 
  getAllReservations() {
    return reservations;
  }
};

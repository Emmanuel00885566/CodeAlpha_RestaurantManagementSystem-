export const tables = [
  { id: 1, number: 1, capacity: 4, status: 'available' },
  { id: 2, number: 2, capacity: 2, status: 'occupied' },
  { id: 3, number: 3, capacity: 6, status: 'available' },
  { id: 4, number: 4, capacity: 4, status: 'available' },
  { id: 5, number: 5, capacity: 2, status: 'occupied' },
  { id: 6, number: 6, capacity: 8, status: 'available' }
];

export const reservations = [
  {
    id: 101,
    name: 'John Doe',
    tableId: 2,
    time: '2025-10-07T18:00',
    status: 'confirmed'
  },
  {
    id: 102,
    name: 'Mary Johnson',
    tableId: 5,
    time: '2025-10-07T20:00',
    status: 'confirmed'
  }
];

export const generateReservationId = () => {
  return Math.floor(Math.random() * 1000000000);
};

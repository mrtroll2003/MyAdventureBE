const request = require('supertest');
const express = require('express');
const router = require('../controllers/booking'); // adjust this path to match your project structure

const app = express();
app.use(express.json());
app.use('/', router);

jest.mock('../models/booking', () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  updateOne: jest.fn(),
  updateMany: jest.fn(),
  save: jest.fn(),
}));

const Booking = require('../models/booking');

describe('Booking routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET / should return all bookings', async () => {
    Booking.find.mockResolvedValue([{ _id: '1', name: 'Test Booking' }]);
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([{ _id: '1', name: 'Test Booking' }]);
  });

  test('GET /id should return a booking by id', async () => {
    Booking.findOne.mockResolvedValue({ _id: '1', name: 'Test Booking' });
    const res = await request(app).get('/id?id=1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ _id: '1', name: 'Test Booking' });
  });

  test('POST /update-status should update a booking status', async () => {
    Booking.findOne.mockResolvedValue({ _id: '1', name: 'Test Booking' });
    Booking.updateOne.mockResolvedValue({ nModified: 1 });
    const res = await request(app).post('/update-status').send({ bookingID: '1', status: 'Confirmed' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ nModified: 1 });
  });
});
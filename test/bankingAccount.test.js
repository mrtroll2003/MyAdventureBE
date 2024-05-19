const request = require('supertest');
const express = require('express');
const router = require('../controllers/bankingAccount');

const app = express();
app.use(express.json());
app.use('/', router);

const mockBankingAccount = {
  save: jest.fn(),
};

jest.mock('../models/bankingAccount', () => {
  return jest.fn().mockImplementation(() => {
    return mockBankingAccount;
  });
});

const BankingAccount = require('../models/bankingAccount');

describe('BankingAccount routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET / should return all banking accounts', async () => {
    BankingAccount.find = jest.fn().mockResolvedValue([{ _id: '1', bankName: 'Test Bank' }]);
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([{ _id: '1', bankName: 'Test Bank' }]);
  });

  test('GET /booking should return a banking account by bookingID', async () => {
    BankingAccount.findOne = jest.fn().mockResolvedValue({ _id: '1', bankName: 'Test Bank' });
    const res = await request(app).get('/booking?bookingID=1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ _id: '1', bankName: 'Test Bank' });
  });
});
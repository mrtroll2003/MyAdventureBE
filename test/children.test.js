const request = require('supertest');
const express = require('express');
const Children = require('../models/children');
const router = require('../controllers/children');

jest.mock('../models/children');

const app = express();
app.use(express.json());
app.use(router);

test('GET / should return all children', async () => {
    const childrenArray = [{ _id: '1', name: 'Test Child' }];
    Children.find = jest.fn().mockResolvedValue(childrenArray);

    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(childrenArray);
});

test('POST /update should update a child', async () => {
    const updatedChild = {
        _id: '1',
        name: 'Updated Child',
        sex: 'Female',
        dob: '2010-01-01',
        birthCert: 'Updated Certificate',
    };

    Children.findOne = jest.fn().mockResolvedValue(updatedChild);
    Children.updateOne = jest.fn().mockResolvedValue({ nModified: 1 });

    const res = await request(app).post('/update').send(updatedChild);

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('\"Update successfully\"');
});

// Add more tests for the other routes...
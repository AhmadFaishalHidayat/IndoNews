const { test, expect, describe, beforeAll, afterAll } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');
const { User, News } = require('../models');
const { signToken } = require('../helpers/jwt');

let tokenUser1;
let tokenUser2;
beforeAll(async () => {
    let user1 = await User.create({
        "email": "admin1@gmail.com",
        "password": "admin1"
    })
    let user2 = await User.create({
        "email": "admin2@gmail.com",
        "password": "admin2"
    })

    tokenUser1 = signToken({ id: user1.id })
    tokenUser2 = signToken({ id: user2.id })
});

afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
});

describe('POST /register', () => {
    test('POST /register Success Register User', async () => {
        let user = {
            "email": "admin100@gmail.com",
            "password": "admin"
        }

        let response = await request(app).post('/register').send(user);
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    })
    test('POST /register Failed Register User because unique email', async () => {
        let user = {
            "email": "admin100@gmail.com",
            "password": "admin"
        }

        let response = await request(app).post('/register').send(user);
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    })
    test('POST /register Failed Register User because format email', async () => {
        let user = {
            "email": "admin",
            "password": "admin"
        }

        let response = await request(app).post('/register').send(user);
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    })
    test('POST /register Failed Register User because email Null', async () => {
        let user = {

            "password": "admin"
        }

        let response = await request(app).post('/register').send(user);
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    })
    test('POST /register Failed Register User because email empty', async () => {
        let user = {
            "email": "",
            "password": "admin"
        }

        let response = await request(app).post('/register').send(user);
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    })
    test('POST /register Failed Register User because password null', async () => {
        let user = {
            "email": "admin",

        }

        let response = await request(app).post('/register').send(user);
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    })
    test('POST /register Failed Register User because password empty', async () => {
        let user = {
            "email": "admin",
            "password": ""
        }

        let response = await request(app).post('/register').send(user);
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    })
})

describe('POST /login', () => {
    test('POST /login Success Login', async () => {
        let user = {
            "email": "admin1@gmail.com",
            "password": "admin1"
        }

        let response = await request(app).post('/login').send(user);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    })
    test('POST /login Failed login because email empty', async () => {
        let user = {
            "email": "",
            "password": "admin1"
        }

        let response = await request(app).post('/login').send(user);
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    })
    test('POST /login Failed login because password empty', async () => {
        let user = {
            "email": "admin1@gmail.com",
            "password": ""
        }

        let response = await request(app).post('/login').send(user);
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    })
    test('POST /login Failed Login because email invalid', async () => {
        let user = {
            "email": "admin1000@gmail.com",
            "password": "admin1"
        }

        let response = await request(app).post('/login').send(user);
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
    })
    test('POST /login Failed Login because password invalid', async () => {
        let user = {
            "email": "admin1@gmail.com",
            "password": "admin1000"
        }

        let response = await request(app).post('/login').send(user);
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
    })

})




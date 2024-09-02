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

    console.log(user1);
    tokenUser1 = signToken({ id: user1.id })
    tokenUser2 = signToken({ id: user2.id })

    await News.create({
        "title": "TEST",
        "url": "example.com",
        "UserId": 1
    })
    await News.create({
        "title": "TEST",
        "url": "example.com",
        "UserId": 1
    })
    await News.create({
        "title": "TEST",
        "url": "example.com",
        "UserId": 1
    })

});

afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
    await News.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
});

describe('GET /news', () => {
    test('GET /news Successfully get all News data', async () => {


        let response = await request(app).get('/news').set('Authorization', `Bearer ${tokenUser1}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    })

});

describe('GET /news-byuser', () => {
    test('GET /news-byuser Successfully get all News data by user', async () => {


        let response = await request(app).get('/news-byuser').set('Authorization', `Bearer ${tokenUser1}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    })

});

describe('GET /news/:id', () => {
    test('GET /news/:id Success get data by id data news', async () => {
        
        let response = await request(app).get(`/news/${1}`).set('Authorization', `Bearer ${tokenUser1}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    })
})

describe('POST /news/add', () => {
    test('POST /news/add Seccessfully add data News', async () => {

        let data = {
            "title": "TEST1",
            "url": "example.com",
            "UserId": 2
        }

        let response = await request(app).post('/news/add').send(data).set('Authorization', `Bearer ${tokenUser2}`);
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
       
    })

    test('POST /news/add created failed because you have not logged in yet', async () => {

        let data = {
            "title": "TEST",
            "url": "example.com",
            "UserId": 1
        };

        let response = await request(app).post('/news/add').send(data);
        expect(response.status).toBe(401);
    })

    test('POST /news/add created failed because empty title or url', async () => {

        let data = {
            "title": "TEST",
            "url": "",
            "UserId": 1
        }

        let response = await request(app).post('/news/add').send(data).set('Authorization', `Bearer ${tokenUser2}`);;
        expect(response.status).toBe(400);
    })

    test('POST /news/add created failed because empty title or url', async () => {

        let data = {
            "title": "",
            "url": "TEST",
            "UserId": 1
        }

        let response = await request(app).post('/news/add').send(data).set('Authorization', `Bearer ${tokenUser2}`);;
        expect(response.status).toBe(400);
    })

    test('POST /news/add created failed because NULL title or url', async () => {

        let data = {
            
            "url": "TEST",
            "UserId": 1
        }

        let response = await request(app).post('/news/add').send(data).set('Authorization', `Bearer ${tokenUser2}`);;
        expect(response.status).toBe(400);
    })

    test('POST /news/add created failed because NULL title or url', async () => {

        let data = {
            "title": "test",
            
            "UserId": 1
        }

        let response = await request(app).post('/news/add').send(data).set('Authorization', `Bearer ${tokenUser2}`);;
        expect(response.status).toBe(400);
    })
})


describe('put /news/edit/:id', () => {
    test('put /news/edit/:id Seccessfully EDIT data News', async () => {

        let data = {
            "title": "TESTEDIT",
            "url": "example.com",
            "UserId": 1
        }

        let response = await request(app).put(`/news/edit/${1}`).send(data).set('Authorization', `Bearer ${tokenUser1}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
       
    })

    test('put /news/add/:id edit failed because you have not logged in yet', async () => {

        let data = {
            "title": "TEST",
            "url": "example.com",
            "UserId": 1
        };

        let response = await request(app).put(`/news/edit/${1}`).send(data);
        expect(response.status).toBe(401);
    })

    test('put /news/add/:id edit failed because empty title or url', async () => {

        let data = {
            "title": "TEST",
            "url": "",
            "UserId": 1
        }

        let response = await request(app).put(`/news/edit/${1}`).send(data).set('Authorization', `Bearer ${tokenUser1}`);;
        expect(response.status).toBe(400);
    })

    test('put /news/add/:id edit failed because empty title or url', async () => {

        let data = {
            "title": "",
            "url": "TEST",
            "UserId": 1
        }

        let response = await request(app).put(`/news/edit/${1}`).send(data).set('Authorization', `Bearer ${tokenUser1}`);;
        expect(response.status).toBe(400);
    })

    test('put /news/add/:id edit failed because not acces Authorized', async () => {

        let data = {
            "title": "",
            "url": "TEST",
            "UserId": 2
        }

        let response = await request(app).put(`/news/edit/${1}`).send(data).set('Authorization', `Bearer ${tokenUser2}`);;
        expect(response.status).toBe(403);
    })
    test('put /news/add/:id edit failed because not found id news', async () => {

        let data = {
            "title": "",
            "url": "TEST",
            "UserId": 2
        }

        let response = await request(app).put(`/news/edit/${10}`).send(data).set('Authorization', `Bearer ${tokenUser2}`);;
        expect(response.status).toBe(404);
    })


})

describe('DELETE /news/delete/:id', () => {
    test('DELETE /news/delete/:id Success delete data news', async () => {

        let response = await request(app).delete(`/news/delete/${1}`).set('Authorization', `Bearer ${tokenUser1}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    })
    test('DELETE /news/delete/:id Failed delete because data news by id not found', async () => {

        let response = await request(app).delete(`/news/delete/${10}`).set('Authorization', `Bearer ${tokenUser1}`);
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
    })
    test('DELETE /news/delete/:id Failed delete because not authorized', async () => {

        let response = await request(app).delete(`/news/delete/${2}`).set('Authorization', `Bearer ${tokenUser2}`);
        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
    })


})



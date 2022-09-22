import request from "supertest";
import { app } from "../../app";

it('Returns a 201 on succesful signup', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(201);
});

it('Returns a 400 with an invalid email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test',
            password: '123456'
        })
        .expect(400);
});

it('Returns a 400 with an invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123'
        })
        .expect(400);
});

it('Returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});

it('Disallows duplicate email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(400);
});

it('Sets a cookie after succesful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});

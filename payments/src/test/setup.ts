import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

declare global {
    var signin: (id?: string) => string[];
}

jest.mock('../../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51LkA6lA4ioaWuXzJMrxzDvYUoL6OjgThBkDomKcTB1B1B0YPG9dO21NCjVhhczns6uB1qfxXRESXYd0sRwScvHPw00itnoHqHS';

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'asdfghj';
    process.env.NODE_ENV = 'test';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    jest.clearAllMocks();

    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signin = (id?: string) => {
    // Build a JWT payload
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com',
    }

    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build session object { jwt: MY_JWT }
    const session = { jwt: token };

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // Return a string thats the cookie with the encoded data
    return [`session=${base64}`];
}

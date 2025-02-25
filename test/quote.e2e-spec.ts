import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('QuoteController (e2e)', () => {
    let app: INestApplication;
    let accessToken: string;
    let createdQuoteId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        await request(app.getHttpServer())
        .post('/auth/register')
        .send({
            username: 'quoteTester',
            password: 'testpassword',
            email: 'quoteTester@example.com',
        })
        .expect(201);

        const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
            username: 'quoteTester',
            password: 'testpassword',
        })
        .expect(201);

        accessToken = loginResponse.body.access_token;
    });

    it('/quote (POST) - should create a quote', async () => {
        const response = await request(app.getHttpServer())
        .post('/quote')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            amount: 1000000,
            from: 'ARS',
            to: 'ETH',
        })
        .expect(201);
        
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('convertedAmount');
        createdQuoteId = response.body.id;
    });

    it('/quote/:id (GET) - should retrieve the created quote', async () => {
        const response = await request(app.getHttpServer())
        .get(`/quote/${createdQuoteId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
        
        expect(response.body).toHaveProperty('id', createdQuoteId);
        expect(response.body).toHaveProperty('from', 'ARS');
        expect(response.body).toHaveProperty('to', 'ETH');
    });

    it('/quote (GET) - unauthorized when token is missing', async () => {
        await request(app.getHttpServer())
        .get(`/quote/${createdQuoteId}`)
        .expect(401);
    });

    afterAll(async () => {
        await app.close();
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let accessToken: string;
    let createdQuoteId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/register (POST) - success', () => {
        return request(app.getHttpServer())
        .post('/auth/register')
        .send({
            username: 'testuser2',
            password: 'testpassword2',
            email: 'test2@example.com'
        })
        .expect(201)
        .then(response => {
            expect(response.body).toHaveProperty('username', 'testuser2');
            expect(response.body).not.toHaveProperty('password');
        });
        
    });

    it('/auth/login (POST) - success', () => {
        return request(app.getHttpServer())
        .post('/auth/login')
        .send({
            username: 'testuser2',
            password: 'testpassword2'
        })
        .expect(201)
        .then(response => {
            expect(response.body).toHaveProperty('access_token');
        });
    });

    it('/quote (GET) - unauthorized when token is missing', () => {
        return request(app.getHttpServer())
        .get('/quote/someId')
        .expect(401);
    });

    afterAll(async () => {
        await app.close();
    });
});

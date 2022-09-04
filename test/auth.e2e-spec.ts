import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication(e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    //To create a Application instance of App
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handle a signup request!', () => {
    const email = 'testd8@gmail.com';
    return request(app.getHttpServer())
      .post('/users/signup')
      .send({ email, password: 'rrurr' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'dddd@gmail.com';

    const res = await request(app.getHttpServer())
      .post('/users/signup')
      .send({ email, password: 'rrrr' })
      .expect(201);

    const cookie = res.get('Set-Cookie');
    return request(app.getHttpServer())
      .get('/users/whoami')
      .set('Cookie', cookie)
      .expect(200)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
});

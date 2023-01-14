import supertest from "supertest";
import app from '../../main/server';

const req = supertest(app);

describe('Endpoint Testing for user controller', () => {
    it('Should return status 201 when creating new user', (done) => {
        req
            .post('/users')
            .send({
                firstName: "firstname",
                lastname: 'lastname',
                password: 'password'
            })
            .expect(201)
            .end((err, res) => {
                expect(res.body.token).toBeDefined()
                done();
            })
    })
})
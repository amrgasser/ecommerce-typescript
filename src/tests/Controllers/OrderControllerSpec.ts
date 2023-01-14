import supertest from "supertest";
import app from '../../main/server';

const req = supertest(app);

describe('Order Controller', () => {
    it('Should return status 401 when fetching current order', (done) => {
        req
            .post('/orders')
            .expect(401)
            .end((err, res) => {
                done();
            })
    })
})
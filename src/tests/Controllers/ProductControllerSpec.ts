import supertest from "supertest";
import app from '../../main/server';

const req = supertest(app);

describe('Product Controller', () => {
    it('should create a product and status code to be 201', (done) => {
        req
            .post('/products')
            .send({
                name: "Product1",
                price: 20,
            })
            .expect(201)
            .end((err, res) => {
                done();
            })
    })

    it('should get all products', (done) => {
        req
            .get('/products')
            .expect(200)
            .end((err, res) => {
                done();
            })
    })

    it('should get a single product', (done) => {
        req
            .get('/products/1')
            .expect(200)
            .end((err, res) => {
                done();
            })
    })
})
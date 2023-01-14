import { Product, ProductStore } from "../../main/Models/Product";

const store = new ProductStore();

describe("Product Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    })

    it('index method should return a list of products', async () => {
        const res = await store.index();
        expect(res).toEqual([])
    })

    it('index method should create a product', async () => {
        const res = await store.create(
            {
                name: "ProductName",
                price: 20
            }
        );

        console.log(res);

        expect(res).toEqual(
            {
                id: 1,
                name: "ProductName",
                price: 20
            }
        )
    })

    it('delete method should show the product', async () => {

        const result = await store.show(1);

        expect(result).toEqual({
            id: 1,
            name: "ProductName",
            price: 20
        });
    });
})
import { OrderStore, Order } from "../../main/Models/Order";
import { UserStore } from "../../main/Models/User";
import { ProductStore } from "../../main/Models/Product";

const store = new OrderStore();

describe('Order Model', () => {

    it('should get current order with products', async () => {
        const res = await store.insertItemInOrder(1, 1, 10);
        expect(res).toBeDefined();
    })

    it('should get current order with products', async () => {
        const res = await store.show(1)
        expect(res.products).toBeDefined();
    })

})

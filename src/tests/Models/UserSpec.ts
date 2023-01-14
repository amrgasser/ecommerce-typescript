import { UserStore } from "../../main/Models/User";

const store = new UserStore();

describe("User Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    })

    it('index method should return a list of users', async () => {
        const res = await store.index();
        expect(res).toEqual([])
    })

    it('index method should create a user', async () => {
        const res = await store.create(
            {
                firstName: "first",
                lastname: "last",
                password: "password"
            }
        );
        console.log(res);
        expect(res.id).toEqual(1);
    })
})
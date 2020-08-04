import { testConn } from "../../../test-utils/testConn"
import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";
import { redis } from "../../../redis";
import faker from 'faker';
import { User } from "../../../entity/User";

let conn: Connection;

beforeAll(async () => {
   conn = await testConn();
   if (redis.status == "end") {
    await redis.connect();
  } 
})

afterAll(async () => {
    conn.close();
    redis.disconnect();
})

const userLoggedQuery = `
    {
    userLogged {
    id
    firstName
    lastName
    email
    }
}
`;

describe("UserLogged", () => {
    it("get user", async () =>{
        //faking user
        const user = await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }).save();

        const response = await gCall({
            source:userLoggedQuery,
            userId: user.id
        })

        expect(response).toMatchObject({
            data:{
                userLogged:{
                    id: `${user.id}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }
        })
    })

    it("return null", async () => {
        const response = await gCall({
            source: userLoggedQuery
        })

        expect(response).toMatchObject({
            data:{
                userLogged:null
            }
        })
    })
})
import { createConnection } from "typeorm"

process.env.NODE_ENV="test";

export const testConn = (drop: boolean = false) =>{
    return createConnection({
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5433,
        username: "postgres",
        password: "postgres",
        database: "type-graphql-test",
        synchronize: drop,
        dropSchema: drop,
        entities: [
            "src/entity/*.*"
        ]
    });
};
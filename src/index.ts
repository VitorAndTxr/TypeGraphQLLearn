import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import { createConnection } from "typeorm";

@Resolver()
class HelloResolver{
    //()=> tipo do retorno
    @Query(()=> String)
    async recipes(){
        return "Hello World!";
    }
}

const main = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers:[HelloResolver]
    });

    const apolloServer = new ApolloServer({schema})

    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('Servidor startadi em http://localhost:4000')
    })
}
main();
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import http from 'http'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import { typeDefs, resolvers} from './src/schema'


const startServer = async (typeDefs, resolvers) => {
    const app = express()

    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
    })

    await server.start()

    server.applyMiddleware({app})

    await new Promise(resolve => httpServer.listen({ port: 8080 }, resolve))

    console.log(`Server listening at localhost8080:${server.graphqlPath}`)
}

startServer(typeDefs, resolvers)
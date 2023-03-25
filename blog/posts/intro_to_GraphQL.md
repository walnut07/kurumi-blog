---
title: 'What is GraphQL and why are people using it?'
metaDesc: 'This article explains what "GraphQL" is and why people are using it.'
socialImage: 'images/GraphQL.svg'
date: '2023-3-25'
tags:
- GraphQL
lang: 'en'
---

REST API has been a common architecture for building APIs. 
However, in 2015, Meta (ex Facebook) has developed a new API architecture called GraphQL, 
and it has been gaining popularity since then.

In this blog post, I will give you a brief introduction to GraphQL and why people are using it!

# What is GraphQL?
**GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.** 
A query language? Yes, it is a language that lets clients ask for exactly what data they need and the GraphQL servers will return only that data.  

First things first, let's take a glance at an example code of a client and a server using GraphQL, 
so you can understand how it works!

### Setting up a GraphQL server
Apollo Server, a GraphQL server library, provides this awesome graphical interface where you can play around with you local GraphQL server:

![Apollo Server UI](https://drive.google.com/uc?id=1RVCFmrWZdT6iarP141Gv13YgyrdyI3ah)


Let's get our hands dirty with TypeScript and Apollo Server to set up a GraphQL server!
The code below is a simple example of a GraphQL server that was made based on this tutorial: [Getting Started with Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/)

Let's say we are building a system that manages users' data!
Around the comment `# Define the data`, we define the data that we took in to our system.

```js
import { ApolloServer } from '@apollo/server';
import {startStandaloneServer} from "@apollo/server/standalone";


// Define the data
const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com'},
    { id: 2, name: 'Bob', email: 'bob@example.com'},
    { id: 3, name: 'Charlie', email: 'charlie@example.com'},
];

// Define the schema
const typeDefs = `#graphql
  type Query {
    user(id: Int!): User
    users(limit: Int): [User]
  }

  type User {
    id: Int!
    name: String!
    email: String!
  }
`;

// Define the resolvers
const resolvers = {
    Query: {
        user: (parent, args) => users.find(user => user.id === args.id),
        users: (parent, args) => users.slice(0, args.limit),
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start the server
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
```

As commented in the code, the server has a list of users and the server has a GraphQL endpoint that the client can send a request to.
Now if you run the server, you can visit localhost:4000 to see the GraphQL playground!

Of course, there are a lot of other stuff you need to do to create a GraphQL server, but this is the minimum code you need to create a GraphQL server.
This document, for example, explains how we can implement authentication and authorization in a GraphQL server: https://www.apollographql.com/docs/apollo-server/security/authentication/

# Advantages and disadvantages of GraphQL?
So, why are people using GraphQL? Let me list some advantages and disadvantages of GraphQL.

## Advantages of GraphQL
### No more over-fetching or under-fetching
One of the biggest problems with REST is that it is not possible to get only the data that you need. 
However, in GraphQL, you can request the exact data that you need.
The term "over-fetching" means that you are fetching more data than you need, which commonly happens in REST.
Plus, the term "under-fetching" means that you are fetching less data than you need and end up making unnecessarily multiple requests, which also commonly happens in REST. 
With GraphQL, you can avoid both of these problems.

### No more versioning of endpoints
In REST, when you want to add a new field to a resource, you have to create a new endpoint.
This is called versioning of endpoints.
But in GraphQL, you can add a new field to a resource without creating a new endpoint.

### Benefits of a Schema and Type System
In GraphQL, you can define a schema and type system.
That means you can make sure that the client and the server are using the same data structure.
For example, if you want to get the name and email of a user, you can define the schema like this:

```js 
type User {
  name: String!
  email: String!
}
```

If a client sends a request to the server with a different data structure, the server will return an error.

### Sharing of Queries
You can use the same query in high-level components and low-level components in GraphQL.

## Disadvantages of GraphQL
There are of course disadvantages of GraphQL, and those are the two of them:

### GraphQL Query Complexity
GraphQL queries are designed to be highly flexible and allow clients to request precisely the data they need. 
However, this flexibility can also lead to extra complexity.
The logic that organize the data to send it to the client can be complex, leading to slower operations and much memory usage. 
Also, that can cause much complexity when the server communicates with databases.
Developers need to be mindful of query complexity and ensure that their APIs are optimized for performance.

### Caching Challenges
In REST, you can cache the entire resource based on the endpoint. 
You can use middleware like Redis to cache the entire resource.
However, in GraphQL, because it is designed to be flexible, it is more difficult to cache the data that was recently requested by the client.
Yet, there are some solutions to this problem. 
One of them is to implement caching on the client side. [Apollo Client](https://www.apollographql.com/docs/react/caching/overview/), for example, stores the results of your GraphQL queries in a local, normalized, in-memory cache.

## Conclusion
In this blog post, I have given you a brief introduction to GraphQL and why people are using it.
Just a reminder, GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.
GraphQL has a lot of advantages, but it also has some disadvantages such as query complexity and caching challenges.
I hope this blog post was helpful to you!
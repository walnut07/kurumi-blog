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
However, in 2015, **Meta (formerly known as Facebook) has developed a new API architecture called GraphQL, 
and it has been gaining popularity since then**.

In this blog post, we will **learn about GraphQL**, **discuss the pros and cons**, and **set up an actual GraphQL server**.
By the end of this post, you must become a fan of GraphQL!

Firstly, let's answer to this question: **what's GraphQL?**

![GraphQL logo](https://drive.google.com/uc?id=1i4ur10k-f1nu5z9KBdn-xFZTLVi28Scg)

# What is GraphQL?
**GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.** 
A query language? Yes, it is a language that lets clients ask for exactly what data they need and the GraphQL servers will return only that data.  

Here's an example of a query:
```graphql
# A query of user data that has id, name, and email
user(id: $userId) {
    id,
    name,
    email
}
```

Essentially, **the beauty of using GraphQL is that clients send a query that requests the exact data they need**.
In other words, clients no longer have to send multiple requests to the server to collect all the data they need.
(Do you come up with the times when you had to make multiple requests to the REST server to get all the data you need?)

Now, let's take a look at their advantages and disadvantages to obtain a better understanding of it.

# Advantages and disadvantages of GraphQL
So, why are people using GraphQL? Here's the list of the advantages and disadvantages of GraphQL.

## Advantages of GraphQL
### No more over-fetching or under-fetching
One of the biggest problems with REST is that **it is not possible to get only the data that you need**.
You have to request the entire resource, and the server will return the entire resource.
That means you have to send multiple requests to the server to fetch all the data you need.
Otherwise, if you don't send enough requests, you will end up with an incomplete data set.
That means you have to send too many requests to the server to get the data you need.

In GraphQL, you can overcome these issues by sending a query to the server to get the exact data you need.

### No more versioning of endpoints
In REST, when you want to add a new field to a resource, you have to create a new endpoint.
This is called versioning of endpoints.
But in GraphQL, **you can add a new field to a resource without having to create a new endpoint**. 
GraphQL allows you to have a lot of flexibility, which leads to faster frontend/back-end development.

### Benefits of a Schema and Type System
In GraphQL, you can define a schema and type system.
That means **you can make sure that the client and the server are using the same data structure**.
For example, if you want to get the name and email of a user, you can define the schema like this:

```js 
type User {
  name: String!
  email: String!
}
```

If a client sends a request to the server with a different data structure, the server will return an error.

### Sharing of Queries
Last but not least, **you can use the same query in high-level components and low-level components in GraphQL**.
For example, if you have a high-level component that displays a list of users, 
you can use the same query in a low-level component that displays a single user.

## Disadvantages of GraphQL
There are of course disadvantages of GraphQL, and those are two of them:

### GraphQL Query Complexity
GraphQL queries are designed to be highly flexible and allow clients to request precisely the data they need.
However, **this flexibility can also lead to extra complexity**.
The logic that organizes data in servers can be complex, leading to slower operations and much memory usage.
Also, when the server communicates with databases, 
they might need to perform multiple queries to get the data they need.
Developers need to be mindful of query complexity and ensure that their APIs are optimized for performance.

*This article explains how the N+1 problem occurs in GraphQL and solutions to it: [hygraph - How to solve the GraphQL n+1 problem](https://hygraph.com/blog/graphql-n-1-problem)*

### Caching Challenges
In REST, you can cache the entire resource based on the endpoint.
For example, you can use middleware like Redis to cache the entire resource by endpoints.
However, **in GraphQL, because it is designed to be flexible, it is more difficult to cache the entire data that was recently requested by the client**.
Yet, there are some solutions to this problem.
One of them is to implement caching on the client side. 
[Apollo Client](https://www.apollographql.com/docs/react/caching/overview/), for example, stores the results of your GraphQL queries in a local, normalized, in-memory cache.

Those were the advantages and disadvantages of GraphQL.
Now, you must be excited about actually setting up a GraphQL server. 
Let's move on to the next section.

### Setting up a GraphQL server
**It's the time for us to get our hands dirty with TypeScript and Apollo Server** to set up a GraphQL server!
**Apollo Server**, a GraphQL server library, **provides this awesome graphical interface where you can interact with your local GraphQL server**:
![Apollo Server UI](https://drive.google.com/uc?id=1RVCFmrWZdT6iarP141Gv13YgyrdyI3ah)

The following code is a simple example of a GraphQL server that was made based on this tutorial: [Getting Started with Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/)


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

As commented in the code, the server has a list of users, and it can accept queries whose parameters can be `user` or/and `users`.
Now if you run the server, you can visit [localhost:4000](localhost:4000) to see the GraphQL playground!

Of course, there are a lot of other stuff you need to do to create a GraphQL server that works in production, 
but this is the minimum code that you need to get an idea of GraphQL.
This document, for example, explains how we can implement authentication and authorization in a GraphQL server: [Apollo Docs - Authentication and authorization](https://www.apollographql.com/docs/apollo-server/security/authentication/)

## Conclusion
In this blog post, I have given you a brief introduction to GraphQL.
We have learned that GraphQL is a query language for APIs that allows clients to request the exact data that they want.
We have also set up an actual GraphQL server.
Remember that GraphQL has disadvantages such as query complexity and caching challenges while its flexibility is just awesome.
---
title: 'What is cache? from computer architecture to application architecture'
metaDesc: 'This article explains what cache is.'
socialImage: 'images/cpu.jpg'
date: '2023-4-14'
tags:
- 'System Design'
- 'Frontend'
- 'Backend'
lang: 'en'
---

In modern applications, caching is a common technique to improve performance. In this article, I will explain what cache is and how it works.

## What is cache?
In short, cache is a temporary storage for data that is frequently accessed.
The concept caching is everywhere in any computer-science related fields. 
For example, in database, caching is used to improve the performance of database queries. In computer architecture, caching is used to improve the performance of data access. 

In this article, I will first explain what cache is in computer architecture. Then, I will explain how cache works in application architectures.

## What is cache in computer architecture?
Memory is a temporary storage for data. There are multiple layers of memory in a computer.

This is the hierarchy of the memory in a computer:
- CPU
- L1 cache
- L2 cache
- RAM
- Hard disk
- Magnetic memory
- L3 cache

Why do we need multiple layers of memory? That is because the speed, the cost, and the capacity of each memory are different.
For example, CPU is the fastest memory, but it is the most expensive and has the smallest capacity.
(Here, the adjective "fast" means the time it takes to access data in memory. CPU register takes the shortest time to access data compared to other memories.)
Because CPU is the most expensive and has the smallest capacity, we don't want to store unnecessary data in CPU. 
We only want to get data that we will likely use in the near future to be stored in CPU.
Therefore, we want to take advantage of the caching technique here; we want to store data that we will likely access in the near future in CPU.

But, how do we decide which data we want to store in a higher level of memory? 
There are two principles that Computer Architecture uses to decide which data we will likely access in the near future:
1. **Temporal locality**: **the data that is accessed recently** is likely to be accessed again in the near future.
2. **Spatial locality**: **the data that is accessed nearby** is likely to be accessed again in the near future.

So, so far, we have learned that cache is a temporary storage for data that is frequently accessed, and there are multiple layers of cache in a computer architecture.
Now let's see how cache works in software architecture!

## How cache works in application architecture?
Again, application architectures often have multiple layers of cache, and I'll introduce some of them.

### Browser cache
Web browsers (such as Chrome, Firefox, and Safari) can cache HTTP responses.
When a browser sends an HTTP request to a server, the server can return an HTTP response with a header called [Cache-Control](), [Age](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Age), `Expires`, and so on.
They are used to tell the browser whether browser can cache the response or not.

This is an example of an HTTP response with `Age` and `Cache-Control` header:
```
age: 55539
cache-control: public, max-age=31536000
```
The Age header contains the time in seconds the object was in a proxy cache.
In the example, the age header value is 55539 seconds, which means that data was cached for 55539 seconds (about 15 hours and 30 minutes).
The Cache-Control header contains the cacheability of the response. 
In the example, the cache-control header value is `public, max-age=31536000`, which means that the response can be cached and the maximum age of the response is 31536000 seconds (about 1 year).
Since the age header value is smaller than the max-age header value, the response can still be cached.

### CDN cache
Browsers can also utilize the cache of a CDN (Content Delivery Network).
A CDN is a network of servers that are distributed in multiple locations and cache content close to the end users.
A CDN allows your browsers to look up the assets (such as images, CSS, and JavaScript) in geographically the nearest CDN server, which can improve the performance of your website.


## Conclusion
In this article, I explained what cache is and how it works in computer architecture and application architecture.
Unfortunately, I didn't get to explain what cache is in database architecture, but I promise to write another article about it in the future!

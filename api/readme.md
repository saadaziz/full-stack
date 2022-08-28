# api
- saadaziz.com is powered by an API
- When a user visits http://saadaziz.com, they generate a request
- The request is sent to the API
    - When the API is done with it's work, it sends a response back to the client.

## structure
- The API, an application programming interface is a key stone component of a distributed architecture
    - Stateless client/server model allows for linear scaling
    - Using well defined interfaces between tiers to parition workloads
    - Enabler for unit and performance testing at the interface
- Distributed application communication
    - Client requests information from Server
    - Server responds with information for Client
- The API facilitates fanning out of incoming requests to partition workloads as desired

## micro
- One of my nicknames is speedy
    - To that end, the goal is to facilitate smaller systems
- To enable scaling, we want self contained layers of features
    - For example, one team may own components for a sub-section of search on a large e-commerce platform
        - This team would own their own components for front-end, API, and back-end.
- The guiding principle here is that a team building a micro frontend shouldn't need to wait for others to build things for them
    - Lets lower the number of people we need to ask before we need to make a decision by empowering teams to own an entire feature
    - That is where well defined interfaces aligned to feature slices become imperative


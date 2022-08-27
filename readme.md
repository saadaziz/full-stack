# SaadAziz

- Hi, my name is Saad Aziz. I am a web developer from Portland, Oregon
- For the last seven years, I have been working as an engineering leader (As of August 27, 2022)
- Because I have been focusing on my passion, helping software developers get to the next level, I haven't been able to write as much code
- Therefore, this is my outlet for code

## Background

- Often, I need to fetch data from a backend and display output to the customer
- This project contains a full stack implementation of how to do that
- I tried to make it reflect how I would implement a project at work

### Context

- While the source code will be publically available, my notes on putting things together will be available for purchase in book format
- This resource is designed for new or seasoned developers to get an end to end walk through of a full stack enterprise application
- The unique value proposition is that most resources are outdated, or only talk about simple outcomes. Whereas with this book, you will be able to build a full fledged modern full stack application.

## Architecture
As is:
- node http server
- express app, essentially routes and stacks of middleware
  - server side session data using express session middleware
  - client side cookie, correlating to session id access cookie parser middeware
- jest unit tests for service layer
- elastic beanstalk for infrastructure management
- oAuth 2.0 using google API as identity server
- user and session management with persistence on mongoDb cluster

To be:
- Browser
  - React, next, material-ui
- Server
  - Next
- Infrastructure
  - AWS documentDb
- 3rd party integration
  - Stripe API
  - Github API
  - Mailchimp API

Features
- [x] Run tests in background | start with 'npm run-script test-watch'
- [x] Run user create tests against in-memory database as a mock for the real thing
- [x] API server endpoints for User log-in | Client side (Javascript) Application using Oauth 2.0, provider Google API
- [x] Express session middleware maintains a cookie on the client side with session id, the data is stored on the server side
- [x] API server, running Node, express on a simple web server hosted by Elastic beanstalk, accessible at app.saadaziz.com
- [ ] Login page 
- [ ] Application access control using oAuth2, google API console, and mongoDb for session/user ACL
- [ ] Error handling
- [ ] Restful endpoints CRUD (User)
- [ ] Mongodb and documentDb integration
- [ ] Replace MemoryStore component in express-session
- [ ] Winston logging 
- [ ] Unit tests
- [ ] CICD

### Testability
- In general terms, tests are expensive and we want to minimize superfluous testing
- As a general rule of thumb, we will unit test core business logic
  - In other words, we want to perform as few integration and database tests as possible
- To ensure seperation of concerns, business logic will only live in the "service" layer
  - Only the "service" layer can talk to the "database" layer
  - The "service" layer is comprised of higher-order functions that call into the database via references to a model
  - Using a mock model, we can reduce costly tests against databases, and instead test against injected dependencies

#### Core Business Logic Modules 
- For example, User
  - Each module is made up of
    - Service layer
    - Data Layer
  - Designed so that the data model can be injected
    - Allows for ease of unit testing, and TDD

#### Controller
- Serves as a "proxy" for client requests and responses
  - Decouples core business logic from client specific communication

  ### Persistence
  - Browser
    - The front-end application will run in the browser, and will be able to employ the following strategies
      - Session
      - Cookie
      - Local storage

#### Persistence | Browser Cookies and Server Session 
- Using express-session
  - Scalable server-side session storage, integrated with a mongoDb cluster over-riding the default light-weight MemoryStore  
- Using cookie-parser
  - Inspects headers between client/server communications, parses cookies, and writes them into the browser's state, saving the cookie locally for the user
- Sessions are securely stored
  - A word on security
    - Session data SHOULD not be stored in the cookie itself, the cookie should only contain a session identifier, unique to the application domain
    - Session data will only be stored on the server, securely using mongoDb

## Gifts

- Markdown visualizers are a game changer, check this one out. 
  - It offers integration with Visual Studio Code, allows you to convert mark down into a "mind map" [Link](https://markmap.js.org/)
- Did you learn anything new?
  - My one ask, please pay it forward and help create the future for software development!
  - If you enjoyed my ramblings, and would like to learn more, please reach out I would be happy to share learning resources with you, for example, my e-book on modern full stack development... [Link](https://www.linkedin.com/in/saadaziz/ "Saad's linkedIn profile, LION - Linked In Open Networker")
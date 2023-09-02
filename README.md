<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Nebler Prescription CRUD operation
This task is for creating node API loosely based on FHIR (http://hl7.org/fhir/) which is a healthcare interoperability framework. A part of this API is a prescription resource that allows us to manage viewing and editing prescriptions.
- Search for prescriptions based on a unique ID called “nhi”
(https://www.health.govt.nz/our-work/health-identity/national-health-index)
- Add a new prescription
- Edit an existing prescription

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
## API Reference

The API documentation is available via Swagger UI. After starting the application, you can view the Swagger UI and interact with the API by navigating to:
```bash
http://localhost:3000/api/docs
```

## Important points:
  ### How do we verify that the calls should be allowed?
  
  To ensure the security of our API, we implement both authentication and authorization mechanisms:
  
  #### Authentication
  
  Authentication verifies the identity of the user making the API call. Various methods can be used for authentication, such as:
  
  - **JWT (JSON Web Tokens):** A compact and self-contained method for securely transmitting information between parties as a JSON object.
  
  - **OAuth:** A protocol that allows users to grant limited access to their resources on one site, to another site, without having to expose their credentials.
  
  #### Authorization
    Authorization is the process of granting or denying access to specific resources. With authorization, we can set up privileges to control which users have       access to which resources.
  
  ### What is the best strategy to keep our database and the external API in sync?
    We can set up a daily cron job to retrieve patient prescription data from the external source. This job will import the data into our database, adding new       records as needed and updating existing ones if changes are detected at the source
  ### How can we minimize the impact of changes in the external API on our system?
   We can create an abstraction layer between the external API and your application. This layer will interact with the external API and normalize the data           before passing it to your application. If the API changes, we only need to update this layer. Also, we need to make our service loosely coupled with     
    External API.
  ### How do we test the system works as expected with good inputs and fails as expected with malicious inputs?
  We can use testing utilities and libraries to ensure that your system behaves as expected with valid inputs and fails as expected with malicious inputs.
  Every API will be guarded with the Input validator and we can write Unit Test cases to check all scenarios.

## Support

Nest is an MIT-licensed open-source project. It can grow thanks to the sponsors and support of the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

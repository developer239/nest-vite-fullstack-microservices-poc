# Nest Vite Fullstack Microservices PoC

This repository is structured as a monorepo containing multiple NestJS microservices and Vite web application. It utilizes Turborepo for managing builds and TypeORM for database interactions and bunch of other cool stuff.

## TODO

- [ ] GitHub Actions
- [ ] CD (GCP + Terraform)
- [ ] Create docker-compose for local development (currently only databases and message broker are included)
- [ ] TODOs in code (and infinite number of small issues that I did not have time to fix)

## Apps

| Name                                      | Platform | Description                                                                       |
| ----------------------------------------- | -------- | --------------------------------------------------------------------------------- |
| [Service Gateway](./apps/service-gateway) | Backend  | The GraphQL gateway for routing queries and mutations between different services. |
| [Service Events](./apps/service-events)   | Backend  | Manages event-related data and interactions.                                      |
| [Service Auth](./apps/service-auth)       | Backend  | Handles authentication and user management.                                       |
| [Storybook](./apps/storybook)             | Frontend | Storybook for UI components.                                                      |

## Packages

| Name                                           | Description                                                                          |
| ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| [Backend Contracts](./packages/amqp-contracts) | TypeScript interfaces and constants used across different backend services.          |
| [Backend Shared](./packages/nest-helpers)      | Shared configurations, utilities, and modules used across multiple backend services. |
| [UI Library](./packages/ui-library)            | A collection of reusable React components and utilities for frontend applications.   |

## Infrastructure

- **Message Broker**: RabbitMQ is used for communication between services.
- **Databases**: PostgreSQL is used with separate instances for authentication and event services.

## Development

This project uses Turborepo for build system management. You can find more information by [reading the Turborepo documentation](https://turborepo.org/docs).

### Setting up

- Run `docker-compose up` to start databases and rabbitmq.
- Run `yarn install` to install dependencies. This project uses Yarn workspaces to manage dependencies across all apps and packages.
- Run `yarn prepare:husky` to set up Git hooks.
- Run `yarn build` to build all packages and service (remember that packages are static and required to run the app services)
- Run `yarn dev` to start all services in development mode
  - The GraphQL gateway will be available at `http://localhost:8080/graphql`

### Common Commands

- `yarn dev` - Starts all services in development mode with live reloading.
- `yarn build` - Builds all services.
- `yarn lint` - Lints the codebase using ESLint.
- `yarn format` - Formats code using Prettier.

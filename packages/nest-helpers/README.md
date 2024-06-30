# Backend Shared

The `backend-shared` package encapsulates shared configurations, utilities, and modules that are used across multiple backend services within the Nest Vite Fullstack Microservices monorepo. This includes configurations for GraphQL, database connections, and common utilities like seeding and database helpers.

## Features

- Shared NestJS modules for GraphQL, database configuration, and other common functionalities.
- Utility functions for database seeding and clearing.
- Apollo server complexity plugin for GraphQL performance optimization.
- Configurable application and database settings through environment variables.
- Firebase authentication module (guards, strategies, and decorators) with abstract user sync implementation

## Useful Commands

- `yarn build` - Compile the TypeScript files to JavaScript.
- `yarn build --watch` - Compile the TypeScript files to JavaScript and watch for changes.
- `yarn lint` - Lint the codebase using ESLint.

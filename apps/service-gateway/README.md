# Service Gateway

This service is responsible for handling authentication and user management within the Nest Vite Fullstack Microservices monorepo.

## Development Setup

- Ensure that the global repository dependencies are installed by running `yarn install` from the root.
- Ensure that packages are built by running `yarn build` from the root.
- Configure environment variables by copying the `.env.template` file to `.env` and updating the values.
- Configure `AUTH` and `EVENTS` environment variables in the `.env` file so that the gateway can communicate with the `service-auth` and `service-events` services.

## Useful Commands

- `yarn dev` - Start the service in development mode with hot reloading.
- `yarn start` - Run the compiled service in production mode.
- `yarn build` - Compile the TypeScript files to JavaScript.
- `yarn lint` - Lint the codebase using ESLint.

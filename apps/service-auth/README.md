# Service Auth

This service is responsible for handling authentication and user management within the Nest Vite Fullstack Microservices monorepo.

## Development Setup

- Ensure that the global repository dependencies are installed by running `yarn install` from the root.
- Ensure that packages are built by running `yarn build` from the root.
- Configure environment variables by copying the `.env.template` file to `.env` and updating the values.

## Useful Commands

- `yarn dev` - Start the service in development mode with hot reloading.
- `yarn start` - Run the compiled service in production mode.
- `yarn build` - Compile the TypeScript files to JavaScript.
- `yarn lint` - Lint the codebase using ESLint.
- `yarn tsc` - Run type checking using the TypeScript compiler.

## Database Management

- `yarn seed-database` - Seed the database with initial data for development.
- `yarn migration-generate` - Generate new database migrations based on changes.
- `yarn migration-generate src/module/database/migrations/{migration-name}` - Generate new database migrations based on changes.
- `yarn migration-run` - Apply database migrations.
- `yarn migration-revert` - Revert the last applied database migration.
- `yarn schema-drop` - Drop the database schema.

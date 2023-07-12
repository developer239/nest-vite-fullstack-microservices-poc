# Nest Microservices Example

## Database

- `yarn {appName}:migration:generate  apps/{appName}/src/modules/database/migrations/{migrationName}` - create new migration file
- `yarn {appName}:migration:run` - run all pending migrations
- `yarn {appName}:migration:revert` - revert last migration
- `yarn {appName}:schema:drop` - drop all tables

Example:

```bash
$ yarn events:migration:generate apps/events/src/modules/database/migrations/initial
$ yarn events:migration:run
```

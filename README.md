# Nest Microservices Example

```mermaid
graph TB
  A[Web/Mobile Client] -- HTTP --> B[Events Microservice]
  B -- TCP --> D[Auth Microservice]
  A -- HTTP --> D
  B -- Query --> E[Database]
  D -- Query --> E
```

## Setup

1. Install dependencies: `yarn install` (the project uses [yarn](https://github.com/yarnpkg))
2. Run infrastructure `docker-compose up`
3. Run database migrations: `make migration-run`

## Development

- `yarn auth:dev` - run auth microservice
- `yarn events:dev` - run events microservice
- `yarn type-check` - run type checking
- `yarn lint:ts` - run linter
- `yarn format` - run prettier
- `yarn test` - run tests

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

Database schema:

```mermaid
classDiagram
direction TB
class attendee {
   integer userId
   integer id
}
class event {
   integer ownerUserId
   varchar title
   varchar description
   integer capacity
   timestamp startsAt
   timestamp createdAt
   timestamp updatedAt
   timestamp deletedAt
   integer id
}
class event_attendees_attendee {
   integer eventId
   integer attendeeId
}

class refresh_token {
   varchar value
   varchar ipAddress
   timestamp createdAt
   timestamp updatedAt
   integer userId
   integer id
}
class user {
   varchar email
   varchar firstName
   varchar lastName
   varchar password
   timestamp createdAt
   timestamp updatedAt
   timestamp deletedAt
   integer id
}

event_attendees_attendee  -->  attendee : attendeeId_id
event_attendees_attendee  -->  event : eventId_id
refresh_token  -->  user : userId_id
```

## Testing

Most of the tests are E2E tests, which means that they are testing the whole application, including the database.

- `yarn test` - run all tests

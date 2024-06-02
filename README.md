# Event Manager

## Apps

| Name                         | Platform | ✅ Pros                                                                                                                                                                                                                         | ❌ Cons                                                                                                                                                                                | Link                                                                                                 | 
|------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| [API](/apps/api)             | Backend  |                                                                                                                                                                                                                                |                                                                                                                                                                                       | [https://api-zscw4whrpq-ey.a.run.app/docs](https://api-zscw4whrpq-ey.a.run.app/docs)                 | 
| [API GQL](/apps/api-gql)     | Backend  |                                                                                                                                                                                                                                |                                                                                                                                                                                       | [https://api-gql-zscw4whrpq-ey.a.run.app/graphql](https://api-gql-zscw4whrpq-ey.a.run.app/graphql)   | 
| [Web Astro](/apps/web-astro) | Frontend | 	• extremely small size<br/>	• only 3 libraries ([Astro](https://github.com/withastro/astro), [Tailwind](https://github.com/tailwindlabs/tailwindcss), [Preact](https://github.com/preactjs/preact))<br/>	• Zero JS by default | 	• [MPA](https://docs.astro.build/en/concepts/mpa-vs-spa/)<br/>• Not a good example of [content focused](https://docs.astro.build/en/concepts/why-astro/#content-focused) application | [https://web-astro-zscw4whrpq-ey.a.run.app/signin](https://web-astro-zscw4whrpq-ey.a.run.app/signin) |

## Development

This repository uses the Turbo build system. You can find more information
by [reading their documentation here](https://turbo.build/repo/docs).

- Run `yarn install` to install dependencies (yarn workspaces are used to manage dependencies across all apps)
- Run `yarn prepare:husky` to install git hooks

## Development

- `yarn lint` - lints all applications
- `yarn test` - runs all tests in parallel
- `yarn format` - formats all files using Prettier
- `yarn build` - builds all applications in parallel

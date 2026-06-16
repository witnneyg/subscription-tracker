# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Install dependencies: `npm install`
- Run the development server with automatic restart: `npm run dev`
- Type-check the project: `npx tsc --noEmit`
- Compile TypeScript to `dist/`: `npx tsc`
- Run ESLint on project source/config: `npx eslint src eslint.config.mts` (currently reports existing source violations)

There is no test runner configured in `package.json` yet, and no repository test files were found. Add a test script before documenting single-test commands.

## Environment

The app loads environment variables with `dotenv` at startup in `src/server.ts`. The code currently reads these variables:

- `MONGODB_URI` for Mongoose connection in `src/database/mongodb.ts`
- `JWT_SECRET` and optional `JWT_EXPIRES_IN` for auth token signing/verification
- `QSTASH_URL` and `QSTASH_TOKEN` for the Upstash Workflow client
- `EMAIL_USER` and `EMAIL_PASSWORD` for the Gmail Nodemailer transport

## Architecture

This is a TypeScript Express API backed by MongoDB/Mongoose. `src/server.ts` is the entrypoint: it loads env vars, connects to MongoDB, creates the Express app, installs JSON parsing and the global rate limiter, then mounts feature routers under `/users`, `/auth`, `/subscription`, `/workflows`, and `/plans`.

Code is organized by layer:

- `src/routes/*-routes.ts` defines Express routes and attaches middleware.
- `src/controllers/<feature>/*.ts` handles HTTP request/response logic.
- `src/services/<feature>/*-service.ts` contains the Mongoose data operations used by controllers.
- `src/models/*-model.ts` defines Mongoose schemas and TypeScript interfaces.
- `src/middlewares/` contains cross-cutting Express middleware.
- `src/config/` contains external service clients/transports.
- `src/utils/` contains email reminder helpers/templates.

Authentication uses JWT bearer tokens. `SignUp` hashes passwords with bcrypt and creates users inside a Mongoose session transaction. `SignIn` validates credentials and returns a JWT. `authMiddleware` verifies `Authorization: Bearer <token>`, loads the user, and attaches `req.user = { id, email }` for protected controllers. Protected routes currently include fetching one user and creating/fetching one subscription.

The main domain models are `User`, `Plan`, and `Subscription`. Subscriptions reference both a plan and a user. The subscription schema has a pre-save hook that fills `priceAtSubscription` from the referenced plan and computes `renewalDate` from the plan frequency when those fields are missing.

Subscription creation also triggers an Upstash Workflow run. `src/controllers/subscription/create-subscription.ts` creates the subscription, then calls `workFlowClient.trigger(...)` to invoke `/workflows/subscription/reminder`. The workflow handler in `src/controllers/workflow/workflow-controller.ts` loads the subscription, waits until 7/5/2/1 days before renewal, and sends reminder emails through `src/utils/send-email.ts` and the Nodemailer transport.

## TypeScript and linting notes

The project uses `module`/`moduleResolution: "NodeNext"`, `strict: true`, and `noImplicitAny: true` in `tsconfig.json`. The configured `rootDir` is `src` and compiled output goes to `dist`. ESLint is configured in `eslint.config.mts` with the JavaScript recommended rules plus `typescript-eslint` recommended rules.

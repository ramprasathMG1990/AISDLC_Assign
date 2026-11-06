# User Story Tracker and Dashboard

## Applications
- `azure-user-story-tracker`: Node.js 20 / Express REST source of truth. Route → service → repository layering; in-memory repositories run by default, with an Azure SQL migration in `migrations/001_initial.sql`.
- `user-story-dashboard`: React / TypeScript reporting UI. It has no database access and calls only Tracker REST APIs.
- `shared/contracts`: canonical TypeScript types and validation contracts.

## Development
```powershell
npm run install:all
npm run build
npm test
```

Start Tracker: `npm run dev --prefix azure-user-story-tracker`
Start Dashboard: `npm run dev --prefix user-story-dashboard`

Copy `.env.example` files and keep secrets outside source control. With `ALLOW_DEV_AUTH=true`, development requests may identify the user with `x-user-id` and roles with `x-roles`; production requires bearer tokens.

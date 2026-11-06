# Implementation Plan: User Story Tracker and Dashboard

**Branch**: `001-user-story-tracker-dashboard` | **Date**: 2026-11-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-user-story-tracker-dashboard/spec.md`

## Summary

Implement a React Dashboard and a Node.js/Express Azure User Story Tracker as separate applications.
The Tracker owns all persistence and exposes REST APIs for story management, history, audit records,
dashboard aggregates, filtering, and exports. The Dashboard has no direct data-store access.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 20 LTS; browser TypeScript for React

**Primary Dependencies**: Express, React, one reusable chart library, an HTTP client, authentication
middleware, and PDF generation. Every dependency requires a concrete implementation need.

**Storage**: Azure-compatible relational database managed exclusively by Tracker repositories.
The Dashboard has no database dependency or connection configuration.

**Testing**: Jest or Node test runner, Supertest, React Testing Library, Playwright, coverage, and
automated accessibility tooling.

**Target Platform**: Modern desktop, tablet, and mobile browsers; Tracker deployed as an Azure-compatible
web service.

**Project Type**: Two web applications with a REST API backend and a React frontend.
Application ownership is explicit: the Node.js/Express Tracker is the backend management
application and source of truth, while the React Dashboard is reporting-only. The Dashboard calls
Tracker APIs for reads, drill-down, and exports; it does not provide Tracker write operations or
direct data-store access.

**Performance Goals**: 500 ms p95 server-side latency for dashboard API endpoints under documented
expected load; server-side filtering and pagination for story lists.

**Constraints**: API-only Dashboard access, route/service/repository separation, centralized contracts,
no source secrets, WCAG 2.1 AA, and 320/768/1440 px layouts.

**Scale/Scope**: Tens of thousands of stories and hundreds of concurrent dashboard users.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Plan Decision | Status |
|------|---------------|--------|
| API-only Dashboard data access | All Dashboard reads use Tracker REST contracts | Pass |
| Layered backend | Routes call services; services call repositories | Pass |
| React and Express stack | React frontend and Node/Express Tracker backend | Pass |
| Business logic location | Services own business rules and Dashboard contains no business logic | Pass |
| External integrations isolated | Authentication, PDF, chart, and HTTP integrations behind interfaces/adapters | Pass |
| Centralized contracts | Shared DTOs, constants, validation, and error types are reusable packages | Pass |
| REST and validation | OpenAPI contracts, transport validation, stable errors, standard status codes | Pass |
| Tests and accessibility | Contract, unit, integration, accessibility, responsive, and E2E coverage | Pass |
| Secret handling | Environment or managed secret store only; no client secret exposure | Pass |
| Dependency simplicity | Each dependency must have a documented benefit and simpler alternative is rejected | Pass |

## Project Structure

### Documentation (this feature)

```text
specs/001-user-story-tracker-dashboard/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── openapi.yaml
└── tasks.md
```

### Source Code (repository root)

```text
azure-user-story-tracker/
├── src/
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   ├── contracts/
│   ├── validation/
│   └── integrations/
└── tests/
    ├── unit/
    ├── integration/
    └── contract/

user-story-dashboard/
├── src/
│   ├── components/
│   ├── pages/
│   ├── state/
│   ├── api/
│   └── contracts/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/

shared/
└── contracts/
```

**Structure Decision**: The repository uses separate Tracker and Dashboard applications with a small
shared contract module. Shared code contains types, constants, validation rules, and error shapes only;
it does not contain services, business logic, or persistence access.

## Complexity Tracking

> No constitution violations are currently anticipated.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | None | None |

## Post-Design Constitution Re-check

| Gate | Validation | Result |
|------|------------|--------|
| API-only Dashboard access | Dashboard contract uses Tracker REST endpoints only | Pass |
| Separation of concerns | Route, service, repository, presentation, and state boundaries are explicit | Pass |
| Single responsibility | Data model entities and application modules each have defined responsibilities | Pass |
| Shared contracts | OpenAPI contract and shared type package boundaries are documented | Pass |
| External integrations | Identity, chart, HTTP, and PDF integrations are isolated behind interfaces | Pass |
| REST design | Resource paths, status codes, validation, pagination, and errors are specified | Pass |
| Tests | Unit, contract, integration, accessibility, responsive, and E2E validation are defined | Pass |
| Security | Bearer authentication and role-based deletion checks are planned | Pass |
| Secrets | All secrets remain outside source and Dashboard configuration | Pass |
| Simplicity and dependencies | Research documents concrete decisions and rejected alternatives | Pass |

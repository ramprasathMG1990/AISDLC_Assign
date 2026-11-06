# Tasks: User Story Tracker and Dashboard

**Input**: Design documents from `/specs/001-user-story-tracker-dashboard/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Contract, unit, integration, accessibility, responsive, and end-to-end tests are required by the constitution and quickstart validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in every task description

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the two applications, shared contracts, and development tooling

- [ ] T001 Create repository application structure for `azure-user-story-tracker/`, `user-story-dashboard/`, and `shared/contracts/` per `specs/001-user-story-tracker-dashboard/plan.md`
- [ ] T002 Initialize the Node.js 20 TypeScript Tracker package and Express dependencies in `azure-user-story-tracker/package.json`
- [ ] T003 [P] Initialize the React TypeScript Dashboard package and dependencies in `user-story-dashboard/package.json`
- [ ] T004 [P] Configure shared TypeScript contracts and validation package in `shared/contracts/package.json`
- [ ] T005 [P] Configure TypeScript, linting, formatting, and test scripts in `azure-user-story-tracker/`, `user-story-dashboard/`, and `shared/contracts/`
- [ ] T006 [P] Add environment configuration templates for Tracker database, identity provider, and optional export settings in `azure-user-story-tracker/.env.example`
- [ ] T007 Add environment configuration templates for Tracker API URL and public non-secret settings in `user-story-dashboard/.env.example`
- [ ] T008 [P] Copy the API contract into the application contract location at `azure-user-story-tracker/src/contracts/openapi.yaml`
- [ ] T009 Create workspace-level documentation for development commands in `README.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T010 Define shared canonical types, status constants, priority constants, and filter types in `shared/contracts/src/index.ts`
- [ ] T011 Define shared validation rules and stable error types in `shared/contracts/src/validation.ts`
- [ ] T012 [P] Configure Express application, JSON parsing, request correlation, and centralized error middleware in `azure-user-story-tracker/src/app.ts`
- [ ] T013 [P] Implement bearer-token authentication middleware and permission resolution in `azure-user-story-tracker/src/routes/middleware/auth.ts`
- [ ] T014 Implement the authorization service interface for role and story-ownership checks in `azure-user-story-tracker/src/services/authorization-service.ts`
- [ ] T015 [P] Configure structured logging with secret redaction in `azure-user-story-tracker/src/integrations/logger.ts`
- [ ] T016 [P] Configure Azure-compatible relational database connection through environment variables in `azure-user-story-tracker/src/integrations/database.ts`
- [ ] T017 Create database migrations for User Story fields, Status History, Audit Trail, Sprint, Release, Application, Module, Feature, and soft-delete fields in `azure-user-story-tracker/migrations/001_initial.sql`
- [ ] T018 Implement repository interfaces and base transaction support in `azure-user-story-tracker/src/repositories/base-repository.ts`
- [ ] T019 [P] Implement centralized route validation for filter dates, pagination, UUIDs, and status values in `azure-user-story-tracker/src/validation/request-validation.ts`
- [ ] T020 [P] Implement reusable API client and error adapter in `user-story-dashboard/src/api/tracker-client.ts`
- [ ] T021 [P] Configure Dashboard global state with the least-complex reusable mechanism in `user-story-dashboard/src/state/filter-store.ts`
- [ ] T022 Configure shared HTTP response and loading/error presentation primitives in `user-story-dashboard/src/components/feedback/`
- [ ] T023 [P] Configure accessibility and responsive test tooling in `user-story-dashboard/tests/setup.ts`

**Checkpoint**: Foundation ready - user story implementation can begin in priority order or in parallel

---

## Phase 3: User Story 1 - Manage User Stories (Priority: P1) MVP

**Goal**: Users can create, view, search, filter, update, and soft-delete stories with status history and audit trails

**Independent Test**: Create a complete story, find it with search and filters, advance or reject status changes, soft-delete it, and confirm active views exclude it while history and audit remain

### Tests for User Story 1

- [ ] T024 [P] [US1] Add contract tests for `POST`, `GET`, `PATCH`, and `DELETE /stories` plus representative `400`, `401`, `403`, `404`, and `409` responses in `azure-user-story-tracker/tests/contract/stories.contract.test.ts`
- [ ] T025 [P] [US1] Add unit tests for adjacent linear transitions `New → Approved → Ready → In Progress → Blocked → Testing → Completed → Closed` and rejection of skips, backward changes, reopening, and external statuses in `azure-user-story-tracker/tests/unit/story-transition.test.ts`
- [ ] T026 [P] [US1] Add repository integration tests for atomic story updates with Status History and Audit Trail records in `azure-user-story-tracker/tests/integration/story-repository.test.ts`
- [ ] T027 [P] [US1] Add integration tests for soft deletion, creator/delivery-manager/administrator permissions, and active-list exclusion in `azure-user-story-tracker/tests/integration/story-delete.test.ts`

### Implementation for User Story 1

- [ ] T028 [P] [US1] Implement the User Story repository with fields `userStoryId`, `title`, `description`, `applicationId`, `moduleId`, `featureId`, `storyPoints`, `priority`, `status`, `sprintId`, `releaseId`, `assigneeId`, `businessOwnerId`, `acceptanceCriteria`, `dependencies`, dates, actors, and soft-delete fields in `azure-user-story-tracker/src/repositories/story-repository.ts`
- [ ] T029 [P] [US1] Implement the Status History repository as append-only records with exactly `historyId`, `userStoryId`, `previousStatus`, `newStatus`, `actorId`, and `occurredAt` in `azure-user-story-tracker/src/repositories/status-history-repository.ts`
- [ ] T030 [P] [US1] Implement the immutable Audit Trail repository without sensitive request bodies or secrets in `azure-user-story-tracker/src/repositories/audit-repository.ts`
- [ ] T031 [US1] Implement centralized story validation requiring `title` and `description`, requiring `application` and `feature` unless supported by an explicit system default, requiring non-negative numeric `storyPoints`, and restricting status to the eight canonical values in `azure-user-story-tracker/src/validation/story-validation.ts`
- [ ] T032 [US1] Implement story creation and update business rules in `azure-user-story-tracker/src/services/story-service.ts`
- [ ] T033 [US1] Implement adjacent linear status-transition enforcement in `azure-user-story-tracker/src/services/story-status-service.ts`
- [ ] T034 [US1] Implement atomic soft-delete behavior and permission checks for creator, delivery manager, or administrator in `azure-user-story-tracker/src/services/story-delete-service.ts`
- [ ] T035 [US1] Implement paginated search and application/module/feature/sprint/release/assignee/priority/status/date-range filtering in `azure-user-story-tracker/src/services/story-query-service.ts`
- [ ] T036 [US1] Implement `POST /stories` creation route with `201`, validation `400`, authentication `401`, authorization `403`, and duplicate `409` responses in `azure-user-story-tracker/src/routes/stories-route.ts`
- [ ] T037 [US1] Implement `GET /stories`, `GET /stories/{storyId}`, and `PATCH /stories/{storyId}` routes with pagination and standardized errors in `azure-user-story-tracker/src/routes/stories-route.ts`
- [ ] T038 [US1] Implement `DELETE /stories/{storyId}` confirmation-facing route contract and soft-delete `204` response in `azure-user-story-tracker/src/routes/stories-route.ts`
- [ ] T039 [US1] Implement `GET /stories/{storyId}/history` and `GET /stories/{storyId}/audit` routes in `azure-user-story-tracker/src/routes/story-history-route.ts`
- [ ] T040 [US1] Build Tracker story list, search, filter, detail, status history, and confirmation UI in `user-story-dashboard/src/pages/StoryManagerPage.tsx`
- [ ] T041 [US1] Add reusable story form field validation and field-level error components in `user-story-dashboard/src/components/stories/`

**Checkpoint**: User Story 1 is independently functional as the Tracker MVP

---

## Phase 4: User Story 2 - Review Portfolio Progress (Priority: P1)

**Goal**: The Dashboard shows KPI values and chart summaries consistently derived from Tracker-owned active data

**Independent Test**: Load representative Tracker data, verify every KPI and chart against the underlying filtered stories, and confirm soft-deleted stories and empty scopes are excluded or represented as zero

### Tests for User Story 2

- [ ] T042 [P] [US2] Add contract tests for `GET /dashboard/summary` success, invalid filters, and `503` availability responses in `azure-user-story-tracker/tests/contract/dashboard-summary.contract.test.ts`
- [ ] T043 [P] [US2] Add unit tests that sprint completion equals completed active stories divided by total active stories and is zero for an empty sprint in `azure-user-story-tracker/tests/unit/sprint-completion.test.ts`
- [ ] T044 [P] [US2] Add integration tests proving every KPI and chart derives from one identical active-filter and soft-delete-excluded story set in `azure-user-story-tracker/tests/integration/dashboard-summary.test.ts`
- [ ] T045 [P] [US2] Add Dashboard empty-state and unavailable-Tracker component tests in `user-story-dashboard/tests/unit/dashboard-feedback.test.tsx`

### Implementation for User Story 2

- [ ] T046 [US2] Implement the server-side Dashboard aggregate service for total, completed, in-progress, blocked, total points, completed points, sprint completion, and chart series in `azure-user-story-tracker/src/services/dashboard-service.ts`
- [ ] T047 [US2] Implement repository queries for status, application, module, feature, sprint progress, velocity, story-point distribution, team workload, and release progress in `azure-user-story-tracker/src/repositories/dashboard-repository.ts`
- [ ] T048 [US2] Implement `GET /dashboard/summary` with one filter set shared across all KPI and chart data in `azure-user-story-tracker/src/routes/dashboard-route.ts`
- [ ] T049 [US2] Implement Dashboard API retrieval and normalization through Tracker contracts in `user-story-dashboard/src/api/dashboard-api.ts`
- [ ] T050 [US2] Implement reusable KPI card components with accessible labels and empty values in `user-story-dashboard/src/components/dashboard/KpiCards.tsx`
- [ ] T051 [P] [US2] Implement status, application, module, feature, and release chart components behind one chart integration interface in `user-story-dashboard/src/components/dashboard/PortfolioCharts.tsx`
- [ ] T052 [P] [US2] Implement sprint progress, velocity trend, story-point distribution, and team workload chart components behind the same chart integration interface in `user-story-dashboard/src/components/dashboard/ProgressCharts.tsx`
- [ ] T053 [US2] Compose the Dashboard page without business logic, connecting API state to reusable components and explicit events in `user-story-dashboard/src/pages/DashboardPage.tsx`

**Checkpoint**: User Stories 1 and 2 both work independently, with consistent active-story aggregates

---

## Phase 5: User Story 3 - Drill Down and Analyze Stories (Priority: P2)

**Goal**: Users combine filters and drill from KPIs or chart selections to the exact matching paginated stories

**Independent Test**: Select a chart segment or KPI, add application/module/feature/sprint/release/assignee/status/date filters, verify a matching story list, and preserve context while paging

### Tests for User Story 3

- [ ] T054 [P] [US3] Add contract tests for `GET /dashboard/drill-down` success and invalid drill-down selection responses in `azure-user-story-tracker/tests/contract/dashboard-drilldown.contract.test.ts`
- [ ] T055 [P] [US3] Add integration tests proving all filter dimensions combine with AND semantics and preserve pagination context in `azure-user-story-tracker/tests/integration/dashboard-drilldown.test.ts`
- [ ] T056 [P] [US3] Add end-to-end tests for chart-to-story drill-down, filter updates, context preservation, and clear-filter behavior in `user-story-dashboard/tests/e2e/drill-down.spec.ts`

### Implementation for User Story 3

- [ ] T057 [US3] Implement Dashboard drill-down query parsing and matching-story service logic for KPI and chart selections in `azure-user-story-tracker/src/services/drill-down-service.ts`
- [ ] T058 [US3] Implement `GET /dashboard/drill-down` with `applicationId`, `moduleId`, `featureId`, `sprintId`, `releaseId`, `assigneeId`, `status`, and validated date range in `azure-user-story-tracker/src/routes/dashboard-route.ts`
- [ ] T059 [US3] Implement reusable application, module, feature, sprint, release, assignee, status, and date-range filter controls in `user-story-dashboard/src/components/filters/FilterPanel.tsx`
- [ ] T060 [US3] Implement filter and pagination state synchronization with URL or centralized state in `user-story-dashboard/src/state/filter-store.ts`
- [ ] T061 [US3] Implement story-list pagination and active filter/search context in `user-story-dashboard/src/components/stories/StoryList.tsx`
- [ ] T062 [US3] Connect chart and KPI explicit selection events to drill-down navigation without embedding business logic in components in `user-story-dashboard/src/pages/DashboardPage.tsx`
- [ ] T063 [US3] Implement a clear active-filter, empty-result, and unassigned-value display in `user-story-dashboard/src/components/filters/FilterPanel.tsx`

**Checkpoint**: KPIs, charts, filters, story lists, and drill-down share one active scope

---

## Phase 6: User Story 4 - Export Dashboard Results (Priority: P3)

**Goal**: Users export filtered story scope or Dashboard reports as safe CSV or PDF downloads

**Independent Test**: Apply filters, export CSV and PDF, compare rows and report scope with Dashboard data, and verify large-export progress or retry failure behavior

### Tests for User Story 4

- [ ] T064 [P] [US4] Add contract tests for CSV and PDF export success, `202`, invalid scope `400`, and unavailable service `503` responses in `azure-user-story-tracker/tests/contract/export.contract.test.ts`
- [ ] T065 [P] [US4] Add unit tests for RFC 4180-compatible CSV escaping of commas, quotes, and line breaks in `azure-user-story-tracker/tests/unit/csv-export.test.ts`
- [ ] T066 [P] [US4] Add integration tests proving CSV/PDF exports contain exactly the active filtered scope without duplicates or omissions in `azure-user-story-tracker/tests/integration/export.test.ts`
- [ ] T067 [P] [US4] Add end-to-end tests for export progress, download completion, and retryable export failure in `user-story-dashboard/tests/e2e/export.spec.ts`

### Implementation for User Story 4

- [ ] T068 [US4] Implement CSV serialization behind an export interface with safe handling for commas, quotes, and line breaks in `azure-user-story-tracker/src/integrations/csv-exporter.ts`
- [ ] T069 [US4] Implement PDF generation behind an isolated export interface containing KPI summary, relevant chart summaries, filter scope, and export date in `azure-user-story-tracker/src/integrations/pdf-exporter.ts`
- [ ] T070 [US4] Implement export permission checks and active filtered story scope selection in `azure-user-story-tracker/src/services/export-service.ts`
- [ ] T071 [US4] Implement `POST /exports/csv` and `POST /exports/pdf` routes with `200`, bounded asynchronous `202`, `400`, and `503` behavior in `azure-user-story-tracker/src/routes/export-route.ts`
- [ ] T072 [US4] Implement Dashboard export request controls with progress and retryable error presentation in `user-story-dashboard/src/components/export/ExportControls.tsx`
- [ ] T073 [US4] Implement export API methods and file download handling in `user-story-dashboard/src/api/export-api.ts`

**Checkpoint**: All four user stories are implemented with independent validation paths

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improve quality across both applications without moving business logic out of services

- [ ] T074 [P] Add contract and integration tests for authentication, authorization, invalid filters, unavailable data, and stable error shapes across `azure-user-story-tracker/tests/`
- [ ] T075 [P] Add critical-module statement coverage checks for story validation, status transitions, authorization, soft-delete, and sprint/aggregate calculations in `azure-user-story-tracker/tests/coverage/`
- [ ] T076 Add correlation-id and secret-redacted operational logging to all Tracker routes and services in `azure-user-story-tracker/src/`
- [ ] T077 [P] Add keyboard, focus, semantic label, and WCAG 2.1 AA accessibility checks for critical Dashboard journeys in `user-story-dashboard/tests/accessibility/`
- [ ] T078 [P] Add responsive viewport tests at 320 px, 768 px, and 1440 px for Dashboard navigation, filters, charts, story list, and exports in `user-story-dashboard/tests/responsive/`
- [ ] T079 Optimize server-side filter and aggregate queries for the 500 ms p95 Dashboard endpoint target in `azure-user-story-tracker/src/repositories/dashboard-repository.ts`
- [ ] T080 [P] Document dependency licenses, maintenance status, and security review evidence for Express, React, chart, HTTP, authentication, accessibility, and PDF dependencies in `specs/001-user-story-tracker-dashboard/dependency-review.md`
- [ ] T081 Remove unnecessary dependencies and verify every retained dependency against the concrete need recorded in `specs/001-user-story-tracker-dashboard/research.md`
- [ ] T082 Run quickstart validation scenarios end to end in `specs/001-user-story-tracker-dashboard/quickstart.md`
- [ ] T083 [P] Update architecture and API usage documentation for the two applications in `README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately and has no feature dependencies
- **Foundational (Phase 2)**: Depends on Setup and blocks all user stories
- **User Stories (Phase 3+)**: Start only after the foundation is complete
  - US1 and US2 may proceed in parallel after foundation, while US2 may reuse US1 data
  - US3 depends on Dashboard filtering patterns from US2 and Tracker list behavior from US1
  - US4 depends on active-filter data from US3 and active story data from US1
- **Polish (Phase N)**: Depends on completion of all desired user stories

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other user stories after the foundation
- **User Story 2 (P1)**: Independently testable through seeded Tracker data but consumes story fields established by US1
- **User Story 3 (P2)**: Depends on US1 story-list behavior and US2 filter-aware summary behavior
- **User Story 4 (P3)**: Depends on US1 story scope and US3 active-filter behavior

### Within Each User Story

- Contract tests before implementation
- Models and repositories before services
- Services before route handlers or UI integration
- Core behavior before UI composition and export integration
- Story is complete only after its independent test passes

### Parallel Opportunities

- Setup tasks marked [P] can run independently
- Foundational middleware, repository, validation, and Dashboard client tasks marked [P] can run in parallel
- Contract and unit tests for a story can run together
- Different repository interfaces and independent chart components marked [P] can run in parallel
- US1 and US2 can be staffed concurrently after foundation

---

## Parallel Example: User Story 1

```text
T024 Contract tests + T025 transition unit tests + T026 repository integration tests + T027 deletion integration tests
T028 Story repository + T029 status-history repository + T030 audit repository
T036 creation route + T039 history/audit route after the relevant services are complete
```

## Parallel Example: User Story 2

```text
T042 summary contract tests + T043 sprint formula unit tests + T044 aggregate integration tests + T045 Dashboard feedback tests
T051 Portfolio chart components + T052 Progress chart components
```

## Parallel Example: User Story 3

```text
T054 drill-down contract tests + T055 drill-down integration tests + T056 end-to-end tests
T059 filter controls + T060 filter state + T061 story-list pagination can proceed after contract type definitions exist
```

## Parallel Example: User Story 4

```text
T064 export contract tests + T065 CSV unit tests + T066 export integration tests + T067 export end-to-end tests
T068 CSV adapter + T069 PDF adapter are independent export interface implementations
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate story creation, filtering, status history, deletion, and audit independently
5. Deploy the Tracker MVP before Dashboard reporting work

### Incremental Delivery

1. Deliver Tracker story management as the MVP
2. Add Dashboard KPIs and charts
3. Add drill-down and synchronized filtering
4. Add CSV and PDF exports
5. Complete accessibility, responsive, security, performance, and dependency gates

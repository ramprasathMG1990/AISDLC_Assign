# Quickstart Validation

## Prerequisites

- Node.js 20 LTS
- TypeScript toolchain
- Configured test identity and permissions for creating, updating, and deleting stories
- Tracker-managed relational database configured through environment variables
- Dashboard base URL and Tracker API base URL configured outside source code

## Setup

1. Install dependencies separately in `azure-user-story-tracker` and `user-story-dashboard`.
2. Configure only the Tracker with database and identity-provider secrets through environment
   variables or a managed secret store.
3. Start the Tracker API.
4. Start the Dashboard and confirm it uses only the Tracker API base URL for story data.
5. Seed representative stories, including an empty sprint, a blocked story, a completed story, and
   stories with optional unassigned fields.

## Validation Scenarios

### Story management

1. Create a complete story with a unique ID.
2. Confirm it appears once in the story list.
3. Advance it through one adjacent status at a time and verify status history.
4. Attempt a skipped or backward status change and confirm it is rejected.
5. Soft-delete the story as creator, delivery manager, or administrator.
6. Confirm it disappears from active lists and aggregates while its audit record remains.

### Dashboard

1. Open the Dashboard with no filters and verify all seven KPI values and all requested chart areas.
2. Apply every supported filter and confirm KPI, chart, and story-list results use the same scope.
3. Select chart and KPI segments and confirm drill-down shows exactly matching stories.
4. Make Tracker data unavailable and confirm the Dashboard shows a retryable error with no stale
   current-data treatment.
5. Repeat the critical journeys at 320 px, 768 px, and 1440 px widths.

### Export

1. Filter stories and export CSV.
2. Verify each exported row and filter value; confirm commas, quotes, and line breaks are escaped.
3. Export PDF and verify the summary, relevant chart summaries, filter scope, and export date.
4. Request exports with a large dataset and verify progress plus success or retryable failure.

## Automated Checks

- Run Tracker unit and repository tests.
- Run API contract and integration tests.
- Run Dashboard component and integration tests.
- Run end-to-end dashboard journeys.
- Run accessibility checks against critical Dashboard journeys.
- Verify coverage of critical story, status, authorization, soft-delete, and aggregate modules is at
  least 80%.
- Run responsive viewport checks at 320 px, 768 px, and 1440 px.
- Verify no Dashboard source or configuration contains Tracker database credentials.

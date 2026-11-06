<!--
Sync Impact Report:
- Version change: unversioned template -> 1.0.0
- Modified principles: none (initial constitution populated from placeholder scaffold)
- Added sections: Application Boundaries and Data Isolation; Technology and Architecture;
  API, UI, Security, and Quality Standards; Development Workflow and Quality Gates
- Removed sections: none
- Deferred TODOs: RATIFICATION_DATE is unknown; set to the actual adoption date when available.
-->

# User Story Dashboard and Azure User Story Tracker Constitution

## Core Principles

### I. Application Boundaries and API-Only Data Access

The Azure User Story Tracker MUST own creation and management of user-story data. The User
Story Dashboard MUST consume tracker data exclusively through REST APIs exposed by the Azure
User Story Tracker. Dashboard code MUST NOT access tracker databases, storage accounts,
schemas, or connection secrets directly. Authentication, authorization, pagination, filtering,
and response contracts MUST be enforced at the Tracker API boundary.

This separation preserves ownership, prevents duplicate data-access rules, and lets either
application evolve without coupling the Dashboard to Tracker persistence internals.

### II. Layered Backend Architecture

Express implementations MUST separate route handlers, services, and repositories. Route
handlers MUST validate transport concerns and delegate work; services MUST contain business
rules and orchestrate integrations; repositories MUST contain data-access operations. Business
logic MUST NOT be implemented in route handlers, React pages, or UI components. Modules and
components MUST have one responsibility.

### III. Technology and Reusable Contracts

The Dashboard frontend MUST use React, and the Tracker backend MUST use Node.js with Express.
Shared user-story types, constants, validation rules, error shapes, and utilities MUST be
centralized in reusable packages or modules where both applications consume them. External
system integrations MUST be isolated behind service interfaces and MUST NOT leak SDK or vendor
types into routes, pages, components, services, or repository APIs.

Dependencies MUST be justified by a concrete requirement in the implementation plan, and
unnecessary frameworks, abstractions, infrastructure, and cross-process complexity are
prohibited unless they provide a measured maintainability or reliability benefit.

### IV. REST, Validation, and Error Contracts

APIs MUST use resource-oriented paths, appropriate HTTP methods, and standard status codes.
Success responses MUST use consistent JSON shapes, and failures MUST return stable error codes,
human-readable messages, and no sensitive implementation details. Request input MUST be
validated before business or repository processing. Critical business operations MUST be atomic
where partial completion could corrupt tracker data.

### V. Testable Critical Logic and Quality Measurement

Tests MUST cover critical business rules, validation, API contracts, authorization boundaries,
repository behavior, and Dashboard integration with Tracker APIs. Test-first development is
preferred for bug fixes and complex logic. Each pull request MUST pass targeted unit and
integration tests plus the relevant build before merge.

Measured quality gates MUST include:

- At least 80% statement coverage for critical user-story, validation, authorization, and
  progress-calculation modules.
- Every REST endpoint MUST have contract tests for successful and representative failure paths.
- Automated accessibility checks MUST report no WCAG 2.1 AA violations on critical journeys.
- Responsive layouts MUST be verified at 320 px, 768 px, and 1440 px widths.
- API endpoints serving interactive dashboard views MUST meet a 500 ms p95 server-side target
  under the documented expected load.
- New dependencies MUST pass a documented license, maintenance, and security review.

### VI. Reusable, Accessible, and Responsive UI

React pages MUST compose reusable components and contain no business rules. Presentation
components MUST receive typed inputs and emit explicit events; state management MUST be
limited to the least complex mechanism that reliably handles the required state. Components
MUST support keyboard operation, semantic HTML, visible focus, assistive names, and WCAG 2.1
AA contrast and interaction requirements. Layouts MUST adapt to supported mobile, tablet, and
desktop widths without loss of content or operation.

### VII. Security and Operational Reliability

Secrets MUST use environment variables or managed secret stores and MUST NEVER be committed to
source control, logs, responses, screenshots, or client bundles. Services MUST enforce least
privilege, authenticated access, and authorization appropriate to each operation. Logs MUST be
structured and MUST omit passwords, tokens, personal data not required for diagnosis, and other
secrets. Failures MUST be handled consistently at each boundary, with request correlation and
enough context to diagnose production incidents without exposing sensitive detail.

## Technology and API Constraints

- React is the required Dashboard frontend technology.
- Node.js with Express is the required Tracker backend technology.
- Dashboard state and presentation MUST consume tracker-owned data through documented REST APIs.
- Persisted data access MUST remain inside Tracker repositories.
- Shared contracts MUST be centralized, versioned when externally consumed, and backward
  compatible or explicitly migrated before breaking API changes.
- HTTP clients and external SDKs MUST be wrapped behind interfaces owned by the relevant service
  layer.
- Secrets and environment-specific configuration MUST be supplied outside source code.

## Development Workflow and Quality Gates

- Every feature or bug fix MUST define acceptance criteria, measurable quality targets, and
  relevant API contracts before implementation.
- Route, service, repository, and UI changes MUST be reviewed for separation-of-concerns and
  responsibility compliance.
- Implementations MUST include validation, deterministic error handling, and tests for critical
  paths before merge.
- API and user-facing behavior changes require contract or integration coverage, as applicable.
- Accessibility, responsive behavior, security, observability, and dependency cost MUST be
  considered during design and review rather than deferred to release.
- Complexity additions require a short rationale in the implementation plan; if simpler
  alternatives meet the requirement, the simpler solution MUST be selected.

### Compliance Review

Implementation plans, code reviews, and pull requests MUST verify compliance with every
principle. Reviewers MUST reject changes that introduce Dashboard data-store access, business
logic in forbidden layers, insecure secret handling, untested critical behavior, or unjustified
dependencies.

## Governance

This constitution governs architectural, implementation, security, testing, and quality
decisions for the Azure User Story Tracker and User Story Dashboard. It supersedes conflicting
project conventions. Amendments MUST identify the affected principles or sections, document the
reason, update implementation and review guidance where needed, and record migration or
compliance actions for existing work.

Version changes MUST follow semantic versioning:

- MAJOR: removal or incompatible redefinition of a principle, architecture boundary, or
  mandatory workflow.
- MINOR: addition of a principle or material expansion of governance or quality requirements.
- PATCH: clarification, wording correction, or non-material refinement.

Compliance reviews MUST occur during implementation-plan approval and pull-request review.
Reviewers MUST use this constitution as the baseline and record explicit exceptions before
merge, including scope, rationale, owner, expiry, and remediation plan. Any exception that
weakens API-only data access, secret handling, separation of concerns, or critical validation
MUST receive explicit maintainer approval.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): set the actual adoption date |
**Last Amended**: 2026-11-07

# Phase 0 Research

## Decision: Relational persistence with repository abstraction

**Decision:** Use an Azure-compatible relational database and keep all SQL behind Tracker repositories.

**Rationale:** Story fields, status history, audit entries, soft deletion, filtering, and aggregate
queries are relational. A relational transaction can enforce story updates and history atomically.

**Alternatives considered:** Document database (more complex consistency model for this domain);
file storage (no transaction or query guarantees); Dashboard direct database access (prohibited).

## Decision: TypeScript for both applications

**Decision:** Use TypeScript with React and Node.js 20 Express.

**Rationale:** Shared types and validation contracts reduce drift between the applications. The
constitution mandates React and Node.js/Express, while TypeScript adds compile-time boundary checks.

**Alternatives considered:** JavaScript without types (faster start but higher contract drift);
different backend languages (incompatible with the constitution).

## Decision: REST contracts and server-side queries

**Decision:** Expose resource-oriented OpenAPI-described REST endpoints. Pagination, filtering,
sorting, and aggregation occur in Tracker services and repositories.

**Rationale:** This keeps Dashboard logic presentation-focused, prevents duplicate business rules,
and lets the Dashboard remain independent of Tracker storage.

**Alternatives considered:** GraphQL (adds schema and caching complexity without a demonstrated
need); Dashboard querying raw entities and aggregating locally (duplicates logic and moves excessive
data); direct database access (prohibited).

## Decision: Linear adjacent status transitions

**Decision:** Only the next status in the following sequence is allowed:
New → Approved → Ready → In Progress → Blocked → Testing → Completed → Closed.

**Rationale:** This implements the accepted clarification and gives status history a deterministic
transition rule.

**Alternatives considered:** Free-form transitions and workflow exception paths (explicitly rejected
by specification); restricted workflow with reopening (not selected).

## Decision: Soft deletion

**Decision:** Deletion sets a soft-delete marker and audit record. Active APIs exclude soft-deleted
stories. Administrator-authorized recovery is available only through the Tracker.

**Rationale:** Preserves recoverable story data while keeping active lists and Dashboard totals clean.

**Alternatives considered:** Permanent deletion (loses recoverable data); purge after a fixed window
(adds retention policy complexity not specified); logical deletion without audit records (insufficient).

## Decision: Authorization model

**Decision:** Use bearer-token authentication through an external identity provider and enforce role
or permission claims in Tracker services. The identity provider interface is isolated from routes and
services.

**Rationale:** Authenticated API access and role checks are mandatory. The tracker can verify deletion
permission and story ownership without embedding identity-provider SDK types in business logic.

**Alternatives considered:** Session-only authentication (harder to define a reusable API contract for
multiple clients); trusting Dashboard authorization only (must be enforced at the Tracker boundary).

## Decision: Minimal justified dependencies

**Decision:** Use Express, React, one chart library, one HTTP client, an accessibility checker, and one
PDF-generation library. Native browser APIs or small utilities are preferred where they are sufficient.

**Rationale:** Each library removes substantial custom complexity. CSV uses RFC 4180-compatible
serialization, preferably with a reviewed utility, rather than a large reporting framework. PDF
generation is isolated behind an export interface because binary report generation is substantive logic.

**Alternatives considered:** Multiple chart libraries (not justified); PDF/report server plus separate
service (premature complexity); custom chart rendering and PDF formatters (high maintenance and testing cost).

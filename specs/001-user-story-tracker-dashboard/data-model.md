# Data Model

## User Story

- **Fields:** userStoryId, title, description, applicationId, moduleId, featureId, storyPoints,
  priority, status, sprintId, releaseId, assigneeId, businessOwnerId, acceptanceCriteria,
  dependencies, createdAt, updatedAt, createdById, updatedById, deletedAt, deletedById.
- **Identity:** userStoryId is globally unique; duplicate IDs are rejected.
- **Relationships:** Application to zero or more stories; Module, Feature, Sprint, Release, and
  Assignee to zero or more stories.
- **Validation:** title and description are required; application and feature are required unless
  explicitly supported as system defaults; story points are a non-negative numeric value; status
  must be one of the eight canonical values.
- **Lifecycle:** adjacent linear transitions only; soft-delete changes active availability only.

## Status History

- **Fields:** historyId, userStoryId, previousStatus, newStatus, actorId, occurredAt.
- **Relationships:** belongs to exactly one User Story.
- **Validation:** transitions must follow the adjacent linear sequence; history is append-only.

## Audit Trail Entry

- **Fields:** auditId, userStoryId nullable, entityType, action, actorId, occurredAt, changeSummary.
- **Relationships:** may reference a User Story.
- **Validation:** no sensitive request bodies or secrets may be stored in changeSummary; deletion,
  creation, update, and status changes are immutable records.

## Sprint

- **Fields:** sprintId, name, startDate, endDate, createdAt, updatedAt.
- **Derived completion:** completed stories divided by total active stories in the sprint scope.
  An empty sprint reports 0%.

## Release

- **Fields:** releaseId, name, targetDate, description, createdAt, updatedAt.
- **Derived progress:** active stories associated with the release grouped by completion or status.

## Application

- **Fields:** applicationId, name, description, createdAt, updatedAt.

## Module

- **Fields:** moduleId, applicationId, name, description.
- **Relationship:** belongs to one Application.

## Feature

- **Fields:** featureId, moduleId, name, description.
- **Relationship:** belongs to one Module.

## Person Assignment

- **Fields:** personId, displayName, role or permission identifiers.
- **Relationships:** assignee and business owner are optional story references; story creator and
  update actor are audit references.

## Dashboard Filter Set

- **Fields:** applicationIds, moduleIds, featureIds, sprintIds, releaseIds, assigneeIds, statuses,
  startDate, endDate, searchText, page, pageSize, sort.
- **Validation:** end date must not precede start date; unknown filter identifiers are returned as
  no matches or a validation error according to the API contract; empty filter lists mean no filter
  restriction for that dimension.

## Derived Aggregate

- **Fields:** totalStories, completedStories, inProgressStories, blockedStories, totalStoryPoints,
  completedStoryPoints, sprintCompletionPercentage, chart series, pagination metadata.
- **Constraint:** Every KPI and chart must be derived from the same active-filter set and active
  stories, excluding soft-deleted records.

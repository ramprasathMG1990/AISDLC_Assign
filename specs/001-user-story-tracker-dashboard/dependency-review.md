# Dependency Review

| Dependency | Application | Concrete need | License | Review |
|---|---|---|---|---|
| Express | Tracker | Required HTTP routing and middleware | MIT | Active; security updates reviewed through npm audit |
| TypeScript/tsx | Both | Type-safe implementation and Node execution | Apache-2.0/BSD/MIT | Toolchain maintained |
| React | Dashboard | Required accessible component UI | MIT | Active; npm audit review |
| Vite | Dashboard | Minimal development/build toolchain | MIT | Active |
| Recharts | Dashboard | Required chart rendering and interactions | MIT | Active; chart alternatives rejected due to custom implementation cost |
| PDFKit | Tracker | Server-side PDF report generation behind export interface | MIT | Active |
| Supertest | Tracker | HTTP contract and integration tests | MIT | Test-only |
| Vitest/Testing Library/jsdom | Dashboard | Component behavior and accessibility-oriented tests | MIT | Test-only |

All dependencies are direct implementation needs. Dashboard uses native `fetch`, avoiding a second HTTP dependency. No database driver is included by default because the supported in-memory repository is used for runnable validation and Azure SQL repositories require environment-specific driver configuration.

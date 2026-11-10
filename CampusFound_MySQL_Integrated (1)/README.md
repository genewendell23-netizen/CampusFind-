# CampusFound

CampusFound is a Next.js + React + Payload-based campus lost-and-found application. The original Figma Make UI is retained. Authentication and core transactions use a separate MySQL-backed API.

## Requirements
- Node.js 24.22.1 or newer (the supplied Next.js/Payload versions declare this requirement)
- MySQL 8.0+
- pnpm 9/10/11 (recommended; `npm` may work but the lockfile is pnpm)

## Setup
1. Create/import the database: open `database/schema.sql` in MySQL Workbench and execute it.
2. Copy `.env.example` to `.env` and enter your local MySQL credentials.
3. Generate a JWT secret in PowerShell:
   ```powershell
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```
   Paste the result as `JWT_SECRET` in `.env`. Never share `.env` or commit it.
4. Install dependencies:
   ```powershell
   corepack enable
   pnpm install
   ```
5. Start the app:
   ```powershell
   pnpm dev
   ```
6. Open http://localhost:3000.
7. Create the first staff/admin account from the project folder:
   ```powershell
   pnpm db:staff
   ```
   Choose `administrator` for the first admin. Public registration only creates student accounts.

## Current connected features
- Student registration with unique email and student number, password hashing, and server-side validation.
- Separate student and staff/admin login portals, with role checks and an HTTP-only session cookie.
- MySQL tables for users, reports, claims, notifications, and activity logs.
- Student report submission, private report list, public approved-item feed API, and claim submission API.
- Claim duplicate/self-claim checks inside a transaction.
- Staff/admin report and claim decision APIs with notifications and activity logs.

## Important implementation notes
- Email verification and outbound email delivery are not configured. The UI must not imply that a verification email has been sent.
- Image upload storage is not wired yet. The report API currently accepts an optional `imageUrl`; do not expose arbitrary upload handling without adding validated storage.
- Some dashboard/list/review screens in the retained Figma UI still contain sample display data. The APIs are in place, but those remaining screens must be connected before treating every page as production-ready.
- Payload CMS admin collections remain in the source project. The operational CampusFound tables for the core workflow are the MySQL schema above; Payload's database adapter is not configured as a MySQL adapter.
- For a real deployment, configure HTTPS, email verification, backups, and a university-approved email-domain policy. The current student registration accepts Gmail or `@bulsu.edu.ph` as shown in the UI.

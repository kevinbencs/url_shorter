# Url shortener - – Microservice-Based Full-Stack Application


## Overview
A production-style URL shortener built with a microservice architecture, focusing on scalability, observability, and API-driven design.

The system separates redirection, API logic, and frontend rendering, demonstrating real-world backend and frontend communication patterns, rate limiting, authentication, and usage analytics.

## Live Demo

Link: https://shorterurl123.duckdns.org

## Tech Stack

Frontend:
- React (Vite) – admin dashboard and UI
- TypeScript – type-safe frontend logic
- TailwindCSS – utility-first styling
- SWR – client-side data fetching and caching
- Chart.js – usage and click analytics

Backend:
- Node.js + Express – API and redirection services
- TypeScript – shared types and validation
- JWT – authentication and authorization
- Zod – request validation
- Rate limiting middleware

Infrastructure & Data:
- PostgreSQL – relational data storage
- Prisma – database ORM
- Docker – containerized services
- HTTP Proxy Middleware – API gateway routing

Testing:
- Jest – backend unit testing


## System requirements (according to the MoSCoW priority model)

### Must have
- Generation of unique, non-colliding short URLs
- Logging of client-side data (IP address, user agent, timestamp) for every click
- API interfaces for creating and resolving short URLs
- High availability through service separation

### Should have
- Support for limited lifetime or single-use short links
- Admin interface for statistics and link management
- Simple rate limiting on public API endpoints

### Could have
- Unique aliases (e.g.: `example.com/sale2025`)

### Won't have
- Dynamic target URLs (e.g.: A/B testing, time-based redirection)



## Architecture Overview

The system follows a microservice architecture consisting of:

- API service – link creation, management, authentication, and statistics
- Redirection service – high-performance URL resolution and logging
- Pages service – frontend rendering and dashboard
- Gateway – request routing and cross-cutting concerns
- PostgreSQL database – persistent storage


### Gateway

The gateway routes incoming requests to the appropriate service:

- `/r/*` → Redirection service
- `/api/*` → API service
- All other routes → Pages service

### Services Structure

Each backend service follows a consistent structure:

- `index.ts` – server bootstrap
- `routes/` – route definitions
- `schema/` – request validation using Zod
- `middleware/` – authentication and rate limiting
- `controllers/` – request handling and business logic

### Frontend

The frontend includes a React-based admin dashboard and public-facing pages (home, authentication, search, and error pages).

The dashboard allows users to:
- Create and manage short links
- View click statistics and analytics
- Monitor usage over time with charts
- Create time-limited or one-time-use links

## CI / Build Strategy

Due to limited memory on the Oracle Cloud instance, the React frontend is built using a GitHub Actions CI pipeline instead of building directly on the server.

The workflow:
- Installs dependencies and builds the React dashboard in GitHub Actions
- Packages the production build as a release artifact
- The built files are then deployed to the server without requiring a local build

This approach avoids memory-related build failures on the VM and reflects a real-world CI/CD-style workflow.


## Documentation

Detailed technical documentation (API, database schema, and setup guide) is available in the `/docs` folder.

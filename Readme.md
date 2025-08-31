# Url shorter

Here is the code of an url shorter project (in development). 

Technologies used: `react (vite), node.js, express, typescript, html, tailwindCSS, docker, prisma, jsonwebtoken, zod, http-proxy-middleware, swr, chart.js`

## System requirements (according to the MoSCoW priority model)

### Must have
- Generation of unique, non-colliding short URLs
- Logging of client-side data (IP address, user agent, timestamp) for every click
- API interfaces for creating and resolving short URLs
- MHigh availability

### Should have
- Support for limited lifetime or single-use short links
- Admin interface for statistics and link management
- Simple rate limiting on public API endpoints

### Could
- Unique aliases (e.g. `example.com/sale2025`)

### Won't
- Dynamic target URLs (e.g. A/B testing, time-based redirection)

## Usage guide:

## Description of the code

## Api Requests

- Post /api/signup

- Post /api/signin

- Get /api/logout

- Get /api/links

- Post /api/links

- Delete /api/link/:id

- Patch /api/link/:id

- Delete /api/link/:id

- Delete /api/delete/acc

- Patch /api/update/password

- Post /api/search/:url

- Get /api/name


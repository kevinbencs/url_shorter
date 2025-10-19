# Url shorter

Here is the code of an url shorter project (in development). 

Technologies used: `react (vite), node.js, express, typescript, html, tailwindCSS, docker, prisma, jsonwebtoken, zod, http-proxy-middleware, swr, chart.js, jest`

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

1. Create a .env file in the root directory containing the following (in the `DATABASE_URL` enter the appropriate values to the curly bracket):
```
POSTGRES_USER = ''
POSTGRES_PASSWORD = ''
POSTGRES_DB = ''
SECRET = ''
SECRET_COOKIE = ''

DATABASE_URL ='postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@postgres:5432/{POSTGRES_DB}'
```
2. Run `docker compose up --build -d`
3. Run the api tests (optional)

## Description of the code

Micro service which consists of 3 servers (api, redirect, pages), gateway, sql database (postgresSQL, prisma) and frontend (html, typescript, react).

### Gateway

Directing the requests to the suitable server take place in the gateway, `/r->redirection server, /api-> api server, everything else -> pages server`.

### Servers

All three servers are structured in the same way. The servers are created in the `index.ts`. The routes are in the `routes/routes.ts`. Api calls are checked in the `schema/schema.ts` with `zod`. Authorization checks are visible in `middleware` directory with limit checks. The requests are served in `controllers/controllers.ts`. 

### Frontend

React dashboard and some simple pages (home, signin signup, search, 404). The style of pages were creates using tailwindCSS. 

Pages of dashboard: new password, dashboard.

The dashboard contains links, viewers, chart.js graphs (date, viewer), times (minute), onces (can be used once).

### Prisma schemas

```
User {
  id String @id @default(uuid()) @db.Uuid
  email    String @unique
  password String
  name     String
  save_url String[] @default([])
  createdAt DateTime @default(now())
}
```

```
Url {
  id String @id @default(uuid()) @db.Uuid
  new_url  String @unique
  email String
  real_url String
  time Int
  once Boolean @default(false)
  viewer Int  @default(0)
  createdAt DateTime @default(now())
}
```

```
Click {
  id String @id @default(uuid()) @db.Uuid
  new_url String
  ip String
  createdAt DateTime @default(now())
  user_agent String
  referer String
  language String
  accept String
  token String @default("")
}
```

```
Token {
  email String
  id String @id @default(uuid()) @db.Uuid
  token String @unique
  use Boolean @default(true)
  createdAt DateTime @default(now())
}
```

## Api Requests

- Post /api/signup

Body:

``` 
password: string,
email: string,
name: string
```
Response:
```
Code Description
200  message: 'Signed up'
```

Error:
```
Code Description
500  error: 'Internal server error.
400  failed: string[],
401  error: 'Email is used in another account.'
```

- Post /api/signin

Body:

``` 
password: string,
email: string,
```
Response:
```
Code Description
302  redirect to /dashboard
```

Error:
```
Code Description
500  error: 'Internal server error.
400  failed: string[],
401  error: 'Invalid email or password. Please try again with the correct credentials'
429  error: 'Too many login attempts'
```


- Get /api/logout

Response:
```
Code Description
302  redirect to /
```

Error:
```
Code Description
500  error: 'Internal server error.
```

- Get /api/links
```
graphData {
    date: string,
    viewer: number,
}
```

```
linkDescription {
    real_url: string,
    id: string,
    new_url: string,
    viewer: number,
    once: boolean,
    time: number,
    email: string,
    data: graphData[]
}
```

Response:
```
Code Description
200  res: linkDescription[]
```

Error:
```
Code Description
500  error: 'Internal server error.
401  error: string
```


- Post /api/links

Body:

``` 
url: string (link)
newUrl: string || undefined
once: boolean
min: number (between 0 and 7200)
```

Response:
```
Code Description
200  message: 'Link added' 
```

Error:
```
Code Description
500  error: 'Internal server error.
400  failed: string[],
401  error: string
```

- Patch /api/link/:id

Body:

``` 
url: string || undefined
once: boolean
min: number (between 0 and 7200)
```

Response:
```
Code Description
200  message: 'Link updated' 
```

Error:
```
Code Description
500  error: 'Internal server error.
400  failed: string[],
401  error: string,
404  error: 'Link not found'
```

- Delete /api/link/:id


Response:
```
Code Description
200  message: 'Link deleted'
```

Error:
```
Code Description
500  error: 'Internal server error.
401  error: string
```

- Delete /api/delete/acc


Response:
```
Code Description
302  redirect to /
```

Error:
```
Code Description
500  error: 'Internal server error.
401  error: string
```

- Patch /api/update/password

Body:

``` 
password: string,
```

Response:
```
Code Description
200  message: 'Password changed'
```
Error:
```
Code Description
500  error: 'Internal server error.
400  failed: string[],
401  error: string
```

- Get /api/search/:url

Response:
```
Code Description
200  message: string
```

Error:
```
Code Description
500  error: 'Internal server error.
404  message: 'This url is not available.'
```

- Get /api/name

Response:
```
Code Description
200  name: string
```

Error:
```
Code Description
500  error: 'Internal server error.
401  error: string
```
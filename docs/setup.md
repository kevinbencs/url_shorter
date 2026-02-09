## Usage guide:

1. Create a .env file in the root directory containing the following (in the `DATABASE_URL` enter the appropriate values inside the curly braces):
```
POSTGRES_USER = ''
POSTGRES_PASSWORD = ''
POSTGRES_DB = ''
SECRET = ''
SECRET_COOKIE = ''

DATABASE_URL ='postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@postgres:5432/{POSTGRES_DB}'
```
2. Run `docker compose up --build -d`
3. Run the API tests (optional)


## Usage guide for https with self-signed certificates:

1. Create a .env file in the root directory containing the following (in the `DATABASE_URL` enter the appropriate values to the curly bracket):
```
POSTGRES_USER = ''
POSTGRES_PASSWORD = ''
POSTGRES_DB = ''
SECRET = ''
SECRET_COOKIE = ''

DATABASE_URL ='postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@postgres:5432/{POSTGRES_DB}'
```
2. Run `mkdir certs`
3. Run 
```
  openssl req -x509 -newkey rsa:4096 -nodes -days 365 \
  -keyout certs/selfsigned.key -out certs/selfsigned.crt \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
```
4. Run `node writeFile/cert.js`
5. Run `docker compose up --build -d`
6. Run the API tests (optional)

## Usage guide for Oracle Cloud, free tier and Vercel:

1. Create a database in Prisma https://console.prisma.io/login

2. Create a .env file in the root directory containing the following (in the free cloud service, we get 1 GB RAM, so we use Prisma database):
```
SECRET = ''
SECRET_COOKIE = ''

DATABASE_URL =''
```
3. Run `cd frontend/dashboard && mkdir dist && cd dist && wget https://github.com/kevinbencs/url_shorter/releases/download/build-20251217-231634/dashboard-dist.zip && unzip dashboard-dist.zip && cd `
4. Run `mkdir letsencrypt && touch letsencrypt/acme.json && chmod 600 letsencrypt/acme.json `
5. Run `node writeFile/encrypt.js`
6. Write `app.set('trust proxy', 1)` into the `gateway/src/gateway.ts` after the `const app = express();`.
7. Open the ports (80, 443) on the firewalls (on the OS and in the dashboard)
8. Upload the redirect server to Vercel (for the faster redirect). The easiest way is to upload the code to GitHub and then host it on Vercel.
9. Set up the domain names (change the `https://redirect123.duckdns.org/` domain name in the `frontend/dashboard/dist/assets/index-TwH4gR_u.js` too).
10. Run `docker compose build `
11. Run `docker compose up -d`
12. Run the API tests (optional)
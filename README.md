# Products App

A products manager with an Angular frontend and a Spring Boot backend.

- `products-app/` - Angular 22 frontend (Kendo UI)
- `backend/` - Spring Boot 3.5 REST API (Java 21, PostgreSQL, JWT)

## Running it

1. Create a PostgreSQL database called `products`.
2. Copy `backend/.env.example` to `backend/.env` and fill in the values.
3. Start the backend (runs on http://localhost:8080):

   ```bash
   cd backend
   mvn spring-boot:run
   ```

4. Start the frontend (runs on http://localhost:4200):

   ```bash
   cd products-app
   npm install
   npm start
   ```

On first start the backend creates the tables, an admin user (from `.env`) and three sample products.

## API

| Method | URL                   | Login needed |
| ------ | --------------------- | ------------ |
| POST   | `/api/auth/signup`    | No           |
| POST   | `/api/auth/login`     | No           |
| GET    | `/api/products`       | No           |
| GET    | `/api/products/{id}`  | No           |
| POST   | `/api/products`       | Yes          |
| PUT    | `/api/products/{id}`  | Yes          |
| DELETE | `/api/products/{id}`  | Yes          |

Requests that need a login send the token as `Authorization: Bearer <token>`.

## Tests

```bash
cd backend
mvn test
```

# School Management APIs (Node.js + Express + MySQL)

APIs to add schools and list them sorted by distance to a user location.

## Quick start

1. Install deps

npm install


2. Configure environment (.env)

PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=school_db
DB_CONN_LIMIT=10


3. Start server

npm run dev


Health: GET /health → { status: "ok" }

## APIs

- POST /addSchool
  - body: { name, address, latitude, longitude }
  - returns: created record id and fields

- GET /listSchools?latitude=..&longitude=..
  - returns: list of schools with distance_km sorted ascending

## DB

On start, the server ensures the schools table exists.

## Deploy

- Provide env vars. You can use the provided Dockerfile.

## Postman

Import postman_collection.json and set base URL variable if needed.

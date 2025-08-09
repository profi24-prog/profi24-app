# PROFI24 App

PROFI24 is a service marketplace platform for connecting clients with skilled specialists and managing repair or maintenance orders. This repository contains the source code for the web application, including a Node.js/Express backend, a frontend built with HTML/JavaScript and a basic CRM module. The project is structured to easily extend with a mobile application and integrated payments (Kaspi, Apple Pay, bank cards) in future phases.

## Features

- **Node.js/Express API** with endpoints for:
  - `/api/services` – list of available service categories.
  - `/api/orders` – create, view, accept, complete and rate orders.
  - `/api/analytics` – simple statistics about users and orders.
  - `/api/crm/contacts` and `/api/crm/tasks` – basic CRM for managing contacts and tasks.
  - `/api/hello` – test endpoint to verify the API is running.

- **In-memory data store** for quick prototyping. A PostgreSQL schema is provided in `database/schema.sql` for production use.

- **Frontend**: responsive dark-themed UI with pages for creating orders, viewing and managing orders, and a CRM dashboard. The frontend communicates with the API using relative URLs.

- **Authentication and Roles** (planned): the backend structure is ready to support clients, specialists and administrators.

- **Payments** (planned): integration with Kaspi, Apple Pay and bank card gateways.

- **CRM**: simple contact and task management module similar to HelloClient.

## Project Structure

```
.
├── backend/              # (future) backend-specific modules; API routes live in server.js
├── database/
│   └── schema.sql        # PostgreSQL schema for users, services, orders, contacts and tasks
├── frontend/
│   └── index.html        # front-end SPA using vanilla JS
├── server.js             # entry point for Node.js Express server
├── package.json          # npm dependencies and scripts
└── README.md
```

## Prerequisites

- **Node.js** v14 or later
- **npm** (comes with Node.js)
- Optional: **PostgreSQL** if you want persistent storage.

## Installation

1. Clone the repository or download the source code.
2. Install dependencies:

```bash
npm install
```

3. To run with the in-memory store (for testing):

```bash
npm start
```

The server will start on port 3000 by default. Open `http://localhost:3000` in your browser to access the frontend. The API is served from the same port.

4. To connect to PostgreSQL, create a database and run the schema:

```bash
psql -U <username> -d <dbname> -f database/schema.sql
```

Then set the `DATABASE_URL` environment variable before starting the server:

```bash
export DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>
npm start
```

The application will automatically use PostgreSQL instead of the in-memory store (Note: database integration is to be implemented).

## Deployment

For quick deployment you can use services like **Render** or **Heroku**:

- Create a new Node.js web service.
- Set the build command to `npm install` and the start command to `npm start`.
- Add environment variables such as `DATABASE_URL` for your Postgres instance.
- Point your domain (e.g. `profi24.kz`) or subdomain to the deployed service.

### Render Example

1. Push your repository to GitHub.
2. In Render, create a new Web Service and connect your repository.
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/hello`
4. Deploy and access the generated URL.

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, enhancements or new features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

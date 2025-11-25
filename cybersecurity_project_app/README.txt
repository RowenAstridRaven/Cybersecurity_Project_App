# Cybersecurity Hub Application (React + TypeScript + SQLite)

## Prerequisites
Ensure you have the following installed:
- Node.js (latest LTS version)
- npm (Node Package Manager)
- VS Code (Recommended IDE)
- Git (optional for version control)

###1. Install Dependencies
For the **backend**, navigate to the `server/` folder:
cd server npm install

For the **frontend**, navigate to the `client/` folder:
cd client npm install

### 3. Running the Application
Start the **backend**:
cd server npm run dev # or "npm start"

Start the **frontend**:
cd client npm start # or "npm run dev" for Vite

## Database Setup
- The backend automatically initializes an SQLite database in `server/database.sqlite`.
- Database schema is configured in `server/db.ts`.
- If needed, clear the database by deleting `database.sqlite` and restarting the backend.

## Development
- Open VS Code and load the project folder.
- Use `npm run dev` for live reload during development.
- Modify React components in `client/src/components/`.

## Notes
- The application uses React for the frontend, Express for the backend, and SQLite for storage.
- The API endpoints are in `server/routes/`.
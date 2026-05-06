# Semestral Project – Task List App

## How to run

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. Open in browser: http://localhost:3000

## Admin login
- URL: http://localhost:3000/admin.html
- Username: `admin`
- Password: `admin123`

## API Endpoints

| Method | URL             | Description     |
|--------|-----------------|-----------------|
| GET    | /api/items      | Get all items   |
| GET    | /api/items/:id  | Get one item    |
| POST   | /api/items      | Create item     |
| PUT    | /api/items/:id  | Update item     |
| DELETE | /api/items/:id  | Delete item     |

## Data persistence
All data is saved in `data.json` file.

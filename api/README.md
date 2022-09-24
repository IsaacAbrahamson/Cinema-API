# Cinema App Backend

## About

This project uses Node.js, Express.js, TypeScript, and MySQL. You will need to have at least Node.js version 16.14 and MySQL installed to run this project locally.

## Database ERD

This project uses a MySQL database. It will be helpful to understand the basic schema by viewing the diagram below. Note that the `Movies`, `Showings`, and `Tickets` tables showin in gray are recreated 

![ERD](https://user-images.githubusercontent.com/17521691/192074719-1b368223-c8ed-4008-a82b-34e2e1395f1c.png)

## API Endpoints

You visit the following endpoints in your browser or an API program like Postman to test the backend without installing the frontend application.

### Movie endpoints:
```
GET /api/movie/all
GET /api/movie/searchMovie?id=1
GET /api/movie/searchShowing?id=1
GET /api/movie/favorites?date=2022-09-06
GET /api/movie/showings?date=2022-09-06
```
### Ticket endpoints:
```
GET /api/ticket/find?showingId=1
```
### Order endpoints:
```
POST /api/order/new
```
With JSON request body:
```json
{
    
    "user": 1,
    "cart": [
        {
            "showing": 3,
            "seat": "A1"
        },
        {
            "showing": 3,
            "seat": "A2"
        }
    ]
}
```

## Getting Started

Create a new MySQL database for the project.
```
CREATE DATABASE cinema;
```
Open a terminal and navigate to the `/api` directory.
```
cd api
```
Install dependencies
```
npm install
```
Create `.env` file and add values for database and [TMDB api key](https://www.themoviedb.org/signup?language=en-US)
```
TMDB_API_KEY="..."
DB_NAME="..."
DB_HOST="..."
DB_USER="..."
DB_PASS="..."
PORT="..."
```
Create database schema and fill it with data from TMDB api  
```
npm run update dropall
```
Start server
```
npm run dev
```
or build for production
```
npm run build
```

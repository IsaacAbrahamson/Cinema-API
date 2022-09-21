# Theater App

- Uses The Movie Database api to get information on current movies in theaters
- REST api backend in Nodejs and sequelize
- Accounted for race conditions when updating database by using MySQL transaction locks
- Created algorithm to schedule showtimes based on popularity

## Getting Started

Install dependencies
```
npm install
```
Create `.env` file
```
TMDB_API_KEY="..."
DB_NAME="..."
DB_HOST="..."
DB_USER="..."
DB_PASS="..."
```
Create database in MySQL
```
CREATE DATABASE cinema;
```
Update database
```
npm run update dropall
```


## Calling API

### movie endpoint
GET `/api/movie/all`
GET `/api/movie/searchMovie?id=1`
GET `/api/movie/searchShowing?id=1`
GET `/api/movie/favorites?date=2022-09-06`
GET `/api/movie/showings?date=2022-09-06`

### ticket endpoint
GET `/api/ticket/find?showingId=1`

### order endpoint

POST `/api/order/new`
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

## Updating Database

Run the ./utils/updateDB.js file or just do the following script:
```
npm run update

# recreate all tables including users and orders
npm run update dropall
```
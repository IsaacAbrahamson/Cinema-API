# Theater App

- Uses The Movie Database api to get information on current movies in theaters
- REST api backend in Nodejs and sequelize
- Accounted for race conditions when updating database by using MySQL transaction locks
- Created algorithm to schedule showtimes based on popularity


## Calling API

### movie endpoint
GET `/api/movie/all`
GET `/api/movie/searchMovie?id=1`
GET `/api/movie/searchShowing?id=1`
GET `/api/movie/favorites?date=2022-09-06`
GET `/api/movie/showings?date=2022-09-06`

### ticket endpoint
GET `/api/ticket/find?showingId=1`
POST `/api/ticket/buy` with JSON body of { showingId, seat }
```

## Updating Database

Run the ./utils/updateDB.js file or just do the following script:
```
npm run update

# recreate all tables including users and orders
npm run update dropall
```

## .env file
```
TMDB_API_KEY="..."
DB_NAME="..."
DB_HOST="..."
DB_USER="..."
DB_PASS="..."
```
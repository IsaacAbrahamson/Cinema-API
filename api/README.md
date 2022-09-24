# Cinema App Backend

## About

This project uses Node.js, Express.js, TypeScript, and MySQL. You will need to have at least Node.js version 16.14 and MySQL installed to run this project locally.

## Database ERD

This project uses a MySQL database. It will be helpful to understand the basic schema by viewing the diagram below. Note that the `Movies`, `Showings`, and `Tickets` tables shown in gray are recreated every time the database update script is ran (usually daily)

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
To initially create database with data from TMDB api 
```
npm run update dropall
```
Do not include the `dropall` option if you want to persist users and order history
```
npm run update
```
Start server
```
npm run dev
```

## Deploying to Production

Compile the typescript. This will also copy `package.json` to the `/dist` folder.
```
npm run build
```
Upload the `/dist` folder to the Linux server. Make sure to create a `.env` file with the correct MySQL information for the server.
```
cat .env
```
Install dependencies
```
npm install
```
Instead of running `npm run update` to update the database, run `npm run cronUpdate` as it is made for linux production.
```
sudo npm run cronUpdate dropall
```
Start the server
```
pm2 start app.js --name cinema-app
```
Test that server is running
```
curl http://localhost:3005/api/movie/all
```

## Automating Database Updates

The database is designed to be updated daily with the latest movie information. The `./utils/updateDB.js` script will call the TMDB api and recreate the `Movies`, `Showings`, and `Tickets` tables. `Users`, `Orders`, and `TicketHistories` tables persist unless the `dropall` command line argument is added.

Before creating a crontab, running the script directly will require you to have the `.env` file inside the `/utils` folder.
```
sudo cp ./.env ./utils/.env
```
Next, determine node.js location
```
which node
```
Open crontab
```
sudo crontab -e
```
Run the database update every morning at 4:55am
```
55 04 * * * /usr/bin/node /home/isaac/cinema/utils/updateDB.js
```

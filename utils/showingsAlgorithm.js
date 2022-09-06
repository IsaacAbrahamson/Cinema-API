// Algorithm used to schedule showing times given list of available theaters, times, and movies
import { imaxRooms, regRooms } from '../config/theaters.js'

// Returns two-dimensional array of seats wth row and col
// [[x,y],[x,y],[x,y],[x,y]]
export function createSeats() {
  // Hardcoded defaults for theater
  // Potentially add possibly to configure in ./config/theaters.js
  const rows = 10
  const cols = 16
  let seats = []

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      let letter = String.fromCharCode(row + 64)
      seats.push([letter, col])
    }
  }

  return seats
}

// Creates times for favorite and showing movies for x number of days
export function createTimes(favorites, showings, days) {
  let output = []

  for (let day = 0; day < days; day++) {
    // Store all available movie times
    let times = []

    // Create two imax times for all favorite movies
    times = getTimes(favorites, imaxRooms, times, day)
    times = getTimes(favorites, imaxRooms, times, day)

    // Create imax times for showings until all imax rooms are full
    while (times.length < countAvailable(imaxRooms)) {
      times = getTimes(showings, imaxRooms, times, day)
    }

    // Create regular times for all showings until all regular rooms are full
    while (times.length < countAvailable(regRooms)) {
      times = getTimes(showings, regRooms, times, day)
    }

    output.push(times)
  }

  return output
}


// calculate all of the times available for a list of rooms
function countAvailable(rooms) {
  let count = 0
  for (let room of rooms) {
    for (let time of room.times) {
      count++
    }
  }
  return count
}


// Creates a time for each movie in a list based on a list of rooms
// Can be passed in optional reservations list from previous function calls
function getTimes(movies, rooms, reservations = [], day) {
  movieLoop:
  for (let movie of movies) {
    roomsLoop:
    for (let room of rooms) {

      timesLoop:
      for (let i = 0; i < room.times.length; i++) {
        // Create date based on day and room time
        let date = new Date(new Date().setDate(new Date().getDate() + day))
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
        date = date.toISOString().slice(0, 10)
        date = date + ' ' + room.times[i]

        if (reservations.some(reserved => reserved.name === room.name && reserved.time === date)) {
          continue
        } else {
          reservations.push({
            name: room.name,
            time: date,
            apiID: movie.id,
          })
          break roomsLoop
        }
      }
    }
  }

  return reservations
}
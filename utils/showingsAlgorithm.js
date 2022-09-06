// Algorithm used to schedule showing times given list of available theaters, times, and movies
import { imaxRooms, regRooms } from '../config/theaters.js'

// Creates times for favorite and showing movies for x number of days
export function createTimes(favorites, showings, days) {
  let output = []

  for (let day = 0; day < days; day++) {
    // Store all available movie times
    let times = []

    // Create two imax times for all favorite movies
    times = getTimes(favorites, imaxRooms, times)
    times = getTimes(favorites, imaxRooms, times)

    // Create imax times for showings until all imax rooms are full
    while (times.length < countAvailable(imaxRooms)) {
      times = getTimes(showings, imaxRooms, times)
    }

    // Create regular times for all showings until all regular rooms are full
    while (times.length < countAvailable(regRooms)) {
      times = getTimes(showings, regRooms, times)
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
function getTimes(movies, rooms, reservations = []) {
  movieLoop:
  for (let movie of movies) {
    roomsLoop:
    for (let room of rooms) {

      timesLoop:
      for (let i = 0; i < room.times.length; i++) {
        if (reservations.some(reserved => reserved.name === room.name && reserved.time === room.times[i])) {
          continue
        } else {
          reservations.push({
            name: room.name,
            time: room.times[i],
            apiID: movie.id,
          })
          break roomsLoop
        }
      }
    }
  }

  return reservations
}
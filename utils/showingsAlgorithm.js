// Algorithm used to schedule showing times given list of available theaters, times, and movies
import { regRooms } from '../config/theaters.js'

// Creates times for favorite and showing movies for x number of days
export function createTimes(favorites, showings, days) {
  let output = []

  for (let day = 0; day < days; day++) {
    // Store all available movie times
    let times = []

    // Create times until all rooms are full
    while (times.length < countAvailable(regRooms)) {
      times = createRooms(showings, regRooms, day)
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


// take list of movies, available rooms, list of already chosen rooms, and the current day
// and create room times
function createRooms(movies, rooms, day) {
  let reservedTimes = []

  // loop through rooms and movies
  for (let i = 0; i < rooms.length; i++) {
    // loop through times for each room
    for (let timeSlot of rooms[i].times) {
      const roomTime = `${getDate(day)} ${timeSlot}`
      reservedTimes.push({ name: rooms[i].name, time: roomTime, apiID: movies[i].id, })
    }
  }

  return reservedTimes
}



function getDate(day) {
  let date = new Date(new Date().setDate(new Date().getDate() + day))
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  date = date.toISOString().slice(0, 10)
  return date
}
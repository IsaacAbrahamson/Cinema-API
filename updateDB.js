// Find all of the current movies that are showing in theaters for a week and schedule all of them in the database
// This file is automatically run every week to update the database for that week

import * as dotenv from 'dotenv'
dotenv.config()
import fetch from 'node-fetch'



async function getTrailer(id) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?&api_key=${process.env.API_KEY}`)
  const data = await response.json()

  // Reverse array so first trailer is used
  const trailers = data.results.filter(video => video.type = 'Trailer').reverse()
  return 'https://www.youtube.com/watch?v=' + trailers[0].key
}



// Finds the movies that are currently playing in theaters
async function getShowings(daysBefore, daysAfter) {
  const beginDate = new Date(new Date().setDate(new Date().getDate() - 30))
  const beginString = beginDate.toISOString().split('T')[0]
  const endDate = new Date(new Date().setDate(new Date().getDate() + 7))
  const endString = endDate.toISOString().split('T')[0]

  // Find only movies currently in US theaters
  const options = [
    `api_key=${process.env.API_KEY}`,
    'with_release_type=3|2',
    'region=US',
    'language=en-US',
    `primary_release_date.gte=${beginString}`,
    `primary_release_date.lte=${endString}`,
    'sort_by=popularity.desc',
  ].join('&')

  const response = await fetch('https://api.themoviedb.org/3/discover/movie?' + options)
  const data = await response.json()

  for (let video of data.results) {
    video.trailer = await getTrailer(video.id)
    video.backdrop = 'https://image.tmdb.org/t/p/original/' + video.backdrop_path
    video.poster = 'https://image.tmdb.org/t/p/original/' + video.poster_path
  }

  return data.results
}



// Gets the most popular movies that are staying theaters
async function getFavorites() {
  const beginDate = new Date(new Date().setDate(new Date().getDate() - 90))
  const beginString = beginDate.toISOString().split('T')[0]

  const options = [
    `api_key=${process.env.API_KEY}`,
    'with_release_type=3|2',
    'region=US',
    'language=en-US',
    `primary_release_date.gte=${beginString}`,
    'sort_by=popularity.desc',
    'vote_count.gte=1000',
  ].join('&')

  const response = await fetch('https://api.themoviedb.org/3/movie/popular?' + options)
  const data = await response.json()

  for (let video of data.results) {
    video.trailer = await getTrailer(video.id)
    video.backdrop = 'https://image.tmdb.org/t/p/original/' + video.backdrop_path
    video.poster = 'https://image.tmdb.org/t/p/original/' + video.poster_path
  }

  return data.results
}



let showings = await getShowings()
let favorites = await getFavorites()
console.log(showings, favorites)
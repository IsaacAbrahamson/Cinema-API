// Helper functions to call The Movie Database API
// https://developers.themoviedb.org/3

import * as dotenv from 'dotenv'
import fetch from 'node-fetch'
dotenv.config()

// Finds the movies that are currently playing in theaters
export async function getShowings() {
  const beginDate = new Date(new Date().setDate(new Date().getDate() - 14))
  const beginString = beginDate.toISOString().split('T')[0]
  const endDate = new Date(new Date().setDate(new Date().getDate() + 7))
  const endString = endDate.toISOString().split('T')[0]

  // Find only movies currently in US theaters
  const options = [
    `api_key=${process.env.TMDB_API_KEY}`,
    'with_release_type=3|2',
    'region=US',
    'language=en-US',
    `primary_release_date.gte=${beginString}`,
    `primary_release_date.lte=${endString}`,
    'sort_by=popularity.desc',
  ].join('&')

  const response = await fetch('https://api.themoviedb.org/3/discover/movie?' + options)
  const data: any = await response.json()

  const limit = 7
  const limitedResults = data.results.slice(0, limit)

  for (let video of limitedResults) {
    video.trailer = await getTrailer(video.id)
    video.backdrop = 'https://image.tmdb.org/t/p/original' + video.backdrop_path
    video.poster = 'https://image.tmdb.org/t/p/original' + video.poster_path
  }

  return limitedResults
}


// Gets the most popular movies that are staying theaters
export async function getFavorites() {
  const beginDate = new Date(new Date().setDate(new Date().getDate() - 30))
  const beginString = beginDate.toISOString().split('T')[0]

  const options = [
    `api_key=${process.env.TMDB_API_KEY}`,
    'with_release_type=3|2',
    'region=US',
    'language=en-US',
    `primary_release_date.gte=${beginString}`,
    'sort_by=popularity.desc',
    'vote_count.gte=1000',
  ].join('&')

  const response = await fetch('https://api.themoviedb.org/3/movie/popular?' + options)
  const data: any = await response.json()

  for (let video of data.results) {
    video.trailer = await getTrailer(video.id)
    video.backdrop = 'https://image.tmdb.org/t/p/original' + video.backdrop_path
    video.poster = 'https://image.tmdb.org/t/p/w500' + video.poster_path
  }

  return data.results
}


export async function getTrailer(id: any) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?&api_key=${process.env.TMDB_API_KEY}`)
  const data: any = await response.json()

  // Reverse array so first trailer is used
  const trailers = data.results.filter((video: any) => video.type = 'Trailer').reverse()

  if (trailers[0]) {
    return trailers[0].key
    // return 'https://www.youtube.com/watch?v=' + trailers[0].key
  } else {
    return null
  }
}
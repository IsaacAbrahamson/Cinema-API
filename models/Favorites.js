import mongoose from "mongoose"

const favoriteSchema = new mongoose.Schema({
  apiId: Number,
  title: String,
  overview: String,
  releaseDate: String,
  trailer: String,
  backdrop: String,
  poster: String,
})

const Favorite = mongoose.model('Favorite', favoriteSchema)
export default Favorite
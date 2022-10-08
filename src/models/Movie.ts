import mongoose from "mongoose";
import { IMovie } from "../commun";

export const movieSchema = new mongoose.Schema(
  {
    url: String,
    imdb_code: String,
    title: { type: String, required: true },
    title_english: String,
    title_long: String,
    slug: String,
    year: Number,
    rating: { type: Number, required: true },
    runtime: Number,
    genres: [String],
    download_count: Number,
    like_count: Number,
    summary: String,
    description_intro: String,
    description_full: String,
    synopsis: String,
    yt_trailer_code: String,
    language: String,
    mpa_rating: String,
    background_image: String,
    background_image_original: String,
    small_cover_image: String,
    medium_cover_image: String,
    large_cover_image: String,
    state: { type: String, default: "ok" },
    torrents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Torrent",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMovie>("Movie", movieSchema);

import mongoose from "mongoose";
import { ITorrent } from "../commun";

export const torrentSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    hash: { type: String, required: true, unique: true },
    quality: String,
    type: String,
    seeds: Number,
    peers: Number,
    size: String,
    size_bytes: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITorrent>("Torrent", torrentSchema);

import mongoose from "mongoose";

const repArtists = new mongoose.Schema({
  name: String,
  genre: String,
  age: Number,
});

export const RepArtists = mongoose.model("repartists", repArtists);


const express = require("express");
const { MovieModel } = require("../model/movie.model");

const movieRouter = express.Router();

// Get all movies
movieRouter.get("/movies", async (req, res) => {
  try {
    
    const movies = await MovieModel.find();
    res.status(200).send({ msg: "All Movie's Data", movies });
 
  } catch (err) 
  {
   res.status(500).send({ msg: "Internal Server Error" }, movies);
  }
});

// Add Movie
movieRouter.post("/movies", async (req, res) => {
  try {
        const existingMovie = await MovieModel.findOne({ title: req.body.title });
    
        if (existingMovie) {
        return res.status(400).send({ msg: "Movie already exists" });
    }
    const movie = new MovieModel(req.body);
    await movie.save();
    res.status(200).send({ msg: "The new movie has been added", new_movie: movie });
  
  } catch (err) {
   
    res.status(400).send({ msg: "Internal Server Error" });
  }
});

// Update movie
movieRouter.patch("/movies/:movieId", async (req, res) => {
  const { movieId } = req.params;
  try {
    
    await MovieModel.findByIdAndUpdate({ _id: movieId }, req.body);
    res.status(200).send({ msg: `The movie with id:${movieId} has been Updated` });
     
  } catch (err) {
    res.status(400).send({ msg: "Internal Server Error" });
  }
});

// Delete movie
movieRouter.delete("/movies/:movieId", async (req, res) => {
  const { movieId } = req.params;
  try {
    
    await MovieModel.findByIdAndDelete({ _id: movieId }, req.body);
    res.status(200).send({ msg: `The movie with id:${movieId} has been Deleted` });
     
  } catch (err) {
    res.status(400).send({ msg: "Internal Server Error" });
  }
});

module.exports = {
   movieRouter
  };
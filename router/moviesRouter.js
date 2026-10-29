const express = require("express")

const router = express.Router();

const{getAllMovies,getSingleMovie,createMovie,updateMovie,deleteMovie} = require("../controller/moviesController");

router.get("/" , getAllMovies);
router.get("/:id" , getSingleMovie);
router.post("/" , createMovie),
router.patch("/:id" , updateMovie)
router.delete("/:id" , deleteMovie)

module.exports = router;
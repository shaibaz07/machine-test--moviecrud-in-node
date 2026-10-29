
// const { error } = require("node:console")
const { error } = require("node:console")
const { movies } = require("../data/data")

const getAllMovies = (req, res) => {
    try {
        res.status(200).json({
            ok: true,
            message: "data fetched successfully",
            data: movies
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error while fetching movies",
            error: err.message
        })
    }
}


const getSingleMovie = (req, res) => {
    const id = req.params.id;
    try {
        const movie = movies.find(m => m.id === id)
        if (!movie) {
            return res.status(404).json({
                ok: false,
                message: `movie with id ${id} not found`
            })
        }
        res.status(200).json({
            ok: true,
            message: `movie with id ${id} fetched successfully`,
            data: movie
        })


    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error file fetching movies",
            error: err.message
        })

    }
}


const createMovie = (req, res) => {
    try {
        const { title, imageUrl, rating = 2, description = "unknown" } = req.body;
        if (!title || !imageUrl) {
            return res.status(400).json({
                ok: false,
                message: `Title and image fields are required...`
            })
        }

        const newMovie = {
            title: title,
            imageUrl: imageUrl,
            rating: rating,
            description: description,
            id: Date.now().toString(),
            createdAt: Date.now(),
            updatedAt: null
        }

        movies.unshift(newMovie);
        res.status(201).json({
            ok: true,
            message: `New Movie with id ${newMovie.id} is created successfully...`,
            data: newMovie
        })


    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Error while creating movie..`,
            error: err.message
        })
    }
}

const updateMovie = (req, res) => {
    const movieId = req.params.id;
    try {
        const updateIndex = movies.findIndex(m => m.id === movieId);
        if (updateIndex === -1) {
            return res.status(404).json({
                ok: false,
                message: `Moive with id ${movieId} doesn't exist...`
            })
        }
        let body = req.body;
        if (!title || !imageUrl) {
            return res.status(400).json({
                ok: false,
                message: `title and image url are requires fields`
            })
        }

        const updatedMovie = {
            ...movies[updateIndex],
            title: title,
            imageUrl: imageUrl,
            rating: rating,
            description: description,
            updatedAt: Date.now()
        }

        movies[updateIndex] = updatedMovie;
        res.status(200).json({
            ok: true,
            message: `MOvie with id : ${movieId} is updated successfully...`,
            data: updatedMovie
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Error while updating movie with id : ${movieId}`,
            error: err.message
        })
    }
}

const deleteMovie = (req, res) => {
    const deleteId = req.params.id;
    try {
        const deleteIndex = movies.findIndex(m => m.id === deleteId);
        if (deleteIndex === -1) {
            return res.status(404).json({
                ok: false,
                message: `Movie wiht id : ${deleteId} doesn't exist...`
            })
        }

        movies.splice(deleteIndex, 1);
        res.status(200).json({
            ok: true,
            message: `Movie with id : ${deleteId} is deleted successfully...`,
            data: movies[deleteIndex]
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Error while deleting movie with id : ${deleteId}`,
            error: err.message
        })
    }
}




module.exports = {
    getAllMovies,
    getSingleMovie,
    createMovie,
    updateMovie,
    deleteMovie
}


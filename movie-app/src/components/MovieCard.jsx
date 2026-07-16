
function MovieCard({ movie }) {
    const imageUrl =`https://image.tmdb.org/t/p/w500${movie.poster_path}`
    return (

        <div className="bg-gray-800 rounded-xl overflow-hidden">
            <img src={imageUrl} alt="movie poster" className="w-full object-cover" />
            <div className="mx-2 my-4">
                <h2>Name: {movie.title}</h2>
                <h2>Rating: {(movie.vote_average).toFixed(1)}</h2>
                <h2>Release: {movie.release_date}</h2>
            </div>
        </div>
    )
}

export default MovieCard

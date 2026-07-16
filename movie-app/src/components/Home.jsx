import { useEffect, useState } from "react";
import { getPopularMovies } from "../api/tmdb";
import MovieCard from "./MovieCard";


function Home({ searchResults }) {

    const [movies, setMovies] = useState([]);


    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getPopularMovies();
            setMovies(data);
        }
        fetchMovies();
    }, [])
    console.log(movies);

    return (

        <div className="bg-black text-white p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold">
                    Popular Movies
                </h1>
                <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-8 mt-4">
                    {
                        (searchResults.length > 0 ? searchResults : movies).filter((movie) => movie.poster_path).map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />

                            ))
                    }
                </div>
            </div>
        </div>
    )
}


export default Home;
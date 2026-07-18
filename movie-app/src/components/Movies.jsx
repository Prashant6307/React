import { useEffect, useState } from "react";
import { API_KEY } from "../api/tmdb";
import MovieCard from "./MovieCard";
import { useParams } from "react-router-dom";


function Movies() {

    const { category } = useParams();

    const [movies, setMovies] = useState([]);





    useEffect(() => {
        const getCategories = async (category) => {
            let url;

            if (category === "trending") {
                url = "trending/movie/day"
            }
            else {
                url = `movie/${category}`
            }
            const res = await fetch(
                `https://api.themoviedb.org/3/${url}?api_key=${API_KEY}`
            )
            const data = await res.json();
            setMovies(data.results);
        }
        getCategories(category);

    }, [category])


    return (
        <div className="bg-black text-white p-4 ">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    {category.replace("_", " ").replace(/\b\w/g, char => char.toUpperCase())}
                </h1>


                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

                    {
                        movies
                            .filter(movie => movie.poster_path)
                            .map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                />
                            ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Movies

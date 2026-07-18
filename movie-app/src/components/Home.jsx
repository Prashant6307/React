import { useEffect, useState } from "react";
import { API_KEY, getPopularMovies } from "../api/tmdb";
import MovieCard from "./MovieCard";


function Home({ searchResults }) {

    const [movies, setMovies] = useState([])
    const [activeCategory, setActiveCategory] = useState("popular");

    const getCategories = async (category) => {
        let url

        if (category === "trending") {
            url = "trending/movie/day"
        }
        else {
            url = `movie/${category}`
        }
        const res = await fetch(
            `https://api.themoviedb.org/3/${url}?api_key=${API_KEY}`
        )
        const data = await res.json()
        setMovies(data.results)
        setActiveCategory(category)
    }

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getPopularMovies();
            setMovies(data);
        }
        fetchMovies();


    }, [])

    return (

        <div className="bg-black text-white p-4">
            <div className="max-w-7xl mx-auto">

                <div className="text-4xl font-bold flex justify-between">
                    <button onClick={() => getCategories("popular")} className={ activeCategory === "popular" ? "bg-gray-800 text-white p-2 rounded-xl cursor-pointer" : "bg-black text-white p-2 cursor-pointer"}>Popular</button>
                    <button onClick={() => getCategories("top_rated")} className={activeCategory === "top_rated" ? "bg-gray-800 text-white p-2 rounded-xl cursor-pointer" : "bg-black text-white p-2 cursor-pointer"}>Top Rated</button>
                    <button onClick={() => getCategories("trending")} className={activeCategory === "trending" ? "bg-gray-800 text-white p-2 rounded-xl cursor-pointer" : "bg-black text-white p-2 cursor-pointer"}>Trending</button>
                    <button onClick={() => getCategories("upcoming")} className={activeCategory === "upcoming" ? "bg-gray-800 text-white p-2 rounded-xl cursor-pointer" : "bg-black text-white p-2 cursor-pointer"}>Upcoming</button>
                </div>
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
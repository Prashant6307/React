import { useParams } from "react-router-dom"
import { API_KEY } from "../api/tmdb"
import { useEffect, useRef, useState } from "react"
import "../App.css"

function MovieDetails() {
    const [details, setDetails] = useState(null)
    const [cast, setCast] = useState([])
    const { movieId } = useParams()
    const carouselRef = useRef()
    console.log(cast);




    useEffect(() => {
        const fetchMovieDetails = async (movieId) => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
            const data = await res.json()
            console.log(data);
            setDetails(data)
        }
        fetchMovieDetails(movieId)

        const getCast = async (movieId) => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`)
            const data = await res.json()
            setCast(data)
        }
        getCast(movieId)

    }, [movieId])

    return (
        <div className="bg-black">
            {details && (
                <div className="max-w-7xl mx-auto">
                    <div className="relative flex">

                        <img src={`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`} alt={details.title} className="" />
                        <div className="absolute p-4 text-gray font-bold bg-gradient-to-r from-black to-transparent text-gray-200 h-full ">
                            <p className="mt-[16%]">{details.title}</p>
                            <div className="flex items-center gap-8 ">
                                <p>{(details.vote_average).toFixed(1)}</p>
                                <img src={`https://image.tmdb.org/t/p/w200${details.production_companies[0]?.logo_path}`} alt="" className="max-w-12" />
                                <p>{details.runtime && (details.runtime / 60).toFixed(1)}hrs</p>
                            </div>
                            <p className="max-w-[50%] text-[8px] sm:text-sm md:text-lg lg:text-xl ">{details.overview}</p>


                            <button>Watch Trailer</button>
                        </div>
                    </div>

                    <h2 className="text-white font-bold text-xl mt-8 mb-4">Cast & Characters</h2>

                    <div className="relative">
                        <div ref={carouselRef} className=" flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth ">

                            {
                                cast.cast?.filter((actor) => actor.profile_path).map((actor) => (
                                    <div
                                        key={actor.id}
                                        className="min-w-[150px] bg-gray-800 rounded-xl overflow-hidden"
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                            alt={actor.name}
                                            className="w-full h-48 object-cover"
                                        />

                                        <p className="p-2 font-bold">
                                            {actor.name}
                                        </p>

                                        <p className="px-2 text-sm text-gray-400">
                                            {actor.character}
                                        </p>
                                    </div>
                                ))
                            }
                            
                        </div>
                        <button
                                onClick={() => {
                                    carouselRef.current.scrollLeft -= 300
                                }}
                                className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-white hover:bg-black/65 bg-black/45 rounded-full h-12 w-12 ml-4 text-center pb-1">
                                ←
                            </button>
                            <button
                                onClick={() => {
                                    carouselRef.current.scrollLeft += 300
                                }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl text-white hover:bg-black/65 bg-black/45 rounded-full h-12 w-12 mr-4 text-center pb-1">
                                →
                            </button>
                    </div>
                </div>
            )

            }
        </div>
    )
}

export default MovieDetails

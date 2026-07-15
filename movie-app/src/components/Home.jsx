import { useEffect, useState } from "react";
import { getPopularMovies } from "../api/tmdb";


function Home(){

    const [movies,setMovies] = useState([]);


    useEffect(()=>{

        const fetchMovies = async()=>{

            const data = await getPopularMovies();

            setMovies(data);

        }

        fetchMovies();

    },[])



    return(
        <div className="bg-black text-white">

            <h1 className="text-4xl font-bold">
                Popular Movies
            </h1>


            {
                movies.map((movie)=>(
                    <p key={movie.id}>
                        {movie.title}
                    </p>
                ))
            }

        </div>
    )
}


export default Home;
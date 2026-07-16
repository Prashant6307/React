import { useState } from "react"
import logo from "../images/logo-bg.png"
import { FaSearch, FaBars, FaTimes } from "react-icons/fa"
import {API_KEY} from "../api/tmdb"


function Header({setSearchResults}) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    

    const handleSearch = async(value) => {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`)
        const data = await res.json()
        console.log(data);
        setSearchResults(data.results)
        
    }
    return (
        <div className="bg-black">
            <div className="flex justify-between items-center gap-4  text-white px-4 py-4 sm:px-2 sm:py-2 max-w-7xl mx-auto">
                <div className="">
                    <img className="w-36 min-w-20" src={logo} alt="app logo" />
                </div>
                <div className="flex items-center gap-2 ">
                    <input className="border flex " type="text" onChange={(e)=>setSearchValue(e.target.value)}/>
                    <FaSearch onClick={()=>handleSearch(searchValue)}/>
                </div>
                {
                    menuOpen ? <FaTimes onClick={() => setMenuOpen(false)} className="md:hidden w-24" /> : <FaBars onClick={() => setMenuOpen(true)} className="md:hidden min-w-4" />
                }

                {
                    menuOpen && <ul className="md:hidden absolute top-20 right-4 bg-white flex flex-col  gap-4 text-black p-4 rounded-md">
                        <li>Home</li>
                        <li>Movies</li>
                        <li>TV Shows</li>
                    </ul>
                }

                <ul className="hidden md:flex items-center gap-8 text-white">
                    <li>Home</li>
                    <li>Movies</li>
                    <li>TV Shows</li>
                </ul>
            </div>

        </div>
    )
}

export default Header

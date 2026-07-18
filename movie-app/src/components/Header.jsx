import { useState } from "react"
import logo from "../images/logo-bg2.png"
import { FaSearch, FaBars, FaTimes } from "react-icons/fa"
import {API_KEY} from "../api/tmdb"
import { useNavigate } from "react-router-dom";

function Header({setSearchResults}) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate();

    const handleSearch = async(value) => {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`)
        const data = await res.json()
        setSearchResults(data.results)
        navigate(`/search?query=${value}`)
    }
    return (
        <div className="bg-[rgba(7,11,20,0.85)]">
            <div className="flex justify-between items-center font-bold gap-4  px-4 py-4 sm:px-2 sm:py-2 max-w-7xl mx-auto">
                <div className="">
                    <img className="max-w-16" src={logo} alt="app logo" />
                </div>
                <div className="flex items-center gap-2 bg-[#111827] border-[2px] border-[#334155]  focus:[#3B82F6] rounded-xl cursor-pointer">
                    <input className="flex w-28 sm:w-36 md:w-92 max-h-8 focus:outline-none text-white px-2 py-1" type="text" onChange={(e)=>setSearchValue(e.target.value)}/>
                    <FaSearch onClick={()=>handleSearch(searchValue)} className="text-[#60A5FA] mx-2"/>
                </div>
                {
                    menuOpen ? <FaTimes onClick={() => setMenuOpen(false)} className="md:hidden w-4 size-14" /> : <FaBars onClick={() => setMenuOpen(true)} className="md:hidden min-w-4 size-4" />
                }

                {
                    menuOpen && <ul className="md:hidden absolute top-20 right-4 bg-white flex flex-col  gap-4 text-black p-4 rounded-md z-100  ">
                        <li>Home</li>
                        <li>Movies</li>
                        <li>TV Shows</li>
                    </ul>
                }

                <ul className="hidden md:flex items-center gap-8 text-[#CBD5E1] ">
                    <li className="hover:text-[#60A5FA]">Home</li>
                    <li className="hover:text-[#60A5FA]">Movies</li>
                    <li className="hover:text-[#60A5FA]">TV Shows</li>
                </ul>
            </div>

        </div>
    )
}

export default Header

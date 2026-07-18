import logo_bg from "../images/logo-bg.png"

function Footer() {
    return (
        <div className="bg-[#0B1120] text-white font-bold">
            <div className=" max-w-7xl mx-auto py-8">
                <div className="flex items-center">
                    <img src={logo_bg} alt="" className="max-w-20" />
                    <h1 className="text-3xl font-bold text-white">Movie Orbit</h1>
                </div>
                <h3>
                    Your ultimate destination for discovering movies,
                    exploring trending titles, and finding your next
                    favorite watch.
                </h3>
                <div className="grid grid-cols-4 mt-12">
                    <div>
                        <h3 className="text-2xl mb-8">Discover</h3>
                        <p className="text-[#94A3B8] hover:text-[#60A5FA]">New Releases</p>
                        <p>Recommended</p>
                        <p>Action</p>
                        <p>Comedy</p>
                        <p>Sci-Fi</p>
                    </div>
                    <div>
                        <h3 className="text-2xl mb-8">Support</h3>
                        <p>Help Center</p>
                        <p>FAQ</p>
                        <p>Contact</p>
                        <p>Feedback </p>
                    </div>
                    <div>
                        <h3 className="text-2xl mb-8">Follow Us</h3>
                        <p>GitHub</p>
                        <p>LinkedIn</p>
                        <p>Instagram</p>
                        <p>YouTube</p>
                    </div>
                    <div>
                        <h3 className="text-2xl mb-8">Explore</h3>
                        <p>Home</p>
                        <p>Trending</p>
                        <p>Popular</p>
                        <p>Top Rated</p>
                        <p>Upcoming</p>
                    </div>

                </div>

                <h3 className="text-2xl mb-8 mt-12">Powered by TMDB</h3>
                <p>Movie Orbit uses TMDB data but is not endorsed
                    or certified by TMDB.</p>

                <div className="flex gap-16 mt-12">
                    <h3>© 2026 Movie Orbit</h3> 
                    <h3> Privacy | Terms | Cookies</h3>
                </div>
                      
            </div>

        </div>
    )
}

export default Footer

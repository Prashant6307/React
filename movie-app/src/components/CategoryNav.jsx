import { useLocation, useNavigate } from "react-router-dom";

function CategoryNav() {

    const navigate = useNavigate();
    const location = useLocation();

    const category = location.pathname.split("/")[2];


    const categories = [
        {
            name: "Popular",
            value: "popular"
        },
        {
            name: "Top Rated",
            value: "top_rated"
        },
        {
            name: "Trending",
            value: "trending"
        },
        {
            name: "Upcoming",
            value: "upcoming"
        }
    ];


    return (
        <div className="bg-black text-white flex gap-8 justify-center py-4 ">

            {
                categories.map((item) => (

                    <button
                        key={item.value}
                        onClick={() => navigate(`/movies/${item.value}`)}
                        className={`px-4 py-2 cursor-pointer font-bold text-2xl ${category === item.value
                            ? "text-purple-500"
                            : "text-gray-400"
                            }`}
                    >
                        {item.name}
                    </button>
                ))
            }

        </div>
    )
}

export default CategoryNav;
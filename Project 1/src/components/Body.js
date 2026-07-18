import RestaurantCard from "./RestaurantCard"
import { useState, useEffect } from "react"
import Shimmer from "./Shimmer"

const Body = () => {
    const [searchText, setSearchText] = useState("")
    const [listOfRestaurant, setListOfRestaurant] = useState([])
    const [filteredListOfRestaurant , setFilteredListOfRestaurant] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.7726304&lng=80.9035811&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        const json = await data.json()

        setListOfRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setFilteredListOfRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }

    // conditional rendering
    if (listOfRestaurant.length === 0) {
        return <Shimmer />
    }
    return (
        <div className="body ">
            <div className="filter flex items-center">
                <div className="search-box m-4 p-4 ">
                    <input className="border  rounded-sm" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <button className="m-4 px-4 bg-emerald-500" onClick={() => {const filteredRestaurant = listOfRestaurant.filter((restaurant)=>
                    { return restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())})
                    setFilteredListOfRestaurant(filteredRestaurant)}}>Search</button>
                </div>
                <button className="filter-btn border  rounded-sm" onClick={() => {
                    const filteredList = listOfRestaurant.filter((restaurant) => (restaurant.info.avgRating > 4.5))
                    setlistOfRestaurant(filteredList)
                }}>Top Restaurants</button>
            </div>
            <div className="res-container">
                {
                    filteredListOfRestaurant.map((restaurant) => (
                        <RestaurantCard
                            resData={restaurant}        //passing props
                            key={restaurant.info.id} />  //passing props
                    ))
                }
            </div>
        </div>
    )
}

export default Body
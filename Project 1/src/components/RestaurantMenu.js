import { useEffect } from "react"

const RestaurantMenu = () => {

    useEffect(() => {
        fetchMenu()
    }, [])

    const fetchMenu = async () => {
        // const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.7726304&lng=80.9035811&restaurantId=575412&catalog_qa=undefined&submitAction=ENTER`)

        // const res = await data.json()
        console.log(data);
    }

    return (
        <div>
            <h1>Menu</h1>
            <ul>
                <li>Burger</li>
                <li>Coke</li>
                <li>Pizza</li>
            </ul>
        </div>
    )
}

export default RestaurantMenu
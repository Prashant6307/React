import { LOGO_URL } from "../utils/constants"
import { useState } from "react"
import { Link } from "react-router"

const Header = () => {
    const [btnName, setBtnName] = useState("Login")
    return (
        <div className="flex justify-between shadow-2xs ">
            <div className="flex items-center ">
                <img className="max-w-36" src={LOGO_URL} />
                <h1>Food Hungry</h1>
            </div>

            <div className="flex items-center">
                <ul className="flex ">
                    <li className="px-4"> <Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/about">About Us</Link></li>
                    <li className="px-4"><Link to="/contact">Contact Us</Link></li>
                    <button onClick={() => {
                        btnName === "Login" ? setBtnName("Logout") : setBtnName("Login")
                    }}>{btnName}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header
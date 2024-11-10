import { NavLink } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <div>
            <ul className="navbar">
                <li><NavLink className={({ isActive }) => `navlinks ${(isActive ? "active" : "")}`} to="/">Home</NavLink></li>
                <li><NavLink className={({ isActive }) => `navlinks ${(isActive ? "active" : "")}`} to="/sales">Sales</NavLink></li>
            </ul>
        </div>
    );
}

export default Navbar;

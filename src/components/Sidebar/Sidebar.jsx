import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaLink } from "react-icons/fa"; // Link icon
import { FaCalendarAlt } from "react-icons/fa"; // Booking (Calendar) icon
import { FaClock } from "react-icons/fa"; // Availability (Clock) icon
import { FaCog } from "react-icons/fa";
import Logo from '../../assets/WebAppColorLogo.png'
import './Sidebar.css'

const Sidebar = ({ activeItem, setActiveItem }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const isCreateEventPage = location.pathname === "/createEvent";
    const isEventsPage = location.pathname === "/events";


    const menuItems = ["Events", "Booking", "Availability", "Settings"];
    const icons = [<FaLink size={24} />, <FaCalendarAlt size={24} />, <FaClock size={24} />, <FaCog size={24} />];

    return (
        <div className="sidebar">
            <div className='left-Header DashLogo'>

                <img className='logo' src={Logo} alt="WebApp-logo" />
                <h1 className='WebAppName'>CNNCT</h1>

            </div>
            <ul className="menu">
                {menuItems.map((item, index) => (
                    // <li
                    //     key={item}
                    //     className={`menu-item ${item === activeItem ? "active" : ""
                    //         } ${index === menuItems.indexOf(activeItem) - 1 ? "above-selected" : ""
                    //         } ${index === menuItems.indexOf(activeItem) + 1 ? "below-selected" : ""
                    //         }`}
                    //     onClick={() => setActiveItem(item)}
                    // >
                    //     <span className="sidebarIcon">{icons[index]}</span>
                    //     <span>{item}</span>
                    // </li>

                    <li key={item} className="menu-item">
                        <NavLink
                            to={`/${item.toLowerCase()}`}
                            className={({ isActive }) =>
                                `menu-link ${isActive ? "active" : ""} 
                        ${index === menuItems.indexOf(item) - 1 ? "above-selected" : ""} 
                        ${index === menuItems.indexOf(item) + 1 ? "below-selected" : ""}`
                            }
                        >
                            <span className="sidebarIcon">{icons[index]}</span>
                            <span className='tabname'>{item}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>

            {(isEventsPage || isCreateEventPage) && (
                <div className='createDiv'>
                    <button
                        className={`${isCreateEventPage ? "read-button-inverted" : ""} read-button `}
                        onClick={() => navigate(isCreateEventPage ? "/events" : "/createEvent")}
                    >
                        +   Create
                    </button>
                </div>

            )}

            <div className="SidebarDown">
                <button
                    className='read-button dashBtnCreate'>
                    profile
                </button>
            </div>


        </div>
    );
};

export default Sidebar;
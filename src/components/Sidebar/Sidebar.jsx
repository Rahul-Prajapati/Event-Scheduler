import { useState } from 'react';
import { FaLink } from "react-icons/fa"; // Link icon
import { FaCalendarAlt } from "react-icons/fa"; // Booking (Calendar) icon
import { FaClock } from "react-icons/fa"; // Availability (Clock) icon
import { FaCog } from "react-icons/fa";
import Logo from '../../assets/WebAppColorLogo.png'
import './Sidebar.css'

const Sidebar = ({activeItem, setActiveItem}) => {
    

    const menuItems = ["Events", "Booking", "Availability", "Settings"];
    const icons = [<FaLink size={32}/>, <FaCalendarAlt size={32}/>, <FaClock size={32}/>, <FaCog size={32}/>];

    return (
        <div className="sidebar">
            <div className='left-Header DashLogo'>

                <img className='logo' src={Logo} alt="WebApp-logo" />
                <h1 className='WebAppName'>CNNCT</h1>

            </div>
            <ul className="menu">
                {menuItems.map((item, index) => (
                    <li
                        key={item}
                        className={`menu-item ${item === activeItem ? "active" : ""
                            } ${index === menuItems.indexOf(activeItem) - 1 ? "above-selected" : ""
                            } ${index === menuItems.indexOf(activeItem) + 1 ? "below-selected" : ""
                            }`}
                        onClick={() => setActiveItem(item)}
                    >
                        <span className="sidebarIcon">{icons[index]}</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            <div className="SidebarDown"
            style={{ justifyContent: activeItem === "Events" ? "space-between" : "flex-end" }}
            >
            
            { activeItem == "Events" && (
            <button 
                className='read-button dashBtnCreate'>
                    +   Create
            </button> 

            ) }

            <button 
                className='read-button dashBtnCreate'>
                    profile
            </button>              
            </div>


        </div>
    );
};

export default Sidebar;
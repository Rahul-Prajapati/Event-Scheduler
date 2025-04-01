import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaLink } from "react-icons/fa"; // Link icon
import { FaCalendarAlt } from "react-icons/fa"; // Booking (Calendar) icon
import { FaClock } from "react-icons/fa"; // Availability (Clock) icon
import { FaCog } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import Logo from '../../assets/WebAppColorLogo.png'
import ProfilePic from "../../assets/UserDP.png";
import './Sidebar.css'
import { toastSuccess } from '../../utils';


const Sidebar = ({ activeItem, setActiveItem }) => {

    const [logoutToggle, setLogoutToggle] = useState(false);

    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    const { firstname, lastname } = userData;

    const location = useLocation();
    const navigate = useNavigate();

    const isCreateEventPage = location.pathname === "/createEvent";
    const isEventsPage = location.pathname === "/events";


    const menuItems = ["Events", "Booking", "Availability", "Settings"];
    const icons = [<FaLink size={24} />, <FaCalendarAlt size={24} />, <FaClock size={24} />, <FaCog size={24} />];

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        toastSuccess("Successfully Logout !!!");
        navigate("/signin"); 
    }

    return (
        <div className="sidebar">
            <div className='left-Header DashLogo'>

                <img className='logo' src={Logo} alt="WebApp-logo" />
                <h1 className='WebAppName'>CNNCT</h1>

            </div>
            <ul className="menu">
                {menuItems.map((item, index) => (
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

                { logoutToggle && 

                <div className='logoutDiv' 
                     style={{ width: "70%", backgroundColor: "#F3F3F1"}} 
                     onClick={handleLogout}>
                    <CiLogout size={24} />
                    <p className='signout'>Sign out</p>
                </div>

                }

                <div className='logoutDiv' onClick={()=> setLogoutToggle(!logoutToggle)} >
                    <img className='userDP' src={ProfilePic} alt="UserDP" />
                    <p>{firstname} {lastname}</p>
                </div>
            </div>


        </div>
    );
};

export default Sidebar;
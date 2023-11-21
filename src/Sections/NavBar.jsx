/* eslint-disable react/no-unknown-property */
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { GrLogout } from "react-icons/gr";
import "../CssStyles/Navbar.css";

const NavBar = () => {
    const { logout, currentUser } = useContext(AuthContext);

    const [navItem_dropdownShow, setNavItem_dropdownShow] = useState(false);
    const [profileItem_dropdownShow, setProfileItem_dropdownShow] = useState(false);

    const handleNavItemDropdown = () => {
        setNavItem_dropdownShow(!navItem_dropdownShow);
    };

    const handleProfileDropdown = () => {
        setProfileItem_dropdownShow(!profileItem_dropdownShow);
    };

    const routes_navItems = [
        { path: "/", name: "Home" },
        { path: "/addblog", name: "Add Blog" },
        { path: "/allblogs", name: "All Blogs" },
        { path: "/featuredblogs", name: "Featured Blogs" },
        { path: "/wishlist", name: "Wishlist" },
    ];
    const routes_profileItems = [
        { path: "/profile", name: "Profile" },
        { path: "/dashboard", name: "Dashboard" },
    ];

    // const route_common = [];
    const route_admin = [
        { path: "/profile", name: "Profile" },
        { path: "/dashboard", name: "Dashboard" },
        { path: "/myBlogs", name: "My Blogs" },
        { path: "/settings", name: "Settings" },
        { path: "/membership", name: "Become a Member" },
    ];
    const route_normalUser = [
        { path: "/profile", name: "Profile" },
        { path: "/myBlogs", name: "My Blogs" },
        { path: "/settings", name: "Settings" },
    ];

    const handleLogout = () => {
        logout()
            .then((response) => {})
            .catch((error) => {});

        toast.promise(logout(), {
            loading: "Logging out...",
            success: <b>Logged out successfully!</b>,
            error: <b>Unable to log out</b>,
        });
    };

    return (
        <div id="navbar" className="bg-white shadow-md ">
            <div
                className="title rounded-sm
        flex items-center justify-between
        py-5 lg:py-4 px-2
        custom-width relative"
            >
                {/* Main Logo + Menu open close */}
                <div className="flex items-center gap-2 md:gap-4 menuFirst">
                    {/* Icon: For Mobile and Tab */}
                    <div className="text-xl md:text-3xl block lg:hidden cursor-pointer">
                        <div onClick={handleNavItemDropdown} className="">
                            {navItem_dropdownShow ? (
                                <RxCross1></RxCross1>
                            ) : (
                                <HiOutlineMenuAlt1></HiOutlineMenuAlt1>
                            )}
                        </div>
                    </div>

                    {/* Brand Logo */}
                    <div>
                        <NavLink to="/">
                            <img className="w-[120px] md:w-[180px] " src="/Logo.png" alt="" />
                        </NavLink>
                    </div>
                </div>

                {/* Middle Items
                    For Large device */}
                <div className="flex-1 hidden lg:block">
                    <ul className="flex px-1 gap-6 justify-center font-semibold">
                        {routes_navItems.map((route, idx) => (
                            <li key={idx}>
                                <NavLink
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? ` text-[--text-highlight] border-b-2 border-[--text-highlight]`
                                            : ` hover:text-[--text-highlight]`
                                    }
                                    to={route.path}
                                >
                                    {route.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Dropdown Main Items
                    For Mobile and Tab */}
                <div
                    className={
                        navItem_dropdownShow
                            ? `dropdown dropdown_menuItems show
                            block lg:hidden bg-white shadow-lg rounded-sm z-10`
                            : `dropdown dropdown_menuItems hide
                            block lg:hidden bg-white shadow-lg rounded-sm z-10`
                    }
                >
                    {/* up arrow */}
                    <div className="arrowOnNav"></div>

                    {/* Dropdown Menu Data */}
                    <ul className="flex flex-col px-6 py-4 gap-6 justify-center font-semibold">
                        {routes_navItems.map((route, idx) => (
                            <li key={idx}>
                                <NavLink
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? ` text-[--text-highlight] border-b-2 border-[--text-highlight]`
                                            : ` hover:text-[--text-highlight]`
                                    }
                                    to={route.path}
                                    onClick={handleNavItemDropdown}
                                >
                                    {route.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Dropdown User Info and Dashboard
                    For Mobile and Tab */}
                <div
                    className={
                        profileItem_dropdownShow
                            ? `dropdown dropdown_profileItems show
                            bg-white shadow-lg rounded-sm z-10`
                            : `dropdown dropdown_profileItems hide
                            bg-white shadow-lg rounded-sm z-10`
                    }
                >
                    {/* up arrow */}
                    <div className="arrowOnNav"></div>

                    {/* Dropdown Menu Data */}
                    <ul className="flex flex-col px-6 py-4 gap-6 justify-center font-semibold">
                        {/* User image, name, role */}
                        <li className="flex gap-4 items-center">
                            <img
                                src={currentUser?.photoURL || "/no_user.png"}
                                className="h-[24px] w-[24px] md:h-[40px] md:w-[40px] rounded-full 
                                outline outline-1  outline-offset-1
                                cursor-pointer"
                                title={currentUser?.displayName}
                            />
                            <div>
                                <div className="font-bold text-lg">{currentUser?.displayName}</div>
                                <div className="font-normal">{currentUser?.email}</div>
                            </div>
                        </li>
                        <hr />

                        {/* User Routes */}
                        {route_admin.map((route, idx) => (
                            <li key={idx}>
                                <NavLink
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? ` text-[--text-highlight] border-b-2 border-[--text-highlight]`
                                            : ` hover:text-[--text-highlight]`
                                    }
                                    to={route.path}
                                    onClick={handleProfileDropdown}
                                >
                                    {route.name}
                                </NavLink>
                            </li>
                        ))}
                        <hr />

                        {/* Logout */}
                        <li
                            onClick={handleLogout}
                            className=" font-semibold hover:text-[--text-highlight] cursor-pointer"
                        >
                            Logout
                        </li>
                    </ul>
                </div>

                {/* Last Items : Login/Profile items */}
                <div>
                    {currentUser?.email ? (
                        <div className="flex gap-2 justify-center items-center">
                            <div onClick={handleProfileDropdown} className="">
                                <img
                                    src={currentUser?.photoURL || "/no_user.png"}
                                    className="h-[24px] w-[24px] md:h-[36px] md:w-[36px] rounded-full 
                                outline outline-1  outline-offset-1
                                cursor-pointer"
                                    title={currentUser?.displayName}
                                />
                            </div>

                            <button
                                className="_btn  font-semibold hover:text-[--text-highlight] hidden"
                                onClick={handleLogout}
                                title="Logout"
                            >
                                <GrLogout></GrLogout>
                            </button>
                        </div>
                    ) : (
                        <div className="flex px-1 gap-2 text-sm md:text-base md:gap-6 justify-center font-semibold">
                            <NavLink
                                className={({ isActive, isPending }) =>
                                    isActive
                                        ? ` text-[--text-highlight] border-b-2 border-[--text-highlight]`
                                        : ` hover:text-[--text-highlight]`
                                }
                                to="/authentications"
                            >
                                Authentications
                            </NavLink>
                            <NavLink
                                className={({ isActive, isPending }) =>
                                    isActive
                                        ? ` text-[--text-highlight] border-b-2 border-[--text-highlight]`
                                        : ` hover:text-[--text-highlight]`
                                }
                                to="/register"
                            >
                                Register
                            </NavLink>
                            <NavLink
                                className={({ isActive, isPending }) =>
                                    isActive
                                        ? ` text-[--text-highlight] border-b-2 border-[--text-highlight]`
                                        : ` hover:text-[--text-highlight]`
                                }
                                to="/login"
                            >
                                Login
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay when dropdown active, 
                created this for close dropdown after clicking anywhere */}
            <div
                id="fullScreenOverlay"
                className={navItem_dropdownShow || profileItem_dropdownShow ? `show` : `hide`}
                onClick={() => {
                    setNavItem_dropdownShow(false);
                    setProfileItem_dropdownShow(false);
                }}
            ></div>
        </div>
    );
};

export default NavBar;

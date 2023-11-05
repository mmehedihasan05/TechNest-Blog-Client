/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const [menuShow, setMenuShow] = useState(false);

    const handleMenuShow = () => {
        console.log("clicked");
        setMenuShow(!menuShow);
    };

    const routes = [
        { path: "/", name: "Home" },
        { path: "/addblog", name: "Add Blog" },
        { path: "/allblogs", name: "All Blogs" },
        { path: "/featuredblogs", name: "Featured Blogs" },
        { path: "/wishlist", name: "Wishlist" },
    ];

    return (
        <>
            <div
                className="bg-white title custom-width shadow-md rounded-sm
        flex items-center justify-between"
            >
                {/* Main Logo */}
                <div className="flex items-center gap-4">
                    {/* Hide in Large device */}
                    <div className="text-3xl block lg:hidden">
                        <div onClick={handleMenuShow} className="">
                            {menuShow ? (
                                <RxCross1></RxCross1>
                            ) : (
                                <HiOutlineMenuAlt1></HiOutlineMenuAlt1>
                            )}
                        </div>
                    </div>
                    <div>
                        <img className="w-[180px] " src="/Logo.png" alt="" />
                    </div>
                </div>

                {/* Middle Items
            Hide in Tablet and Mobile */}
                <div className="flex-1 hidden lg:block">
                    <ul className="flex px-1 gap-6 justify-center font-semibold">
                        {routes.map((route, idx) => (
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

                {/* Main Items
            Hide in Large Device */}
                <div
                    className={
                        menuShow
                            ? `block lg:hidden bg-white shadow-lg rounded-sm
             mobileNav z-10 show`
                            : `block lg:hidden bg-white shadow-lg rounded-sm
             mobileNav z-10 hide`
                    }
                >
                    <ul className="flex flex-col px-6 py-4 gap-6 justify-center font-semibold">
                        {routes.map((route, idx) => (
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

                {/* Last Items */}
                <div>
                    {/* Hiden In Mobile Device */}
                    <div className="hidden md:flex px-1 gap-6 justify-center font-semibold">
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
                </div>
                {menuShow ? (
                    <div
                        className="absolute top-0 left-0 
                                h-full w-full"
                        onClick={handleMenuShow}
                    ></div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default NavBar;

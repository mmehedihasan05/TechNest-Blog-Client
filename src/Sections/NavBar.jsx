/* eslint-disable react/no-unknown-property */
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { Dropdown } from "flowbite-react";
import { GrLogout } from "react-icons/gr";

const NavBar = () => {
    const { logout, currentUser } = useContext(AuthContext);

    const [menuShow, setMenuShow] = useState(false);

    const handleMenuShow = () => {
        // console.log("clicked");
        setMenuShow(!menuShow);
    };

    const routes = [
        { path: "/", name: "Home" },
        { path: "/addblog", name: "Add Blog" },
        { path: "/allblogs", name: "All Blogs" },
        { path: "/featuredblogs", name: "Featured Blogs" },
        { path: "/wishlist", name: "Wishlist" },
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
        <div className="custom-width ">
            <div
                className="bg-white title shadow-md rounded-sm
        flex items-center justify-between
        py-2 px-2
"
            >
                {/* Main Logo */}
                <div className="flex items-center gap-2 md:gap-4 menuFirst">
                    {/* Hide in Large device */}
                    <div className="text-xl md:text-3xl block lg:hidden">
                        <div onClick={handleMenuShow} className="">
                            {menuShow ? (
                                <RxCross1></RxCross1>
                            ) : (
                                <HiOutlineMenuAlt1></HiOutlineMenuAlt1>
                            )}
                        </div>
                    </div>

                    <div>
                        <NavLink to="/">
                            <img className="w-[120px] md:w-[180px] " src="/Logo.png" alt="" />
                        </NavLink>
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
                    {currentUser?.email ? (
                        <div className="flex gap-2 justify-center items-center">
                            <img
                                src={currentUser.photoURL || "/no_user.png"}
                                className="h-[24px] w-[24px] md:h-[32px] md:w-[32px] rounded-full"
                                title={currentUser.displayName}
                            />

                            <button
                                className="_btn block font-semibold hover:text-[--text-highlight]"
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
        </div>
    );
};

export default NavBar;

import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Dashboard_nav = () => {
    return (
        <div className="drawer md:drawer-open grid-cols-1 w-fit">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button md:hidden">
                    Open drawer
                </label>
            </div>

            <div className="drawer-side shadow-lg">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="py-8 space-y-6 bg-[white] ">
                    <div className="">
                        <NavLink to="/">
                            <img className="w-[145px] mx-auto" src="/Logo.png" alt="" />
                        </NavLink>
                    </div>
                    <div>
                        <ul
                            className=" p-4 w-60 min-h-full text-base-content 
                        
                        flex flex-col gap-2  "
                        >
                            {/* Sidebar content here */}
                            <li className="">
                                <NavLink
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? ` text-[--text-highlight] hover:text-[--text-highlight] border-b-2 border-[--text-highlight] hover:bg-transparent font-semibold`
                                            : ` hover:text-[--text-highlight] hover:bg-transparent font-semibold`
                                    }
                                    to="/dashboard/"
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                            <hr />
                            <li className="">
                                <NavLink
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? ` text-[--text-highlight] hover:text-[--text-highlight] border-b-2 border-[--text-highlight] hover:bg-transparent font-semibold`
                                            : ` hover:text-[--text-highlight] hover:bg-transparent font-semibold`
                                    }
                                    to="/dashboard/allusers"
                                >
                                    All Users
                                </NavLink>
                            </li>
                            <hr />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard_nav;

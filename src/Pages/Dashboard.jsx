import { NavLink } from "react-router-dom";

const Dashboard = () => {
    return (
        <div id="dashboardRoot">
            {/* Drawer */}
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-primary drawer-button lg:hidden"
                    >
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side shadow-lg">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <div className="py-8 space-y-6">
                        <div className="">
                            <NavLink to="/">
                                <img className="w-[145px] mx-auto" src="/Logo.png" alt="" />
                            </NavLink>
                        </div>
                        <div>
                            <ul className="menu p-4 w-60 min-h-full bg-[white]  text-base-content">
                                {/* Sidebar content here */}
                                <li className="">
                                    <a>My Blogs</a>
                                </li>
                                <li className="">
                                    <a>My Drafts</a>
                                </li>
                                <li className="">
                                    <a>Scheduled Blogs</a>
                                </li>
                                <hr />
                                <li>
                                    <a>Income</a>
                                </li>
                                <li>
                                    <a>Membership</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

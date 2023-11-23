/* eslint-disable no-unreachable */
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Dashboard_nav from "./Dashboard_nav";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Loading";

const DashboardRoot = () => {
    const { currentUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // administritive permission checker
    const { data: isAdminCheck, isLoading: isAdminCheckLoading } = useQuery({
        queryKey: ["isAdminCheck", currentUser],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/role-check?email=${currentUser?.email}&userId=${currentUser?.uid}`
            );
            return res.data?.isAdmin;
        },
    });

    if (isAdminCheckLoading) {
        return <Loading />;
    }

    if (isAdminCheck) {
        return (
            <div id="dashboardRoot" className="flex">
                <Dashboard_nav></Dashboard_nav>
                <Outlet></Outlet>
            </div>
        );
    }

    let toastId;
    toast.remove(toastId);
    toastId = toast.error("You are not permitted to visit dashboard");

    return <Navigate to="/" />;
};

export default DashboardRoot;

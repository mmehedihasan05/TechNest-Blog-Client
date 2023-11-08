/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";

// baseURL: "https://a11-technest-backend.vercel.app",

let axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

const useAxiosSecure = () => {
    // const all = useContext(AuthContext);
    const all = "";

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response.status === 401) {
                    all?.logout()
                        .then((response) => {
                            toast.error("Unauthorized Access! Logged Out.");
                        })
                        .catch((error) => {
                            toast.error("Unauthorized Access! Log Out Failed.");
                        });
                }

                return Promise.reject(error);
            }
        );
    }, []);

    return axiosSecure;
};

export default useAxiosSecure;

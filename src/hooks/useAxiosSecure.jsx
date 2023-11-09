/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";

// baseURL: "https://a11-technest-backend.vercel.app",
// baseURL: "http://localhost:5000",

const useAxiosSecure = () => {
    const all = useContext(AuthContext);

    let axiosSecure = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true,
    });

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response.status === 401) {
                    console.log("Called from secure", all?.currentUser);
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
        // Cleanup function to remove the interceptor when the component unmounts
        return () => {
            axiosSecure.interceptors.response.eject(interceptor);
        };
    }, [all]);

    return axiosSecure;
};

export default useAxiosSecure;

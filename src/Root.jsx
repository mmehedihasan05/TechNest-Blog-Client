import NavBar from "./Sections/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Sections/Footer";
import toast, { Toaster } from "react-hot-toast";
import { createContext, useContext } from "react";
import { useState } from "react";
import useAxiosSecure from "./hooks/useAxiosSecure";
import { AuthContext } from "./AuthProvider";

export const OtherContext = createContext();

const Root = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser, logout } = useContext(AuthContext);

    const [wishlistUpdated, setWishlistUpdated] = useState(true);

    const addWishlist = (blog_id) => {
        if (!currentUser) {
            toast.error("Login to bookmark!");
            return;
        }
        const dataToPost = {
            time: new Date().toISOString(),
            blogId: blog_id,
            userId: currentUser?.uid,
            email: currentUser?.email,
        };
        return toast.promise(
            axiosSecure
                .patch("/addWishlist", dataToPost)
                .then((response) => {
                    if (response.data.acknowledged) {
                        setWishlistUpdated(!wishlistUpdated);
                        return <b>Blog added to wishlist.</b>;
                    } else {
                        throw new Error("Failed to add wishlist!");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 401 && currentUser) {
                        logout()
                            .then((response) => {
                                toast.error("Unauthorized Access! Logged Out.");
                            })
                            .catch((error) => {
                                toast.error("Unauthorized Access! Log Out Failed.");
                            });
                    }
                    throw new Error("Failed to add to wishlist!");
                }),
            {
                loading: "Adding to wishlist...",
                success: (message) => message,
                error: (error) => <b>Failed to add wishlist!</b>,
            }
        );
    };

    const removeWishlist = (blog_id) => {
        if (!currentUser) {
            toast.error("Login to bookmark!");

            return;
        }

        const dataToPost = {
            time: new Date().toISOString(),
            blogId: blog_id,
            userId: currentUser?.uid,
            email: currentUser?.email,
        };

        return toast.promise(
            axiosSecure
                .patch("/removeWishlist", dataToPost)
                .then((response) => {
                    // console.log(response.data);

                    if (response.data.acknowledged) {
                        setWishlistUpdated(!wishlistUpdated);
                        return <b>Blog removed from wishlist.</b>;
                    } else {
                        throw new Error("Failed to remove from wishlist!");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 401 && currentUser) {
                        logout()
                            .then((response) => {
                                toast.error("Unauthorized Access! Logged Out.");
                            })
                            .catch((error) => {
                                toast.error("Unauthorized Access! Log Out Failed.");
                            });
                    }
                    throw new Error("Failed to remove from wishlist!");
                }),
            {
                loading: "Removing from wishlist...",
                success: (message) => message,
                error: (error) => <b>Failed to remove from wishlist!</b>,
            }
        );
    };

    const functionalities = {
        wishlistUpdated,
        addWishlist,
        removeWishlist,
    };

    return (
        <div id="appRoot" className="pt-4 space-y-8">
            <OtherContext.Provider value={functionalities}>
                <NavBar></NavBar>
                <Outlet></Outlet>
                <Footer></Footer>
                <Toaster position="top-center" reverseOrder={false} />
            </OtherContext.Provider>
        </div>
    );
};

export default Root;

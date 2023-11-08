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
    const { currentUser } = useContext(AuthContext);

    const [wishlistUpdated, setWishlistUpdated] = useState(true);

    const addWishlist = (blog_id) => {
        if (!currentUser) {
            toast.error("Login to bookmark!");

            return;
        }

        axiosSecure
            .patch("/addWishlist", {
                time: new Date().toISOString(),
                blogId: blog_id,
                userId: currentUser.uid,
            })
            .then((response) => {
                console.log(response.data);
                // Reset form after successfull login

                if (response.data.acknowledged) {
                    setWishlistUpdated(!wishlistUpdated);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const removeWishlist = (blog_id) => {
        if (!currentUser) {
            toast.error("Login to bookmark!");

            return;
        }
        axiosSecure
            .patch("/removeWishlist", {
                time: new Date().toISOString(),
                blogId: blog_id,
                userId: currentUser.uid,
            })
            .then((response) => {
                console.log(response.data);

                if (response.data.acknowledged) {
                    setWishlistUpdated(!wishlistUpdated);
                }
            })
            .catch((error) => {
                console.log(error);
            });
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

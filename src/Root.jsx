import NavBar from "./Sections/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Sections/Footer";
import { Toaster } from "react-hot-toast";
import { createContext, useContext } from "react";
import { useState } from "react";
import useAxiosSecure from "./hooks/useAxiosSecure";
import { AuthContext } from "./AuthProvider";

export const OtherContext = createContext();

const Root = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useContext(AuthContext);

    const [bookmarkUpdated, setBookmarkUpdated] = useState(true);

    const addBookmark = (blog_id) => {
        axiosSecure
            .patch("/addBookmark", {
                time: new Date().toISOString(),
                blogId: blog_id,
                userId: currentUser.uid,
            })
            .then((response) => {
                // if (response.data) {

                // }
                console.log(response.data);
                // Reset form after successfull login

                if (response.data.modifiedCount > 0) {
                    setBookmarkUpdated(!bookmarkUpdated);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const removeBookmark = (blog_id) => {
        axiosSecure
            .patch("/removeBookmark", {
                time: new Date().toISOString(),
                blogId: blog_id,
                userEmail: currentUser.uid,
            })
            .then((response) => {
                console.log(response.data);

                if (response.data.modifiedCount > 0) {
                    setBookmarkUpdated(!bookmarkUpdated);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const functionalities = { bookmarkUpdated, addBookmark, removeBookmark };

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

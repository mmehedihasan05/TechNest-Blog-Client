/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import BlogCard from "../Components/BlogCard";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { OtherContext } from "../Root";

const Wishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useContext(AuthContext);
    const [wishlistBlogData, setwishlistBlogData] = useState([]);
    const { wishlistUpdated } = useContext(OtherContext);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        axiosSecure
            .get(`/wishlist?userid=${userId}`)
            .then((data) => {
                setwishlistBlogData(data.data);
                // setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [currentUser, wishlistUpdated]);

    console.log(wishlistBlogData);

    return (
        <div className="space-y-8 custom-width">
            <SectionTitle data={{ title: "Wishlist Blogs", noBorder: true }}></SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistBlogData.map((blogData, idx) => (
                    <BlogCard key={idx} blogData={blogData}></BlogCard>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;

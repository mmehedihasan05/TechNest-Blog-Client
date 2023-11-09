/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import BlogCard from "../Components/BlogCard";
import SectionTitle from "../Components/SectionTitle";
import SkeletorForCard from "../Components/SkeletorForCard";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { OtherContext } from "../Root";

const Wishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useContext(AuthContext);
    const [wishlistBlogData, setwishlistBlogData] = useState([]);
    const { wishlistUpdated } = useContext(OtherContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure
            .get(`/wishlist`)
            .then((data) => {
                setwishlistBlogData(data.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [currentUser, wishlistUpdated]);

    return (
        <div className="space-y-8 custom-width">
            <SectionTitle data={{ title: "Wishlist Blogs", noBorder: true }}></SectionTitle>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SkeletorForCard></SkeletorForCard>
                    <SkeletorForCard></SkeletorForCard>
                    <SkeletorForCard></SkeletorForCard>
                    <SkeletorForCard></SkeletorForCard>
                    <SkeletorForCard></SkeletorForCard>
                    <SkeletorForCard></SkeletorForCard>
                </div>
            ) : (
                ""
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistBlogData.map((blogData, idx) => (
                    <BlogCard key={idx} blogData={blogData}></BlogCard>
                ))}
                {wishlistBlogData.length === 0 ? (
                    <div className="text-[--text-highlight]">No wishlisted data to show!</div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Wishlist;

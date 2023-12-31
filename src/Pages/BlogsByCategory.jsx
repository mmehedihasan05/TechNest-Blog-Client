/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import SectionTitle from "../Components/SectionTitle";
import { categoryFormatter } from "../Utilities/Functionalities";
import BlogCard from "../Components/BlogCard";
import SkeletorForCard from "../Components/SkeletorForCard";
import { OtherContext } from "../Root";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../AuthProvider";

const BlogsByCategory = () => {
    const axiosSecure = useAxiosSecure();
    const { categoryname } = useParams();
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { wishlistUpdated } = useContext(OtherContext);
    const { currentUser } = useContext(AuthContext);
    // let selectedCategories = values.selectedCategories.map((categories) => categories.value);

    useEffect(() => {
        console.log("categoryname", categoryname);
        axiosSecure
            .get(
                `/allblogs?email=${currentUser?.email}&userId=${currentUser?.uid}&categories=${categoryname}`
            )
            .then((data) => {
                setBlogData(data.data.allBlogs);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [wishlistUpdated]);

    return (
        <div className="custom-width space-y-8">
            <SectionTitle
                data={{
                    title: categoryFormatter(categoryname),
                    description: `Showing all blogs of ${categoryFormatter(categoryname)}`,
                    noBorder: true,
                }}
            ></SectionTitle>

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

            <div>
                {/* Blogs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogData.map((blogData, idx) => (
                        <BlogCard key={idx} blogData={blogData}></BlogCard>
                    ))}
                </div>
            </div>

            <Helmet>
                <title>{categoryFormatter(categoryname)} Blogs - Technest</title>
            </Helmet>
        </div>
    );
};

export default BlogsByCategory;

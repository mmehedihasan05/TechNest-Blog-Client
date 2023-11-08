/* eslint-disable react-hooks/exhaustive-deps */
import ReactMarkdown from "react-markdown";
import SectionTitle from "../../Components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BlogCard from "../../Components/BlogCard";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider";
import { useState } from "react";
import { OtherContext } from "../../Root";
import SkeletorForCard from "../../Components/SkeletorForCard";

const RecentBlogs = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useContext(AuthContext);
    const [recentBlogData, setRecentBlogData] = useState([]);
    const { wishlistUpdated } = useContext(OtherContext);

    const titleInfo = {
        title: (
            <>
                <span className="text-[--text-highlight]">Recent</span> Blogs
            </>
        ),
        description: "Explore the most recent blog posts from our tech enthusiasts.",
    };

    /*
    currentUser === undefined hole skeleton show korbe
    */

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        axiosSecure
            .get(`/recent-blogs?userid=${userId}`)
            .then((data) => {
                setRecentBlogData(data.data);
                // setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [currentUser, wishlistUpdated]);

    return (
        <div className="space-y-8">
            <SectionTitle data={titleInfo}></SectionTitle>

            {recentBlogData.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentBlogData.map((blogData, idx) => (
                    <BlogCard key={idx} blogData={blogData}></BlogCard>
                ))}
            </div>
        </div>
    );
};

export default RecentBlogs;

/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import BlogCard from "../../Components/BlogCard";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { OtherContext } from "../../Root";

const EditorsPick = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useContext(AuthContext);
    const { wishlistUpdated } = useContext(OtherContext);
    const [editorsPickBlogData, setRecentBlogData] = useState([]);

    const titleInfo = {
        title: (
            <>
                <span className="text-[--text-highlight]">Editors</span> Pick
            </>
        ),
        description: "Explore tech's best, as chosen by our editors.",
    };

    useEffect(() => {
        console.log("currentUser", currentUser);
        if (currentUser === null || currentUser) {
            axiosSecure
                .get(`/editors-pick?userid=${currentUser?.uid}`)
                .then((data) => {
                    setRecentBlogData(data.data);
                    // setLoading(false);
                })
                .catch((error) => console.log(error));
        }
    }, [currentUser, wishlistUpdated]);

    return (
        <div className="space-y-8">
            <SectionTitle data={titleInfo}></SectionTitle>

            <div className="grid grid-cols-2 gap-6">
                {editorsPickBlogData.map((blogData, idx) => (
                    <BlogCard key={idx} blogData={blogData}></BlogCard>
                ))}
            </div>
        </div>
    );
};

export default EditorsPick;

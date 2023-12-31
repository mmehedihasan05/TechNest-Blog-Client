/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import BlogCard from "../../Components/BlogCard";
import SectionTitle from "../../Components/SectionTitle";
import SkeletorForCard from "../../Components/SkeletorForCard";
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
        axiosSecure
            .get(`/editors-pick`)
            .then((data) => {
                setRecentBlogData(data.data);
                // setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [currentUser, wishlistUpdated]);

    return (
        <div className="space-y-8">
            <SectionTitle data={titleInfo}></SectionTitle>

            {editorsPickBlogData.length === 0 ? (
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
                {editorsPickBlogData.map((blogData, idx) => (
                    <BlogCard key={idx} blogData={blogData}></BlogCard>
                ))}
            </div>
        </div>
    );
};

export default EditorsPick;

import ReactMarkdown from "react-markdown";
import SectionTitle from "../../Components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BlogCard from "../../Components/BlogCard";

const RecentBlogs = () => {
    const axiosSecure = useAxiosSecure();

    const titleInfo = {
        title: (
            <>
                <span className="text-[--text-highlight]">Recent</span> Blogs
            </>
        ),
        description: "Explore the most recent blog posts from our tech enthusiasts.",
    };
    const { isPending, isLoading, isError, error, data } = useQuery({
        queryKey: ["recentBlogs"],
        queryFn: async () => {
            let result = axiosSecure
                .get(`/recent-blogs`, { withCredentials: true })
                .then((data) => data)
                .catch((error) => error);
            return result;
        },
    });

    let recentBlogsData = [];

    if (!isLoading || !isPending) {
        recentBlogsData = data.data;
        console.log(recentBlogsData);
    }

    function formatDescription(description) {
        const output = description.split("\n\n");

        let final = [];

        for (let index = 0; index < output.length; index++) {
            let element = output[index];

            if (element.startsWith("**")) {
                element = element.replaceAll("**", "");

                final.push({ heading: element });
            } else {
                element = element.replaceAll("**", "");
                final.push({ description: element });
            }
        }
        return final;
    }

    // const newDes = formatDescription(test.longDescription);

    return (
        <div className="space-y-8">
            <SectionTitle data={titleInfo}></SectionTitle>

            <div className="grid grid-cols-2 gap-6">
                {recentBlogsData.map((blogData, idx) => (
                    <BlogCard key={idx} blogData={blogData}></BlogCard>
                ))}
            </div>
        </div>
    );
};

export default RecentBlogs;

/*
            <div className="long hidden">
                {newDes.map((elem, idx) => (
                    <div key={idx}>
                        {elem.heading ? <h3>{elem.heading}</h3> : <p>{elem.description}</p>}
                    </div>
                ))} 
            </div>
*/

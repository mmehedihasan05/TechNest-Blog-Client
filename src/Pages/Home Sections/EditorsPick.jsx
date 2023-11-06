import { useQuery } from "@tanstack/react-query";
import BlogCard from "../../Components/BlogCard";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EditorsPick = () => {
    const axiosSecure = useAxiosSecure();

    const titleInfo = {
        title: (
            <>
                <span className="text-[--text-highlight]">Editors</span> Pick
            </>
        ),
        description: "Explore tech's best, as chosen by our editors.",
    };

    const { isPending, isLoading, isError, error, data } = useQuery({
        queryKey: ["editorsPickBlog"],
        queryFn: async () => {
            let result = axiosSecure
                .get(`/editors-pick`, { withCredentials: true })
                .then((data) => data)
                .catch((error) => error);
            return result;
        },
    });

    let editorsPickBlogsData = [];

    if (!isLoading || !isPending) {
        editorsPickBlogsData = data.data;
        console.log(editorsPickBlogsData);
    }
    return (
        <div className="space-y-8">
            <SectionTitle data={titleInfo}></SectionTitle>

            <div className="grid grid-cols-2 gap-6">
                {editorsPickBlogsData.map((blogData, idx) => (
                    <BlogCard key={idx} blogData={blogData}></BlogCard>
                ))}
            </div>
        </div>
    );
};

export default EditorsPick;

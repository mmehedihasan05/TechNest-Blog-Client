/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import BlogCard from "../Components/BlogCard";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { OtherContext } from "../Root";
import "../CssStyles/Buttons.css";
const AllBlog = () => {
    const [blogData, setBlogData] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { wishlistUpdated } = useContext(OtherContext);
    const axiosSecure = useAxiosSecure();
    const [categoryInputVal, setCategoryInputVal] = useState("all");

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        axiosSecure
            .get(`/allblogs?userid=${userId}`)
            .then((data) => {
                console.log(data.data);
                setBlogData(data.data);
                // setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [currentUser, wishlistUpdated]);

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;

        const searchData = {
            searchTitle: form.searchTitle.value,
            category: form.category.value,
        };

        const userId = localStorage.getItem("userId");
        const apiUrl = `/allblogs?userid=${userId}&searchTitle=${searchData.searchTitle}&category=${searchData.category}`;

        console.log(searchData, apiUrl);

        return;
        axiosSecure
            .get(apiUrl)
            .then((data) => {
                console.log(data.data);
                setBlogData(data.data);
                // setLoading(false);
            })
            .catch((error) => console.log(error));
    };

    const handleCategoryChange = (e) => {
        setCategoryInputVal(e.target.value);
    };

    return (
        <div className="custom-width space-y-6">
            <SectionTitle data={{ title: "All Blogs", noBorder: true }}></SectionTitle>

            {/* Search and Filter */}
            <div>
                <form action="" onSubmit={handleSearch}>
                    <div className="flex gap-2">
                        <div className="searchFieldParent w-[80%] flex">
                            <input
                                type="text"
                                name="searchTitle"
                                id=""
                                className="w-full border-none bg-inherit"
                                placeholder="Search By Title"
                            />

                            <select
                                name="category"
                                id=""
                                className="cursor-pointer border-none  bg-inherit"
                                value={categoryInputVal}
                                onChange={handleCategoryChange}
                            >
                                <option value="all">All Category</option>

                                <option value="artificial_intelligence">
                                    Artificial Intelligence
                                </option>
                                <option value="web_development">Web Development</option>
                                <option value="data_science">Data Science</option>
                                <option value="cybersecurity">Cybersecurity</option>
                                <option value="robotics">Robotics</option>
                            </select>
                        </div>

                        <input
                            type="submit"
                            className="_btn _btn-secondary w-[20%]"
                            value="Search"
                        />
                    </div>
                </form>
            </div>

            {/* All blogs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogData.map((blogData, idx) => (
                    <BlogCard key={idx} blogData={blogData}></BlogCard>
                ))}
            </div>
        </div>
    );
};

export default AllBlog;

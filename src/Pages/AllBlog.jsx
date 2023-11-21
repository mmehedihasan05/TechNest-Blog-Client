/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import BlogCard from "../Components/BlogCard";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { OtherContext } from "../Root";
import "../CssStyles/Buttons.css";
import SkeletorForCard from "../Components/SkeletorForCard";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Searchfield from "../Components/Searchfield";
import { Helmet } from "react-helmet-async";

import { useQuery } from "@tanstack/react-query";

const AllBlog = () => {
    const timingOrder = [
        { title: "Earliest to Latest", value: "ascending" },
        { title: "Latest to Earliest", value: "descending" },
    ];
    const [blogData, setBlogData] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { updatedWishlistBlogId } = useContext(OtherContext);
    const axiosSecure = useAxiosSecure();
    const [categories, setCategories] = useState([]);
    const [sortTimeOrder, setSortTimeOrder] = useState(timingOrder[1].value);

    const [searchUrl, setSearchUrl] = useState(
        `/allblogs?email=${currentUser?.email}&userId=${currentUser?.uid}`
    );

    const { data: blogsData, isLoading } = useQuery({
        queryKey: ["allblogs", currentUser?.uid, searchUrl],
        queryFn: async () => {
            const res = await axiosSecure.get(searchUrl);
            return res.data;
        },
    });

    // When updatedWishlistBlogId changes, it reverse the wishlist status of that blog
    useEffect(() => {
        let tempBlogData = blogData.map((data) => {
            if (data._id === updatedWishlistBlogId) {
                data.wishlist = !data.wishlist;
            }

            return data;
        });

        setBlogData(tempBlogData);
    }, [updatedWishlistBlogId]);

    // Fetching categories
    useEffect(() => {
        axiosSecure
            .get(`/category-names`)
            .then((data) => {
                setCategories(data.data);
                console.log(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleSearch = (values) => {
        values.event && values.event.preventDefault();

        let searchTitle = values.searchTitle;
        let selectedCategories = values.selectedCategories.map((categories) => categories.value);
        let sort_Date = values.sort_Date || sortTimeOrder;

        let searchQueries = `&sort_Date=${sort_Date}`;

        searchTitle && (searchQueries += `&searchTitle=${searchTitle}`);
        selectedCategories.length !== 0 && (searchQueries += `&categories=${selectedCategories}`);

        setSearchUrl(
            `/allblogs?email=${currentUser?.email}&userId=${currentUser?.uid}${searchQueries}`
        );
    };

    const handleTimingOrderChange = () => {
        let tempCurrentTimeOrder =
            sortTimeOrder === "descending" ? timingOrder[0].value : timingOrder[1].value;
        setSortTimeOrder(tempCurrentTimeOrder);

        const url = new URL("https://example.com" + searchUrl);

        url.searchParams.set("sort_Date", tempCurrentTimeOrder);

        let modifiedUrl = url.toString();
        modifiedUrl = modifiedUrl.replace("https://example.com", "");

        setSearchUrl(modifiedUrl);
    };

    return (
        <div className="custom-width space-y-8">
            <SectionTitle data={{ title: "All Blogs", noBorder: true }}></SectionTitle>

            {/* Search and Filter */}
            <div>
                <Searchfield handleSearch={handleSearch} categories={categories} />
            </div>

            <div className="space-y-4">
                {/* Is the results from search on not! */}
                <div className="flex justify-between">
                    <div>
                        <h3 className="font-semibold text-lg space-x-2">
                            <span>Blogs</span>
                            <span className="text-xs opacity-80">
                                {blogsData?.allBlogs &&
                                    `(${blogsData?.allBlogs.length} blogs found)`}
                            </span>
                        </h3>
                    </div>

                    <div className="flex gap-2 items-center">
                        <h3 className="font-semibold text-base ">Sort by:</h3>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={sortTimeOrder}
                            onChange={handleTimingOrderChange}
                        >
                            <MenuItem value="descending">Latest to Earliest</MenuItem>
                            <MenuItem value="ascending">Earliest to Latest</MenuItem>
                        </Select>
                    </div>
                </div>

                {/* Skeleton */}
                {isLoading ? (
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

                {/* All blogs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogsData?.allBlogs
                        ? blogsData.allBlogs.map((blogData, idx) => (
                              <BlogCard key={idx} blogData={blogData}></BlogCard>
                          ))
                        : ""}

                    {blogsData?.searchedBlogs && blogsData?.allBlogs.length === 0 ? (
                        <h3 className="font-semibold text-base text-center">
                            No blog found by this search!
                        </h3>
                    ) : (
                        ""
                    )}
                </div>
            </div>

            <Helmet>
                <title>All Blog - Technest</title>
            </Helmet>
        </div>
    );
};

export default AllBlog;

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

const AllBlog = () => {
    const timingOrder = [
        { title: "Earliest to Latest", value: "ascending" },
        { title: "Latest to Earliest", value: "descending" },
    ];
    const [blogData, setBlogData] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { updatedWishlistBlogId, wishlistUpdated } = useContext(OtherContext);
    const axiosSecure = useAxiosSecure();
    const [searchStage, setSearchStage] = useState(true);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortTimeOrder, setSortTimeOrder] = useState(timingOrder[1].value);
    const [currentSearchTitle, setCurrentSearchTitle] = useState("");
    const [currentSelectedCategories, setCurrentSelectedCategories] = useState([]);

    // Fetch all blogs
    useEffect(() => {
        axiosSecure
            .get(`/allblogs`)
            .then((data) => {
                // console.log(data.data);
                setBlogData(data.data);
                // setSearchStage(false);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [currentUser]);

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
        // setLoading(true);

        values.event && values.event.preventDefault();

        let searchTitle;
        let selectedCategories;
        let sort_Date = values.sort_Date || sortTimeOrder;

        if (values.searchTitle) {
            searchTitle = values.searchTitle;
            setCurrentSearchTitle(values.searchTitle);
        } else {
            searchTitle = currentSearchTitle;
        }

        if (values.selectedCategories) {
            selectedCategories = values.selectedCategories.map((categories) => categories.value);
            setCurrentSelectedCategories(selectedCategories);
        } else {
            selectedCategories = currentSelectedCategories;
        }

        axiosSecure
            .get(
                `/filterblogs?searchTitle=${searchTitle}&categories=${selectedCategories}&sort_Date=${sort_Date}`
            )
            .then((data) => {
                setBlogData(data.data);
                setSearchStage(true);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    };

    const handleTimingOrderChange = () => {
        let tempCurrentTimeOrder =
            sortTimeOrder === "descending" ? timingOrder[0].value : timingOrder[1].value;

        setSortTimeOrder(tempCurrentTimeOrder);

        handleSearch({ sort_Date: tempCurrentTimeOrder });
    };

    return (
        <div className="custom-width space-y-8">
            <SectionTitle data={{ title: "All Blogs", noBorder: true }}></SectionTitle>

            {/* Search and Filter */}
            <div>
                <Searchfield handleSearch={handleSearch} categories={categories} />
            </div>

            <div className="space-y-4">
                <div>
                    {searchStage && blogData.length > 0 ? (
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold text-lg space-x-2">
                                    <span>Search Result</span>
                                    <span className="text-xs opacity-80">
                                        ({blogData.length} blogs found)
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
                    ) : (
                        ""
                    )}
                </div>

                {/* Skeleton */}
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

                {/* All blogs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogData.map((blogData, idx) => (
                        <BlogCard key={idx} blogData={blogData}></BlogCard>
                    ))}

                    {searchStage && blogData.length === 0 ? (
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

import { Card } from "flowbite-react";
import { BsBookmarkCheckFill, BsBookmarkCheck } from "react-icons/bs";
import "../CssStyles/Buttons.css";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useContext } from "react";
import { OtherContext } from "../Root";
import { Tooltip } from "flowbite-react";

const BlogCard = ({ blogData }) => {
    const axiosSecure = useAxiosSecure();
    const { addWishlist, removeWishlist } = useContext(OtherContext);

    const { _id, bannerUrl, title, category, shortDescription, wishlist, creationTime } = blogData;

    return (
        <Card className="" imgSrc={bannerUrl}>
            {/*  */}
            <div className="flex-auto">
                <p className="text-highlight font-medium ">{category}</p>
                <h5 className=" text-primary text-2xl font-bold tracking-tight ">{title}</h5>
                <p className="text-sm opacity-80">{moment(creationTime).format("LLL")}</p>
            </div>

            <p className="text-secondary font-normal flex-auto">{shortDescription}</p>
            <div className="flex items-center justify-between ">
                <NavLink to={`/blogDetails/${_id}`}>
                    <button className="_btn _btn-readmore">Read Full Blog</button>
                </NavLink>
                {/* Bookmark Post */}
                <div className="text-2xl cursor-pointer   text-[--text-primary] hover:text-[--text-highlight] ">
                    {wishlist ? (
                        <Tooltip content="Remove Bookmark">
                            <button
                                className="_btn"
                                onClick={() => {
                                    removeWishlist(_id);
                                }}
                            >
                                <BsBookmarkCheckFill />
                            </button>
                        </Tooltip>
                    ) : (
                        <Tooltip content="Bookmark Post">
                            <button
                                className="_btn"
                                onClick={() => {
                                    addWishlist(_id);
                                }}
                            >
                                <BsBookmarkCheck />
                            </button>
                        </Tooltip>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default BlogCard;

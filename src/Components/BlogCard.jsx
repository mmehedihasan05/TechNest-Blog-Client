import { Card } from "flowbite-react";
import { BsBookmarkCheckFill, BsBookmarkCheck } from "react-icons/bs";
import "../CssStyles/Buttons.css";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";

const BlogCard = ({ blogData }) => {
    const axiosSecure = useAxiosSecure();

    const { _id, bannerUrl, title, category, shortDescription, isBookmarked, creationTime } =
        blogData;

    const addBookmarkMutation = useMutation(async (bookmarkData) => {
        const response = await axiosSecure.patch("/addBookMark", bookmarkData);
        return response.data;
    });

    const AddBookmark = () => {
        addBookmarkMutation.mutate({ blogId: _id, userId: "123456" });
    };

    const RemoveBookmark = () => {};

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
                <div className="text-2xl cursor-pointer">
                    {isBookmarked ? (
                        <button className="_btn" onClick={RemoveBookmark}>
                            <BsBookmarkCheckFill className="text-[--text-primary]" />
                        </button>
                    ) : (
                        <button className="_btn" onClick={AddBookmark}>
                            <BsBookmarkCheck className="text-[--text-primary]" />
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default BlogCard;

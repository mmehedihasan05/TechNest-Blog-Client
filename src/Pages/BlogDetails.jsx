/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import moment from "moment";
import { BsBookmarkCheckFill, BsBookmarkCheck, BsFillPencilFill, BsPencil } from "react-icons/bs";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { Tooltip } from "flowbite-react";
import { useEffect } from "react";

const BlogDetails = () => {
    const { blog_id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useContext(AuthContext);
    const [blogData, setBlogData] = useState({});
    const [modifiedLongDescription, setmodifiedLongDescription] = useState([]);

    function formatDescription(description) {
        console.log(description);

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
        console.log(final);
        return final;
    }

    const { isPending, isLoading, isError, error, data, isSuccess } = useQuery({
        queryKey: [blog_id],
        queryFn: async () => {
            let result = axiosSecure
                .get(`/blogDetails/${blog_id}`)
                .then((data) => data)
                .catch((error) => error);

            return result;
        },
    });

    if (isPending || isLoading) {
        console.log("Data Loading");

        return "Skeleton";
    }

    let blogDetails_ = {};

    if (isSuccess) {
        blogDetails_ = data.data;
        console.log(formatDescription(blogDetails_.longDescription));
    }

    const {
        _id,
        bannerUrl,
        title,
        category,
        shortDescription,
        longDescription,
        isBookmarked,
        creationTime,
        authorInfo: { name: authorName, imageUrl: authorImage, userId: authorUserId },
    } = blogDetails_;

    console.log(blogDetails_);

    let authorTempImage = authorImage
        ? authorImage
        : "https://i.ibb.co/YQnZ4sL/user-profile-9368192.png";

    const handleAddBookMark = () => {};

    const handleRemoveBookmark = () => {};

    return (
        <div className="custom-width space-y-6">
            <div>
                <p className="text-highlight font-medium ">{category}</p>

                <h1 className="text-primary sectionHeading text-5xl font-semibold ">{title}</h1>
            </div>
            <div>
                <img
                    className="rounded-md w-auto h-[60vh] mx-auto object-cover"
                    src={bannerUrl}
                    alt=""
                />
            </div>
            {/* Author Info */}
            <div className="flex justify-between ">
                <div className="flex items-center gap-3">
                    <div>
                        <img
                            className="h-auto w-[32px] rounded-full"
                            src={authorTempImage}
                            alt=""
                        />
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className="text-lg">{authorName}</p>
                        <p className="text-sm opacity-70">{moment(creationTime).format("LLL")}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {/* Update post */}
                    <div className="  text-[--text-primary] hover:text-[--text-highlight]">
                        <Tooltip content="Update Post">
                            <button className="_btn">
                                <BsPencil className="text-xl"></BsPencil>
                            </button>
                        </Tooltip>
                    </div>

                    {/* Bookmark Post */}
                    <div className="text-2xl cursor-pointer   text-[--text-primary] hover:text-[--text-highlight] ">
                        {isBookmarked ? (
                            <Tooltip content="Remove Bookmark">
                                <button className="_btn" onClick={handleRemoveBookmark}>
                                    <BsBookmarkCheckFill />
                                </button>
                            </Tooltip>
                        ) : (
                            <Tooltip content="Bookmark Post">
                                <button className="_btn" onClick={handleAddBookMark}>
                                    <BsBookmarkCheck />
                                </button>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </div>
            <hr />
            <div>
                {formatDescription(blogDetails_.longDescription).map((elem, idx) => (
                    <div key={idx}>
                        {elem.heading ? (
                            <h3 className="font-semibold text-xl">
                                <br />
                                {elem.heading}
                            </h3>
                        ) : (
                            <p>{elem.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogDetails;
/*
            <div className="long hidden">
                {newDes.map((elem, idx) => (
                    <div key={idx}>
                        {elem.heading ? <h3>{elem.heading}</h3> : <p>{elem.description}</p>}
                    </div>
                ))} 
            </div>
*/

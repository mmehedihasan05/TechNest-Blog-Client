/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import { BsBookmarkCheckFill, BsBookmarkCheck, BsFillPencilFill, BsPencil } from "react-icons/bs";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { Tooltip } from "flowbite-react";
import { useEffect } from "react";
import { OtherContext } from "../Root";
import { categoryFormatter, formatLongDescription } from "../Utilities/Functionalities";

const BlogDetails = () => {
    const { blog_id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [blogData, setBlogData] = useState();
    const { currentUser } = useContext(AuthContext);
    const { wishlistUpdated, addWishlist, removeWishlist } = useContext(OtherContext);

    useEffect(() => {
        console.log("currentUser", currentUser);
        if (currentUser === null || currentUser) {
            axiosSecure
                .get(`/blogDetails/${blog_id}?userid=${currentUser?.uid}`)
                .then((data) => {
                    console.log(data.data);
                    setBlogData(data.data);
                    // setLoading(false);
                })
                .catch((error) => console.log(error));
        }
    }, [currentUser, wishlistUpdated]);

    if (!blogData) {
        return;
    }

    const {
        _id,
        bannerUrl,
        title,
        category,
        shortDescription,
        longDescription,
        wishlist,
        creationTime,
        authorInfo: { name: authorName, imageUrl: authorImage, userId: authorUserId },
    } = blogData;

    let authorTempImage = authorImage
        ? authorImage
        : "https://i.ibb.co/YQnZ4sL/user-profile-9368192.png";

    const handleComment = () => {};

    const handleUpdate = () => {};

    return (
        <div className="custom-width space-y-6">
            {/* Category and Title */}
            <div>
                <p className="text-highlight font-medium ">{categoryFormatter(category)}</p>

                <h1 className="text-primary sectionHeading text-5xl font-semibold ">{title}</h1>
            </div>

            {/* Banner Image */}
            <div>
                <img
                    className="rounded-md w-auto h-[60vh] mx-auto object-cover"
                    src={bannerUrl}
                    alt=""
                />
            </div>

            {/* Author Info,Time, Update and Bookmark Button */}
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
                    {authorUserId === currentUser.uid ? (
                        <div className="  text-[--text-primary] hover:text-[--text-highlight]">
                            <Tooltip content="Update Post">
                                <button className="_btn">
                                    <NavLink to={`/updateBlog/${_id}`}>
                                        <BsPencil className="text-xl"></BsPencil>
                                    </NavLink>
                                </button>
                            </Tooltip>
                        </div>
                    ) : (
                        ""
                    )}

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
            </div>
            <hr />

            {/* Long Description */}
            <div>
                {formatLongDescription(blogData.longDescription).map((elem, idx) => (
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

            <hr />
            {/* Comment */}
            <div className="space-y-4">
                <div>
                    <h2 className="text-3xl font-bold">Comments</h2>
                </div>
                <hr />
                <div>
                    {/* Comment or Warning to login */}
                    <div className="flex items-center gap-4 w-full">
                        <img
                            src={currentUser?.photoURL || "/no_face.png"}
                            className="h-[45px] w-[45px] rounded-full"
                        />
                        <form
                            action=""
                            onClick={handleComment}
                            className="flex items-center gap-4 w-[75%]"
                        >
                            <textarea
                                name="comment"
                                className="w-full rounded-md"
                                placeholder="Leave a comment"
                                required
                            ></textarea>
                            <input type="submit" className="_btn _btn-secondary" value="Post" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;

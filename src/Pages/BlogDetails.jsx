/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import useAxiosSecure from "../hooks/useAxiosSecure";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import { BsBookmarkCheckFill, BsBookmarkCheck, BsFillPencilFill, BsPencil } from "react-icons/bs";
import { MdOutlineModeComment, MdErrorOutline, MdError } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { Tooltip } from "flowbite-react";
import { useEffect } from "react";
import { OtherContext } from "../Root";
import { categoryFormatter, formatLongDescription } from "../Utilities/Functionalities";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import CommentCard from "../Components/CommentCard";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
    const { blog_id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [blogData, setBlogData] = useState();
    const [commentList, setCommentList] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { wishlistUpdated, addWishlist, removeWishlist } = useContext(OtherContext);
    const [commentUpdate, setCommentUpdate] = useState(true);

    // Blog data fetching
    useEffect(() => {
        axiosSecure
            .get(`/blogDetails/${blog_id}`)
            .then((data) => {
                setBlogData(data.data);
                // setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [currentUser, wishlistUpdated]);

    // Comments fetching
    useEffect(() => {
        axiosSecure
            .get(`/comment-list/${blog_id}`)
            .then((data) => {
                // console.log("comment data", data.data);

                if (data.data.commentInfo) {
                    setCommentList(data.data.commentInfo);
                } else {
                    setCommentList([]);
                }
                // setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [commentUpdate]);

    if (!blogData) {
        return (
            <div className="custom-width">
                <Skeleton height={75} count={1} />
                <Skeleton height={300} count={1} />
                <Skeleton height={40} count={1} />

                <Skeleton count={20} />
            </div>
        );
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

    const handleComment = (e) => {
        e.preventDefault();

        let form = e.target;
        // console.log(form.comment.value);

        let commentData = {
            blog_id: blog_id,
            userId: currentUser?.uid,
            email: currentUser?.email,
            commentInfo: {
                comment: form.comment.value,
                commented_userName: currentUser.displayName,
                commented_userImage: currentUser.photoURL,
            },
        };

        return toast.promise(
            axiosSecure
                .post("/comment", commentData)
                .then((response) => {
                    if (response.data.acknowledged) {
                        form.reset();
                        setCommentUpdate(!commentUpdate);
                        return <b>Comment Posted Successfully.</b>;
                    } else {
                        throw new Error("Failed to Post Comment!");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    console.log(error);
                    if (error.response.status === 401 && currentUser) {
                        logout()
                            .then((response) => {
                                toast.error("Unauthorized Access! Logged Out.");
                            })
                            .catch((error) => {
                                toast.error("Unauthorized Access! Log Out Failed.");
                            });
                    }
                    throw new Error("Failed to post comment!");
                }),
            {
                loading: "Posting Comment...",
                success: (message) => message,
                error: (error) => <b>Failed to Post Comment!</b>,
            }
        );
    };

    return (
        <div className="custom-width space-y-6">
            {/* Category and Title */}
            <div>
                <p className="text-highlight font-medium ">{categoryFormatter(category)}</p>

                <h1 className="text-primary sectionHeading text-3xl md:text-5xl font-semibold ">
                    {title}
                </h1>
            </div>

            {/* Banner Image */}
            {/* Photo view */}
            <div>
                <PhotoProvider className="">
                    <PhotoView src={bannerUrl}>
                        <img
                            className="rounded-md w-auto h-[40vh] md:h-[60vh] mx-auto object-cover cursor-pointer"
                            src={bannerUrl}
                            alt=""
                        />
                    </PhotoView>
                </PhotoProvider>
            </div>

            {/* Author Info,Time, Update and Bookmark Button */}
            <div className="flex justify-between flex-row  ">
                <div className="flex items-center gap-3">
                    <div>
                        <img
                            className="h-auto w-[32px] rounded-full"
                            src={authorTempImage}
                            alt=""
                        />
                    </div>
                    <div className="flex md:gap-4 items-start md:items-center flex-col md:flex-row">
                        <p className="text-lg">{authorName}</p>
                        <p className="text-sm opacity-70">{moment(creationTime).format("LLL")}</p>
                    </div>
                </div>
                <div className="flex justify-end items-center gap-4">
                    {/* Update post */}
                    {authorUserId === currentUser?.uid ? (
                        <div className="  text-[--text-primary] hover:text-[--text-highlight]">
                            <Tooltip content="Update Post">
                                <NavLink to={`/updateBlog/${_id}`}>
                                    <button className="_btn">
                                        <BsPencil className="text-xl"></BsPencil>
                                    </button>
                                </NavLink>
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
                <div className="text-xl md:text-3xl font-bold flex items-center gap-2">
                    <BiComment />
                    <h2 className="text-xl md:text-3xl font-bold">Comments</h2>
                </div>
                <hr />
                <div>
                    {/* Comment or Warning to login */}
                    {!currentUser ? (
                        <div className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-[--text-highlight]">
                            <MdError />
                            <h3 className="text-xl md:text-2xl font-semibold text-[--text-highlight]">
                                Please login to comment!
                            </h3>
                        </div>
                    ) : authorUserId === currentUser?.uid ? (
                        <h3 className="text-2xl font-semibold">Author cannot comment own post!</h3>
                    ) : (
                        <div className="flex items-center gap-4 w-full">
                            <img
                                src={currentUser?.photoURL || "/no_face.png"}
                                className="h-[45px] w-[45px] rounded-full"
                            />
                            <form
                                action=""
                                onSubmit={handleComment}
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
                    )}
                </div>

                {/* All comments */}
                <div className="flex flex-col gap-4">
                    {commentList.map((commentData, idx) => (
                        <CommentCard key={idx} commentData={commentData}></CommentCard>
                    ))}
                </div>
            </div>

            <Helmet>
                <title>{title} - Technest</title>
            </Helmet>
        </div>
    );
};

export default BlogDetails;

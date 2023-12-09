/* eslint-disable react-hooks/exhaustive-deps */
import { async } from "@firebase/util";
import axios from "axios";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthProvider";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";

const imageApiKey = import.meta.env.VITE_IMAGE_API_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?expiration=600&key=${imageApiKey}`;
const AddBlog = () => {
    const axiosSecure = useAxiosSecure();
    const [categories, setCategories] = useState([]);
    const { currentUser, logout } = useContext(AuthContext);

    useEffect(() => {
        axiosSecure
            .get(`/category-names`)
            .then((data) => {
                setCategories(data.data);
                // setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleAddBlog = async (e) => {
        e.preventDefault();

        const form = e.target;

        const bannerImage = e.target.banner_image.files[0];
        // const bannerUrl = form.banner_image_url.value;
        const title = form.blog_title.value;
        const category = form.category.value;
        const shortDescription = form.shortDescription.value;
        const longDescription = form.longDescription.value;

        const currentDate = new Date();
        const isoString = currentDate.toISOString();

        const uploadImage = async (bannerImage) => {
            try {
                // Create FormData object
                const formData = new FormData();
                formData.append("image", bannerImage);

                // Make the API request using Axios
                const imagePostResponse = await axios.post(imageHostingApi, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                return imagePostResponse.data;
            } catch (error) {
                console.error("Image Upload Error:", error);
                throw error;
            }
        };

        let imageUploadReponse = await uploadImage(bannerImage);

        /*
        imageUploadReponse.success
        imageUploadReponse.data.display_url        Medium size
        imageUploadReponse.data.url                Full size
        */

        console.log("imageUploadReponse ", imageUploadReponse);

        if (imageUploadReponse.success) {
            const bannerUrl = imageUploadReponse.data.url;

            const dataToPost = {
                userId: currentUser?.uid,
                email: currentUser?.email,
                blogData: {
                    bannerUrl,
                    title,
                    category,
                    shortDescription,
                    longDescription,
                    creationTime: isoString,
                    authorInfo: {
                        name: currentUser.displayName,
                        imageUrl: currentUser.photoURL,
                        userId: currentUser.uid,
                    },
                },
            };

            // Uploading blog data to server
            return toast.promise(
                axiosSecure
                    .post("/addBlog", dataToPost)
                    .then((response) => {
                        // console.log(response.data);
                        if (response.data.acknowledged) {
                            form.reset();
                            return <b>Blog Published Successfully.</b>;
                        } else {
                            throw new Error("Failed to publish blog!");
                        }
                    })
                    .catch((error) => {
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
                        throw new Error("Failed to publish blog!");
                    }),
                {
                    loading: "Publishing blog...",
                    success: (message) => message,
                    error: (error) => <b>Failed to publish blog!</b>,
                }
            );
        }
    };

    return (
        <div className="custom-width sapce-y-10">
            <SectionTitle data={{ title: "Add Blog", noBorder: true }}></SectionTitle>
            <div>
                <form
                    action=""
                    onSubmit={handleAddBlog}
                    className="space-y-6  w-[95%] md:w-[75%] mx-auto"
                >
                    <div>
                        <div>Blog Title</div>
                        <input
                            type="text"
                            placeholder="Title"
                            name="blog_title"
                            className="_input w-full"
                            required
                        />
                    </div>
                    <div>
                        <div>Category</div>
                        <select name="category" id="" className="w-full cursor-pointer" required>
                            {categories.map((category, idx) => (
                                <option value={category.value} key={idx}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <div>Short Description</div>
                        <textarea
                            name="shortDescription"
                            className="w-full rounded-md"
                            id=""
                            placeholder="Short Description"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <div>Long Description</div>
                        <textarea
                            name="longDescription"
                            className="w-full rounded-md"
                            id=""
                            rows="7"
                            placeholder="Long Description"
                            required
                        ></textarea>
                    </div>
                    <div className="">
                        <div>Banner Image Url</div>
                        <input
                            type="file"
                            name="banner_image"
                            className="file-input file-input-bordered w-full max-w-xs"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="submit"
                            className="_btn _btn-primary w-full"
                            value="Publish Blog"
                        />
                    </div>
                </form>
            </div>

            <Helmet>
                <title>Write Blog - Technest</title>
            </Helmet>
        </div>
    );
};

export default AddBlog;

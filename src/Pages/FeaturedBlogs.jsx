/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";

const FeaturedBlogs = () => {
    const axiosSecure = useAxiosSecure();
    const [featuredBlogData, setFeaturedBlogData] = useState([]);

    useEffect(() => {
        axiosSecure
            .get(`/featured-blogs`)
            .then((data) => {
                let tempData = data.data.map((blog, idx) => {
                    blog.serial = idx + 1;
                    return blog;
                });
                setFeaturedBlogData(tempData);
                // setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const columns = [
        {
            name: "Serial",
            selector: (row) => row.serial,
            sortable: true,
        },
        {
            name: "Blog Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Blog Owner",
            selector: (row) => row?.authorInfo?.name,
            sortable: true,
        },
        {
            name: "Blog Owner Image",
            selector: (row) => (
                <img
                    src={row?.authorInfo?.imageUrl}
                    alt="Blog Owner Image"
                    style={{ width: "120px", height: "120px" }}
                />
            ),
        },
    ];

    const myNewTheme = {
        rows: {
            fontSize: "25px",
        },
        selector: {
            fontSize: "25px",
        },
        columns: {
            fontSize: "25px",
        },
    };

    console.log(featuredBlogData);

    return (
        <div className="custom-width space-y-8">
            <SectionTitle data={{ title: "Featured Blogs", noBorder: true }}></SectionTitle>
            <div className="">
                <DataTable columns={columns} data={featuredBlogData} customTheme={myNewTheme} />
            </div>
        </div>
    );
};

export default FeaturedBlogs;

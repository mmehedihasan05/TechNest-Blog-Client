/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { NavLink } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const ShowByCategories = () => {
    const axiosSecure = useAxiosSecure();
    const [categories, setCategories] = useState([]);

    // get category list
    useEffect(() => {
        axiosSecure
            .get(`/category-names`)
            .then((data) => {
                setCategories(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="space-y-8">
            <SectionTitle
                data={{ title: "Categories", description: "Read by categories", noBorder: true }}
            ></SectionTitle>
            <div>
                <ul className="flex flex-col gap-4">
                    {categories.map((category, idx) => (
                        <li value={category.value} key={idx}>
                            <div>
                                <NavLink
                                    to={`/blogsbycategory/${category.value}`}
                                    className="flex items-center gap-2 text-[--text-primary] font-medium cursor-pointer
                            hover:text-[--text-highlight] hover:font-semibold hover:pl-2
                            transition-all"
                                >
                                    <BsFillArrowRightCircleFill></BsFillArrowRightCircleFill>
                                    {category.title}
                                </NavLink>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShowByCategories;

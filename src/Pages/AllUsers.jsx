/* eslint-disable no-unreachable */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import UserDelete from "../Components/UserDelete";
import { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import { FaPencilAlt } from "react-icons/fa";
import UserUpgrade from "../Components/userUpgrade";
import { AuthContext } from "../AuthProvider";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [targetedUserData, setTargetedUserData] = useState({});
    const { currentUser } = useContext(AuthContext);

    // All users load request
    const {
        data: allUsers = [],
        isLoading = true,
        refetch,
    } = useQuery({
        queryKey: ["allUsers", currentUser],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/allUsers?email=${currentUser?.email}&userId=${currentUser?.uid}`
            );
            return res.data;
        },
    });

    const handleUserUpgradeAdmin = (userData) => {
        console.log(userData);

        return toast.promise(
            axiosSecure
                .patch(
                    `/user/makeadmin?email=${currentUser?.email}&userId=${currentUser?.uid}&targetedUserEmail=${userData.email}`
                )
                .then((response) => {
                    if (response.data.acknowledged && response.data.modifiedCount > 1) {
                        document.getElementById(`modal_close_upgrade`).click();

                        refetch(["allUsers"]);
                        return <b>User upgraded successfully!</b>;
                    } else {
                        throw new Error("Failed to upgrade User!");
                    }
                })
                .catch((error) => {
                    console.log(error);

                    throw new Error("Failed to upgrade User!");
                }),
            {
                loading: "Upgrading User...",
                success: (message) => message,
                error: (error) => <b>Failed to upgrade User!</b>,
            }
        );
    };

    const handleUserDelete = (userData) => {
        return toast.promise(
            axiosSecure
                .delete(
                    `/userdelete?email=${currentUser?.email}&userId=${currentUser?.uid}&targetedUserEmail=${userData.email}`
                )
                .then((response) => {
                    if (response.data.acknowledged && response.data.deletedCount > 0) {
                        document.getElementById(`modal_close_delete`).click();

                        refetch(["allUsers"]);
                        return <b>User deleted successfully!</b>;
                    } else {
                        throw new Error("Failed to Delete User!");
                    }
                })
                .catch((error) => {
                    console.log(error);

                    throw new Error("Failed to Delete User!");
                }),
            {
                loading: "Deleting User...",
                success: (message) => message,
                error: (error) => <b>Failed to Delete User!</b>,
            }
        );
    };

    return (
        <div className=" mx-auto">
            {isLoading ? (
                <div className="w-[50vw]">
                    <Skeleton count={10} />
                </div>
            ) : (
                <div id="tableee" className="overflow-x-auto bg-[--bg-white] px-6">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="text-lg text-center">Basic Info</th>
                                <th className="text-lg text-center">Role</th>
                                <th className="text-lg text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {allUsers.map((user, idx) => (
                                <tr key={idx}>
                                    <td className="px-4 lg:px-12">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10">
                                                    <img
                                                        src={user.photoURL}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.displayName}</div>
                                                <div>{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-12 flex items-center gap-1">
                                        {user.role === "admin" ? (
                                            <div className="flex items-center gap-1">
                                                <RiAdminFill /> Admin
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1">
                                                <FaUserAlt /> User
                                            </div>
                                        )}

                                        <div className="_btn text-base hover:text-[--text-highlight]">
                                            <button
                                                onClick={() => {
                                                    setTargetedUserData(user);
                                                    document
                                                        .getElementById("my_modal_2_upgrade")
                                                        .showModal();
                                                }}
                                            >
                                                <FaPencilAlt />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-12">
                                        <div className="_btn text-2xl hover:text-[--text-highlight]">
                                            <button
                                                onClick={() => {
                                                    setTargetedUserData(user);
                                                    document
                                                        .getElementById("my_modal_2_delete")
                                                        .showModal();
                                                }}
                                            >
                                                <MdDeleteForever />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <UserDelete
                targetedUserData={targetedUserData}
                handleUserDelete={handleUserDelete}
            ></UserDelete>
            <UserUpgrade
                targetedUserData={targetedUserData}
                handleUserUpgradeAdmin={handleUserUpgradeAdmin}
            ></UserUpgrade>
        </div>
    );
};

export default AllUsers;

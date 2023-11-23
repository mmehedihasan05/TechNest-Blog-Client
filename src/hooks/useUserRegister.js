import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserRegister = (userCredential) => {
    const axiosSecure = useAxiosSecure();

    const userInfo = {
        photoURL: userCredential?.photoURL,
        displayName: userCredential?.displayName,
        email: userCredential?.email,
        emailVerified: userCredential?.emailVerified,
        creationTime: userCredential?.creationTime,
        uid: userCredential?.uid,
        providerId: userCredential?.providerData[0]?.providerId,
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["userRegister"],
        queryFn: async () => {
            const res = await axiosSecure.post(`/adduser`, userInfo);
            return res.data;
        },
    });

    return <div></div>;
};

export default useUserRegister;

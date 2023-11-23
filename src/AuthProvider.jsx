/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";

import {
    createUserWithEmailAndPassword,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    signOut,
} from "firebase/auth";

import toast from "react-hot-toast";

import { createContext, useEffect, useState } from "react";
import { app } from "./Firebase.init";
import useAxiosSecure from "./hooks/useAxiosSecure";
import Loading from "./Components/Loading";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [errorState, setErrorState] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [purchases, setPurchases] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem("current-theme") || "dark");
    const [isAdmin, setIsAdmin] = useState(false);
    const axiosSecure = useAxiosSecure();

    const auth = getAuth(app);

    function errorMsgFormatter(msg) {
        if (msg === "auth/email-already-in-use") {
            return "Email Already Exists!";
        } else if (msg === "auth/invalid-email") {
            return "Email is Not Valid!";
        } else if (msg === "auth/weak-password") {
            return "Provide a Strong Password!";
        } else if (msg === "auth/cancelled-popup-request" || msg === "auth/popup-closed-by-user") {
            return "Registration Canceled!";
        } else if (msg === "auth/invalid-login-credentials") {
            return "Email or Password is Incorrect!";
        } else if (msg === "auth/account-exists-with-different-credential") {
            return "Account Exists With Different Login Method!";
        } else if (msg === "auth/network-request-failed") {
            return "There's a problem with network!";
        } else {
            return msg;
        }
    }

    function userInfoExtract(userCredential) {
        return {
            userInfo: {
                photoURL: userCredential?.photoURL,
                displayName: userCredential?.displayName,
                email: userCredential?.email,
                emailVerified: userCredential?.emailVerified,
                creationTime: userCredential?.creationTime,
                uid: userCredential?.uid,
                providerId: userCredential?.providerData[0]?.providerId,
            },
        };
    }

    // const {
    //     data: registerStatus,
    //     isLoading,
    //     isError,
    //     refetch,
    // } = useQuery({
    //     queryKey: ["userRegister"],
    //     queryFn: async (queryKey, variables) => {
    //         const res = await axiosSecure.post(`/adduser`, variables.userInfo);
    //         return res.data;
    //     },
    //     enabled: false,
    // });

    // Create User || Register Page
    const userCreate = ({ userFullName, userProfileImageUrl, userEmail, userPassword }) => {
        return toast.promise(
            createUserWithEmailAndPassword(auth, userEmail, userPassword)
                .then(async (userCredential) => {
                    //
                    await updateProfile(auth.currentUser, {
                        displayName: userFullName,
                        photoURL: userProfileImageUrl,
                    });
                    //
                    console.log("from manual register", userCredential);

                    // user entry
                    let registerRes = await axiosSecure
                        .post(`/adduser`, userInfoExtract(userCredential.user))
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log("error from userRegister", error);
                        });

                    return userCredential.user;
                })
                .catch((error) => {
                    const formattedError = errorMsgFormatter(error.code);
                    throw formattedError;
                }),
            {
                loading: "Creating Account...",
                success: (user) => <b>Registered successfully!</b>,
                error: (error) => <b>{error}</b>,
            }
        );
    };

    // Register or Login using Google
    const googleLogin = (successMsg) => {
        return toast.promise(
            signInWithPopup(auth, googleProvider)
                .then(async (userCredential) => {
                    // User authenticated

                    let registerRes = await axiosSecure
                        .post(`/adduser`, userInfoExtract(userCredential.user))
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log("error from userRegister", error);
                        });

                    // registerRes

                    return userCredential.user;
                })
                .catch((error) => {
                    const formattedError = errorMsgFormatter(error.code);
                    throw formattedError;
                }),
            {
                loading: "Authenticating Using Google...",
                success: (user) => <b>{successMsg}</b>,
                error: (error) => <b>{error}</b>,
            }
        );
    };

    // Register or Login using Github
    const githubLogin = (successMsg) => {
        return toast.promise(
            signInWithPopup(auth, githubProvider)
                .then(async (userCredential) => {
                    // user entry
                    let registerRes = await axiosSecure
                        .post(`/adduser`, userInfoExtract(userCredential.user))
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log("error from userRegister", error);
                        });

                    return userCredential.user;
                })
                .catch((error) => {
                    const formattedError = errorMsgFormatter(error.code);
                    throw formattedError;
                }),
            {
                loading: "Authenticating Using Github...",
                success: (user) => <b>{successMsg}</b>,
                error: (error) => <b>{error}</b>,
            }
        );
    };

    // Login
    const login = ({ userEmail, userPassword }) => {
        return toast.promise(
            signInWithEmailAndPassword(auth, userEmail, userPassword)
                .then((userCredential) => {
                    return userCredential.user;
                })
                .catch((error) => {
                    const formattedError = errorMsgFormatter(error.code);
                    throw formattedError;
                }),
            {
                loading: "Logging Account...",
                success: (user) => <b>Logged in Sccessfully!</b>,
                error: (error) => <b>{error}</b>,
            }
        );
    };

    const logout = async () => {
        return signOut(auth)
            .then(() => {
                axiosSecure
                    .post(`/logout`, { email: currentUser?.email })
                    .then((response) => {
                        // toast.success("Account Logged out");
                        console.log("JWT || Logged Out Successfully ", response);
                    })
                    .catch((jwt_Error) => {
                        console.log(
                            "JWT || Log Out Failed",
                            jwt_Error.response.data,
                            jwt_Error.response.status
                        );
                    });
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            });
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            const email = user?.email;
            const userId = user?.uid;

            console.log(user);
            if (email) {
                // Setting cookies and checking cookies
                axiosSecure
                    .post(`/authenticate`, { email, userId })
                    .then((response) => {
                        console.log("JWT || Authentication Success", response);

                        // admin role checking
                        axiosSecure
                            .get(`/role-check?email=${email}&userId=${userId}`)
                            .then((res) => {
                                console.log("res from admin chk", res.data);
                                setIsAdmin(res.data.isAdmin);
                                setCurrentUser(user);
                                setLoading(false);
                            })
                            .catch((err) =>
                                console.log("error from authprovider/admin role check")
                            );
                    })
                    .catch((jwt_Error) => {
                        console.log(
                            "JWT || Authentication Failed",
                            jwt_Error.response.data,
                            jwt_Error.response.status
                        );
                    });
            } else {
                setCurrentUser(user);
                setLoading(false);
            }
        });

        return () => {
            unSubscribe();
        };
    }, []);

    const authentications = {
        userCreate,
        login,
        googleLogin,
        githubLogin,
        logout,
        errorState,
        setErrorState,

        currentUser,
        purchases,
        setPurchases,
        loading,
        theme,
        setTheme,

        isAdmin,
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <AuthContext.Provider value={authentications}>{children}</AuthContext.Provider>
        </>
    );
};

export default AuthProvider;

/* eslint-disable react-hooks/exhaustive-deps */
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

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [errorState, setErrorState] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [purchases, setPurchases] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem("current-theme") || "dark");
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

    // Create User || Register Page
    const userCreate = ({ userFullName, userProfileImageUrl, userEmail, userPassword }) => {
        return toast.promise(
            createUserWithEmailAndPassword(auth, userEmail, userPassword)
                .then((userCredential) => {
                    //
                    updateProfile(auth.currentUser, {
                        displayName: userFullName,
                        photoURL: userProfileImageUrl,
                    });
                    //
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
                .then((userCredential) => {
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
                .then((userCredential) => {
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
                    .post(`/logout`, { email: currentUser?.email }, { withCredentials: true })
                    .then((response) => {
                        localStorage.removeItem("userId");
                        localStorage.removeItem("userEmail");
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
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false);
            setCurrentUser(user);

            const email = user?.email;
            if (email) {
                localStorage.setItem("userId", user.uid);
                localStorage.setItem("userEmail", user.email);
            } else {
                localStorage.removeItem("userId");
                localStorage.removeItem("userEmail");
            }
        });

        return () => {
            unSubscribe();
        };
    }, []);

    return (
        <>
            <AuthContext.Provider value={authentications}>{children}</AuthContext.Provider>
        </>
    );
};

export default AuthProvider;

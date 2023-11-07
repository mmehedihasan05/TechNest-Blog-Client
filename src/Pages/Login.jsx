import { useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Authentication_3rdParty from "../Components/Authentication_3rdParty";
import SectionTitle from "../Components/SectionTitle";

/* eslint-disable react/no-unescaped-entities */
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login, currentUser } = useContext(AuthContext);

    const location = useLocation();

    if (currentUser?.email && location?.state) {
        return <Navigate to={location.state} />;
    } else if (currentUser?.email && !location?.state) {
        return <Navigate to="/" />;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        let data = {
            userEmail: e.target.email?.value,
            userPassword: e.target.password?.value,
        };

        login(data);
    };
    return (
        <div className="max-w-6xl h-[75vh] mx-auto bg-[--bg-white] shadow-lg rounded-md px-6">
            <div className="pt-4 ">
                <SectionTitle data={{ title: "Login", noBorder: true }}></SectionTitle>
            </div>

            <div
                className="
                 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 md:py-0 h-[80%] gap-8"
            >
                {/* Left Side: Toogle */}
                <div
                    className=" _sub-content
                    col-span-2 lg:col-span-3 space-y-8
                    grid grid-cols-4 
                    "
                    style={{
                        backgroundImage: `url(/public/images/authentication-1.png)`,
                        backgroundPosition: "right bottom",
                        backgroundSize: "auto 90%",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="col-span-3 h-[50%] flex ">
                        <div className="self-end space-y-4">
                            <h2 className=" text-2xl lg:text-3xl _text-deep font-bold">
                                Don't Have an Account?
                            </h2>
                            <div className="text-xl">
                                <Link to="/register">
                                    <button className="_btn _btn-secondary">Register</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* <div className="self-end">
                        <img src="/images/authentication-1.png" alt="" />
                    </div> */}
                </div>

                {/* Right Side: Login Form */}
                <div
                    className="col-span-2 rounded-lg md:rounded-none md:rounded-r-lg space-y-2
                    flex flex-col items-center justify-center 
                    contactFormParent"
                >
                    <form
                        onSubmit={handleLogin}
                        className="contactFormParent w-full
                        flex flex-col gap-6"
                    >
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            className="_input"
                            required
                            defaultValue="sad3@gmail.com"
                        />

                        <div className="passwordParent">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                className="_input password"
                                required
                                defaultValue="sad##sad55_"
                            />
                            <div className="text-2xl cursor-pointer place-self-center passwordEye">
                                {showPassword ? (
                                    <AiFillEye
                                        onClick={() => setShowPassword(!showPassword)}
                                    ></AiFillEye>
                                ) : (
                                    <AiFillEyeInvisible
                                        onClick={() => setShowPassword(!showPassword)}
                                    ></AiFillEyeInvisible>
                                )}
                            </div>
                        </div>

                        <input className="_btn _btn-primary" type="submit" value="Login" />
                    </form>

                    <Authentication_3rdParty actionName="login"></Authentication_3rdParty>
                </div>

                {/* For mobile */}
                <div
                    className=" block md:hidden w-full col-span-2 my-8 
                    rounded-lg px-2 py-4 authentication-toggle"
                >
                    <h2 className="text-lg  _text-deep font-bold pb-2">Don't Have an Account?</h2>
                    <div className="text-xl flex justify-center">
                        <Link to="/register">
                            <button className="_btn _btn-fill ml-4 px-16">Register</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

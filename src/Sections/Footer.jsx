import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Footer_ = () => {
    return (
        <div className="">
            <Footer container>
                <div className="w-full custom-width">
                    <div className="grid  justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                        <div>
                            <Footer.Brand href="/" src="/Logo.png" alt="Logo" />
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                            <div>
                                <Footer.Title title="Links" />
                                <Footer.LinkGroup col>
                                    <NavLink to="/allblogs">All Blogs</NavLink>
                                    <NavLink to="/featuredblogs">Featured Blogs</NavLink>
                                    <NavLink to="/wishlist">Wishlist</NavLink>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="Follow us" />
                                <Footer.LinkGroup col>
                                    <Footer.Link
                                        target="_blank"
                                        href="https://github.com/mmehedihasan05"
                                    >
                                        Github
                                    </Footer.Link>
                                    <Footer.Link
                                        target="_blank"
                                        href="https://www.facebook.com/mmehedihasan05/"
                                    >
                                        Facebook
                                    </Footer.Link>
                                    <Footer.Link target="_blank" href="https://twitter.com/">
                                        Twitter
                                    </Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                        </div>
                    </div>
                    <Footer.Divider />
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright
                            target="_blank"
                            href="https://www.facebook.com/mmehedihasan05/"
                            by="Md. Mehedi Hasan"
                            year={2023}
                        />
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                            <Footer.Icon
                                target="_blank"
                                href="https://www.facebook.com/mmehedihasan05/"
                                icon={BsFacebook}
                            />
                            <Footer.Icon
                                target="_blank"
                                href="#https://www.instagram.com/"
                                icon={BsInstagram}
                            />
                            <Footer.Icon
                                target="_blank"
                                href="https://twitter.com/"
                                icon={BsTwitter}
                            />
                            <Footer.Icon
                                target="_blank"
                                href="https://github.com/mmehedihasan05"
                                icon={BsGithub}
                            />
                        </div>
                    </div>
                </div>
            </Footer>
        </div>
    );
};
export default Footer_;

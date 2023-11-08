import SectionTitle from "../../Components/SectionTitle";

import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState } from "react";
const NewsLetter = () => {
    const [email_, setEmail_] = useState("");
    const handleSubscribe = () => {
        if (email_ === "") {
            toast.error("Type your email first");
        } else {
            toast.success("Thanks for subscribing to our newsletter");
        }
    };

    return (
        <div className="space-y-4">
            <SectionTitle
                data={{
                    title: "Newsletter",
                    description: "Subscribe to your newsletter",
                    noBorder: true,
                }}
            ></SectionTitle>
            <form action="" onSubmit={handleSubscribe} className="space-y-6">
                <div className="max-w-md">
                    <TextInput
                        id="email4"
                        type="email"
                        icon={HiMail}
                        placeholder="technest@gmail.com"
                        required
                        value={email_}
                        onChange={(e) => {
                            setEmail_(e.target.value);
                        }}
                    />
                </div>
                <div className="flex justify-center">
                    <motion.div
                        className="box px-4 py-2 rounded-md cursor-pointer bg-[--btn-secondary-bg] text-[--btn-secondary-text] w-fit mx-auto"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        onClick={handleSubscribe}
                    >
                        Subscribe
                    </motion.div>
                </div>
            </form>
        </div>
    );
};

export default NewsLetter;

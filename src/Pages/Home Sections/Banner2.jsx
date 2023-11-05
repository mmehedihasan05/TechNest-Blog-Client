import { Carousel } from "flowbite-react";

function Banner2() {
    const bannerContent = [
        {
            imageName: "Bytes_of_Wisdom.jpg",
            title: "Bytes of Wisdom",
            description: "Wisdom for the Digital Age.",
        },
        {
            imageName: "Tech_Trends.jpg",
            title: "Tech Trends Today",
            description: "Stay Ahead, Stay Informed.",
        },
        {
            imageName: "Code_Creativity.jpg",
            title: "Code & Creativity",
            description: "Where Ideas Come Alive.",
        },
        {
            imageName: "Digital_Discovery.jpg",
            title: "Digital Discovery",
            description: "Exploring the Digital World.",
        },

        {
            imageName: "Unraveling_Tech.jpg",
            title: "Future Tech Talks",
            description: "Unraveling Tomorrow's Tech.",
        },
        {
            imageName: "Tech_Conversation.jpg",
            title: "Nerds Unite Here",
            description: "Join the Tech Conversation.",
        },
    ];

    return (
        <div className="custom-width custom-width-nospace border border-red-700 rounded">
            <div className="h-[80vh] ">
                <Carousel>
                    <div
                        id="bannerTest"
                        className="flex h-full w-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white "
                        style={{
                            backgroundImage: `url(/public/HomeBanner/Bytes_of_Wisdom.jpg)`,
                        }}
                    >
                        {/* <img src="/public/HomeBanner/Bytes_of_Wisdom.jpg" alt="" /> */}
                        <div>
                            <h1>Hi</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
                                ratione commodi repudiandae dolorem sint quam, excepturi ab. A, esse
                                repellendus. Fuga quia veritatis quos nihil facilis eius ab neque
                                dolorum.
                            </p>
                        </div>
                    </div>
                    {/* <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                        Slide 2
                    </div>
                    <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                        Slide 3
                    </div> */}
                </Carousel>
            </div>
        </div>
    );
}
export default Banner2;

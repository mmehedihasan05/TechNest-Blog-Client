// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Banner.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {
    const bannerContent = [
        {
            imageName: "Tech_Trends.jpg",
            title: "Tech Trends Today",
            description: "Stay Ahead, Stay Informed.",
        },
        {
            imageName: "Digital_Discovery.jpg",
            title: "Digital Discovery",
            description: "Exploring the Digital World.",
        },
        {
            imageName: "Bytes_of_Wisdom.jpg",
            title: "Bytes of Wisdom",
            description: "Wisdom for the Digital Age.",
        },

        {
            imageName: "Code_Creativity.jpg",
            title: "Code & Creativity",
            description: "Where Ideas Come Alive.",
        },

        {
            imageName: "Tech_Conversation.jpg",
            title: "Nerds Unite Here",
            description: "Join the Tech Conversation.",
        },
        {
            imageName: "Unraveling_Tech.jpg",
            title: "Future Tech Talks",
            description: "Unraveling Tomorrow's Tech.",
        },
    ];

    return (
        <div className="banner_ custom-width custom-width-nospace">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                grabCursor={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper rounded-lg"
            >
                <div>
                    {bannerContent.map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                className="min-h-[100%] w-full banner-image-container"
                                style={{
                                    backgroundImage: `url(/HomeBanner/${slide.imageName})`,
                                }}
                            >
                                <div className="banner-image-overlay"></div>
                                <div
                                    className="min-h-[100%] min-w-[100%] absolute 
                                flex items-center justify-center "
                                >
                                    <div>
                                        <h1 className="mb-5 text-3xl md:text-6xl font-bold text-[--banner-primary] ">
                                            {slide.title}
                                        </h1>
                                        <p className="mb-5 text-2xl text-[--banner-secondary]">
                                            {slide.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    );
};

export default Banner;

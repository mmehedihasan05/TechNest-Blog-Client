// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Banner.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import ClipPath from "../ClipPath";

const Banner = () => {
    const bannerContent = [
        {
            imageName: "banner1.jpg",
            title: "Delicious Combos",
            description:
                "Explore our mouthwatering burgers, pizza, and a variety of refreshing drinks for a delightful meal.",
        },
        {
            imageName: "banner2.jpg",
            title: "Sweet Treats",
            description:
                "Indulge in creamy and delicious ice cream, available in a range of delightful flavors.",
        },
        {
            imageName: "banner3.jpg",
            title: "Thirst Quenchers",
            description:
                "Stay refreshed with our wide selection of thirst-quenching beverages and drinks.",
        },
        {
            imageName: "banner4.jpg",
            title: "Burger Bliss",
            description:
                "Savor our delectable burgers served with crispy french fries, a classic combo that never disappoints.",
        },
        {
            imageName: "banner5.jpg",
            title: "Coffee Delights",
            description:
                "Enjoy aromatic and freshly brewed coffee to kickstart your day or take a relaxing break.",
        },
        {
            imageName: "banner6.jpg",
            title: "Milk Marvel",
            description:
                "Experience the richness of pure and creamy milk for a wholesome and nutritious treat.",
        },
    ];

    return (
        <div className=" px-2 py-2 banner_ custom-width border border-red-700 rounded">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                grabCursor={true}
                autoplay={{
                    delay: 25000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper rounded-lg"
            >
                {/* Clip path */}

                {/* <ClipPath msg="Home"></ClipPath> */}
                <div>
                    {bannerContent.map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                className="hero min-h-screen"
                                style={{
                                    backgroundImage: `url(/banner/${slide.imageName})`,
                                }}
                            >
                                <div className="hero-overlay bg-opacity-60"></div>
                                <div className="hero-content text-center text-neutral-content">
                                    <div className="max-w-xl">
                                        <h1 className="mb-5 text-3xl md:text-5xl font-bold _text-lite">
                                            {slide.title}
                                        </h1>
                                        <p className="mb-5 text-base md:text-lg _text-lite">
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

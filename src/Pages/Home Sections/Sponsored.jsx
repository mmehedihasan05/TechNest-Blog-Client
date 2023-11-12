/* eslint-disable react/jsx-no-target-blank */

const Sponsored = () => {
    return (
        <div className="space-y-2">
            <h3 className="text-xl md:text-2xl text-center font-semibold">Ads</h3>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 justify-center items-center">
                <div className=" shadow-md p-4 rounded-md">
                    <a
                        target="_blank"
                        href="https://www.meta.com/quest/quest-3/"
                        className="space-y-3"
                    >
                        <img src="/images/vr1.jpg" alt="" />
                        <p>Unwrap mixed reality with Meta Quest 3</p>
                    </a>
                </div>

                <div className=" shadow-md p-4 rounded-md">
                    <a
                        target="_blank"
                        href="https://www.startech.com.bd/sony-playstation-vr2"
                        className="space-y-3"
                    >
                        <img src="/images/vr2.jpg" alt="" />
                        <p>Sony PlayStation VR2</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sponsored;

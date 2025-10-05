import video from "../../../public/V.mp4";
export default function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">

            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/BasmahStore/V.mp4" type="video/mp4" />
            </video>

            {/* المحتوى */}
            <div className="relative z-10 container mx-auto flex flex-col md:flex-row justify-center items-center gap-10 px-6 lg:px-16">
                {/* النصوص */}
                <div className="text-white text-center md:text-left w-full lg:w-1/2 space-y-6 mb-5 relative">
                    <h1 className="leading-tight font-medium">
                        <span className="text-xl sm:text-2xl lg:text-3xl">
                            When
                        </span>{" "}
                        <span className="mb-1 w-16 sm:w-24 lg:w-40 h-0.5 bg-pink-600 inline-block align-middle" />
                        <br />
                        <span className="block mt-2 text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold">
                            You Look Good
                        </span>
                        <br />
                        <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                            You Feel Good
                        </span>
                    </h1>
                </div>
                <span className="w-full lg:w-1/2 relative flex justify-center" />
            </div>
        </section>
    );
}

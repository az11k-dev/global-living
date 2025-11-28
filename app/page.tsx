export default function Home() {
    return (
        <div>
            <div
                className={"relative h-[90vh] w-full bg-[url(/images/home-background.png)] bg-no-repeat bg-cover bg-center flex items-center justify-center"}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className={"z-10 flex-col justify-center items-center"}>
                    <div className={"flex items-center justify-center mb-3"}>
                        <button
                            className="relative text-white text-sm font-medium bg-white/20 backdrop-blur-xl border border-white/50 shadow-2xl px-5 py-2 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-white/30 hover:shadow-white/40">
                            <span className="bg-[#4ADE80] w-2.5 h-2.5 rounded-full inline-block animate-pulse"></span>
                            Live Data: 142 countries updated today
                        </button>
                    </div>
                    <div>
                        <p className={"text-[60px] font-bold text-white text-center leading-16"}>
                            Find Your Place in the <br/><span
                            className={"bg-gradient-to-r from-[#60A5FA] to-[#C084FC] text-transparent bg-clip-text"}>World</span>
                        </p>
                        <p className={"text-white font-light text-xl text-center mt-3"}>
                            Compare living costs, quality of life, and safety across the globe. Let <br/>
                            our AI guide you to your next perfect destination.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
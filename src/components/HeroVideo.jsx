import { motion, AnimatePresence } from "framer-motion";
import React, { useRef } from "react";

export default function HeroVideo({ onPlay,phase, setPhase, content = {} }) {
    const videoRef = useRef(null);
    const bismillah = content.bismillah ?? "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ";
    const inviteLine = content.inviteLine ?? "You are cordially invited";
    const groomName = content.groomName ?? "Bebark";
    const brideName = content.brideName ?? "Hafsa";
    const description = content.description ?? "We would like to invite you to celebrate with us the valima ceremony. It would be an honor to have you present at this important moment.";
    const tapToOpen = content.tapToOpen ?? "Tap to open";
    const scrollText = content.scroll ?? "Scroll";

    const handleTap = () => {
        if (phase !== "closed") return;
        setPhase("playing");
        onPlay?.()
        videoRef.current?.play();
    };

    const handleVideoEnd = () => {
        setTimeout(() => {
        setPhase("ended");
    }, 700);
    };


    return (
        <section
             className={`relative h-[100dvh] w-full overflow-hidden`}
            style={{ backgroundColor: "#1a0a0a" }}
        >
            {/* LAYER 1: Text — always behind everything */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "closed" ? 0 : 1 }}
                transition={{ delay: phase === "playing" ? 1.5 : 0, duration: 0.8 }}
                className="text-primary absolute inset-0 flex items-center flex-col gap-3 justify-center z-2"
            >
                <p className="uppercase text-center tracking-[0.3em] text-xs mb-4 font-lora max-w-[40%]">
                    {bismillah}
                </p>
                <p className="uppercase text-center tracking-[0.3em] text-xs mb-4 font-lora max-w-[45%]">
                    {inviteLine}
                </p>
                <div className="text-center text-primary">

                    <h1 className="text-7xl font-great-vibes">{groomName}</h1>
                    <span className="text-3xl font-great-vibes">&amp;</span>
                    <h1 className="text-7xl font-great-vibes">{brideName}</h1>


                </div>
                <p className="font-lora text-[11px] md:text-sm tracking-[0.12em] uppercase leading-relaxed text-center max-w-[65%] md:max-w-[70%] lg:max-w-[60%]"
                >{description}</p>
            </motion.div>

            {/* LAYER 2: Open curtain image — shown after video ends */}
            <AnimatePresence>
                {phase === "ended" && (
                    <motion.img
                        src="/curtain-open.jpg"
                        className="absolute inset-0 w-full h-full object-cover z-1"
                    />
                )}
            </AnimatePresence>

            {/* LAYER 3: Video — plays on top, hides when ended */}
            <AnimatePresence>
            <motion.video
                ref={videoRef}
                src="/curtain-video.mp4"
                muted
                playsInline
                onEnded={handleVideoEnd}
                className={`absolute inset-0 w-full h-full object-cover z-1  ${
                    phase === "playing" ? "opacity-100" : "opacity-0"
                }`}
                style={{ pointerEvents: "none" }}
                preload={true}
                animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
            />
            </AnimatePresence>

            {/* LAYER 4: Closed curtain with scale-in entrance — like the demo */}
            <AnimatePresence>
                {phase === "closed" && (
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 cursor-pointer"
                        onClick={handleTap}
                    >
                        <img
                            src="/curtain-closed.jpg"
                            className="absolute inset-0 z-30 w-full h-full object-cover"
                            alt="Curtain closed"
                        />
                    </motion.div>
                )}
            </AnimatePresence>


            {/* LAYER 5: Circular play button overlay — like the demo */}
            <AnimatePresence>
                {phase === "closed" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
                    >
                        <div className="relative flex flex-col items-center gap-4">
                            {/* Pulsing ring */}
                            <div className="relative">
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 rounded-full border-2 border-primary/50"
                                    style={{ margin: "-8px" }}
                                />
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm"
                                    style={{
                                        background: "rgba(255,255,255,0.15)",
                                        border: "2px solid rgba(255,255,255,0.3)",
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-8 h-8 text-primary ml-1"
                                    >
                                        <polygon points="6 3 20 12 6 21 6 3" />
                                    </svg>
                                </div>
                            </div>
                            <span
                                className="text-xs uppercase tracking-[0.3em] drop-shadow-lg"
                                style={{ color: "rgba(255,255,255,0.8)" }}
                            >
                                {tapToOpen}
              </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <AnimatePresence>
    {phase === "ended" && (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center cursor-pointer"
            onClick={() => {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                });
            }}
        >
            {/* Arrow animation */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="text-primary"
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </motion.div>

            <span className="text-[10px] tracking-[0.3em] mt-2 text-primary/70 uppercase">
                {scrollText}
            </span>
        </motion.div>
    )}
</AnimatePresence>
        </section>
    )
}

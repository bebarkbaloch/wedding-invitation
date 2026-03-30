import {useEffect,useCallback, useRef, useState,memo} from "react"
import {motion,AnimatePresence} from "framer-motion";
import confetti from "canvas-confetti";

const ScratchCircle = memo(function ScratchCircle({ text, onComplete, overlayImage, circleBg }) {
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const isDone = useRef(false);
    const lastCheck = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.src = overlayImage ?? "/scratch-gold-DQrdz0lH.png";

        img.onload = () => {
            ctx.globalCompositeOperation = "source-over";
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        const getScratchedPercent = () => {
            const { width, height } = canvas;
            const imageData = ctx.getImageData(0, 0, width, height);
            const pixels = imageData.data;

            let cleared = 0;

            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] < 128) cleared++;
            }

            return cleared / (width * height);
        };

        const checkCompletion = () => {
            const now = Date.now();
            if (now - lastCheck.current < 150) return;

            lastCheck.current = now;

            const percent = getScratchedPercent();

            if (percent > 0.6 && !isDone.current) {
                isDone.current = true;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                onComplete?.();
            }
        };

        const scratch = (x, y) => {
            ctx.globalCompositeOperation = "destination-out";

            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.fill();

            checkCompletion();
        };

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();

            if (e.touches) {
                return {
                    x: e.touches[0].clientX - rect.left,
                    y: e.touches[0].clientY - rect.top,
                };
            }

            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const start = () => (isDrawing.current = true);

        const move = (e) => {
            if (!isDrawing.current) return;
            e.preventDefault();

            const { x, y } = getPos(e);
            scratch(x, y);
        };

        const end = () => (isDrawing.current = false);

        // Mouse
        canvas.addEventListener("mousedown", start);
        canvas.addEventListener("mousemove", move);
        canvas.addEventListener("mouseup", end);
        canvas.addEventListener("mouseleave", end);

        // Touch
        canvas.addEventListener("touchstart", start);
        canvas.addEventListener("touchmove", move, { passive: false });
        canvas.addEventListener("touchend", end);

        return () => {
            canvas.removeEventListener("mousedown", start);
            canvas.removeEventListener("mousemove", move);
            canvas.removeEventListener("mouseup", end);
            canvas.removeEventListener("mouseleave", end);

            canvas.removeEventListener("touchstart", start);
            canvas.removeEventListener("touchmove", move);
            canvas.removeEventListener("touchend", end);
        };
    }, [onComplete, overlayImage]);

    return (
        <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden" style={{ backgroundColor: circleBg ?? "#ffffff" }}>
            <div className="absolute inset-0 flex items-center justify-center text-lg text-primary">
                {text}
            </div>

            <canvas
                ref={canvasRef}
                width={80}
                height={80}
                className="absolute inset-0 cursor-pointer rounded-full z-20"
            />
        </div>
    );
});


export default function ScratchDate({ content = {} }) {
    const [completed, setCompleted] = useState(0);
    const [showScrollCta, setShowScrollCta] = useState(false);
    const sectionRef = useRef(null);
    const dateParts = content.dateParts ?? ["9", "April", "2026"];
    const hint = content.hint ?? "Scratch to discover the date";
    const title = content.title ?? "Reveal";
    const revealedLine = content.revealedLine ?? "We're getting married!";
    const scrollText = content.scroll ?? "Scroll";
    const sectionBg = content.theme?.sectionBg ?? "#faf8f5";
    const hintColor = content.theme?.hintColor ?? "rgba(92,32,24,0.6)";
    const revealColor = content.theme?.revealColor ?? "#5C2018";
    const scratchOverlay = content.theme?.scratchOverlay ?? "/scratch-gold-DQrdz0lH.png";
    const circleBg = content.theme?.circleBg ?? "#ffffff";
    const confettiColors = content.theme?.confettiColors ?? ["#5C2018"];

    const handleCircleComplete = useCallback(() => {
        setCompleted((prev) => prev + 1);
    }, []);

    const allRevealed = completed === dateParts.length;
    const popperDuration = 2000;

    // 🔒 Lock scroll when section fully in view
    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current;
            if (!section || allRevealed) return;

            const rect = section.getBoundingClientRect();

            if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
                document.body.style.overflow = "hidden";
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [allRevealed, popperDuration]);

    // 🔓 Unlock scroll after reveal
    useEffect(() => {
        if (allRevealed) {
            const timer = setTimeout(() => {
                document.body.style.overflow = "";
                setShowScrollCta(true);
            }, popperDuration);

            return () => clearTimeout(timer);
        }

        setShowScrollCta(false);
    }, [allRevealed]);

    // 🎉 Confetti
    useEffect(() => {
        if (!allRevealed) return;

        const duration = popperDuration;
        const end = Date.now() + duration;

        const colors = confettiColors;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors,
            });

            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    }, [allRevealed, popperDuration, confettiColors]);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 flex flex-col items-center justify-center text-center h-[100dvh]"
            style={{ background: sectionBg }}
        >
            <p className="mb-6 text-xs tracking-wide font-lora" style={{ color: hintColor }}>
                {hint}
            </p>

            <h2 className="text-5xl text-primary mb-12 font-great-vibes">
                {title}
            </h2>

            <div className="flex justify-center gap-6 font-lora">
                {dateParts.map((part) => (
                    <ScratchCircle key={part} text={part} onComplete={handleCircleComplete} overlayImage={scratchOverlay} circleBg={circleBg} />
                ))}
            </div>

            <AnimatePresence>
                {allRevealed && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mt-12"
                    >
                        <p className="text-2xl font-script" style={{ color: revealColor }}>
                            {revealedLine}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

              {showScrollCta && ( <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center cursor-pointer"
                        onClick={() => {
                            sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
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
                    </motion.div> )}
        </section>
    );
}

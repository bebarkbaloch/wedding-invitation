import {useEffect,useCallback, useRef, useState,memo} from "react"
import useScratch from "../hooks/useScratch"
import {motion,AnimatePresence} from "framer-motion";
import confetti from "canvas-confetti";

const ScratchCircle = memo(function ScratchCircle({ text, onComplete }) {
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const isDone = useRef(false);
    const lastCheck = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.src = "/scratch-gold-DQrdz0lH.png";

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
    }, [onComplete]);

    return (
        <div className="relative w-[80px] h-[80px] bg-white rounded-full overflow-hidden">
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


export default function ScratchDate() {
    const [completed, setCompleted] = useState(0);
    const sectionRef = useRef(null);

    const handleCircleComplete = useCallback(() => {
        setCompleted((prev) => prev + 1);
    }, []);

    const allRevealed = completed === 3;

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
    }, [allRevealed]);

    // 🔓 Unlock scroll after reveal
    useEffect(() => {
        if (allRevealed) {
            const timer = setTimeout(() => {
                document.body.style.overflow = "";
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [allRevealed]);

    // 🎉 Confetti
    useEffect(() => {
        if (!allRevealed) return;

        const duration = 2000;
        const end = Date.now() + duration;

        const colors = ["#5C2018"];

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
    }, [allRevealed]);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 bg-[#faf8f5] flex flex-col items-center justify-center text-center h-screen"
        >
            <p className="mb-6 text-xs tracking-wide text-[rgba(92,32,24,0.6)] font-lora">
                Scratch to discover the date
            </p>

            <h2 className="text-5xl text-primary mb-12 font-great-vibes">
                Reveal
            </h2>

            <div className="flex justify-center gap-6 font-lora">
                <ScratchCircle text="9" onComplete={handleCircleComplete} />
                <ScratchCircle text="April" onComplete={handleCircleComplete} />
                <ScratchCircle text="2026" onComplete={handleCircleComplete} />
            </div>

            <AnimatePresence>
                {allRevealed && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mt-12"
                    >
                        <p className="text-2xl text-[#5C2018] font-script">
                            We're getting married!
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

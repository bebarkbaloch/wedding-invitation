import { useEffect, useRef } from "react";

export default function useScratch(ref, { onComplete, threshold = 0.7 } = {}) {
    const completedRef = useRef(false);
    const lastCheckRef = useRef(0);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        // Load overlay image
        const img = new Image();
        img.src = "/scratch-gold-DQrdz0lH.png";
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        let scratching = false;

        const scratch = (x, y) => {
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fill();

            // Throttle completion check
            const now = performance.now();
            if (now - lastCheckRef.current > 100) {
                lastCheckRef.current = now;
                checkCompletion();
            }
        };

        const checkCompletion = () => {
            if (completedRef.current) return;
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            let transparentPixels = 0;
            for (let i = 3; i < imgData.length; i += 4) {
                if (imgData[i] === 0) transparentPixels++;
            }
            const totalPixels = canvas.width * canvas.height;
            const ratio = transparentPixels / totalPixels;
            if (ratio >= threshold) {
                completedRef.current = true;
                onComplete?.();
            }
        };

        // Mouse events
        canvas.onmousedown = () => (scratching = true);
        canvas.onmouseup = () => (scratching = false);
        canvas.onmousemove = (e) => {
            if (!scratching) return;
            const rect = canvas.getBoundingClientRect();
            scratch(e.clientX - rect.left, e.clientY - rect.top);
        };

        // Touch events
        canvas.ontouchstart = () => (scratching = true);
        canvas.ontouchend = () => (scratching = false);
        canvas.ontouchmove = (e) => {
            if (!scratching) return;
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            scratch(touch.clientX - rect.left, touch.clientY - rect.top);
        };

        return () => {
            canvas.onmousedown = null;
            canvas.onmouseup = null;
            canvas.onmousemove = null;
            canvas.ontouchstart = null;
            canvas.ontouchend = null;
            canvas.ontouchmove = null;
        };
    }, [ref, onComplete, threshold]);
}

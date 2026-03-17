// hooks/useScratchCanvas.js

import { useEffect } from "react"

export default function useScratchCanvas(canvasRef) {

    useEffect(() => {

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        ctx.fillStyle = "#999"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        let scratching = false

        const scratch = (x, y) => {
            ctx.globalCompositeOperation = "destination-out"
            ctx.beginPath()
            ctx.arc(x, y, 15, 0, Math.PI * 2)
            ctx.fill()
        }

        canvas.addEventListener("mousedown", () => scratching = true)
        canvas.addEventListener("mouseup", () => scratching = false)

        canvas.addEventListener("mousemove", e => {

            if (!scratching) return

            const rect = canvas.getBoundingClientRect()

            scratch(
                e.clientX - rect.left,
                e.clientY - rect.top
            )
        })

    }, [])
}

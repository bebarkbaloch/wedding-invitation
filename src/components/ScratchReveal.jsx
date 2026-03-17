import { useRef } from "react"
import useScratchCanvas from "../hooks/useScratchCanvas"

export default function ScratchReveal() {

    const canvasRef = useRef()

    useScratchCanvas(canvasRef)

    return (
        <section className="py-20 text-center">

            <h2 className="text-5xl text-primary mb-6">
                Reveal
            </h2>

            <div className="relative w-32 h-32 mx-auto">

                <div className="absolute inset-0 flex items-center justify-center text-3xl text-primary">
                    10
                </div>

                <canvas
                    ref={canvasRef}
                    width={128}
                    height={128}
                    className="absolute inset-0"
                />

            </div>

        </section>
    )
}

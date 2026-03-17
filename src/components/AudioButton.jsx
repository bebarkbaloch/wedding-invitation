import { useState } from "react"

export default function AudioButton({ audioRef }) {

    const [playing, setPlaying] = useState(true)

    const toggle = () => {
        if (!audioRef.current) return

        if (playing) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }

        setPlaying(!playing)
    }

    return (
        <>
            <audio
                ref={audioRef}
                src="/intro-music.mp3"
                loop
            />

            <button
                onClick={toggle}
                className="fixed z-100 bottom-6 right-6 !bg-primary text-white w-14 h-14 rounded-full"
            >
                {playing ? "🔊" : "🔇"}
            </button>
        </>
    )
}

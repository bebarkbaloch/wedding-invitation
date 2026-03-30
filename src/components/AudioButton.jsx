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
                src="/New_Wedding_Nasheed_Music.mp3"
                loop
            />

            <button
                onClick={toggle}
                className={`fixed z-100 bottom-6 right-6 w-14 h-14 !rounded-full grid place-items-center transition-colors ${
                    playing ? "!bg-primary text-white" : "bg-white border border-primary"
                }`}
            >
                {playing ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                        style={{ color: "white" }}
                    >
                        <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                        <path d="M16 9a5 5 0 0 1 0 6" />
                        <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                        style={{ color: "rgb(92, 32, 24)" }}
                    >
                        <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                        <line x1="22" x2="16" y1="9" y2="15" />
                        <line x1="16" x2="22" y1="9" y2="15" />
                    </svg>
                )}
            </button>
        </>
    )
}

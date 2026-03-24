import { Howl } from "howler"
import React, { useState } from "react"

const sound = new Howl({
    src: ["/assets/New_Wedding_Nasheed_Music.mp3"],
    loop: true
})

export default function AudioControl() {

    const [playing, setPlaying] = useState(false)

    const toggle = () => {

        if (playing) sound.pause()
        else sound.play()

        setPlaying(!playing)
    }

    return (
        <button
            onClick={toggle}
            className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full"
        >
            {playing ? "Mute" : "Play"}
        </button>
    )
}

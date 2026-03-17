import HeroVideo from "./components/HeroVideo"
import ScratchDate from "./components/ScratchDate"
import CountDown from "./components/CountDown"
import Venue from "./components/Venue"
import ThankYou from "./components/ThankYou"
import AudioButton from "./components/AudioButton"
import {useRef,useState} from "react";

export default function App() {
    const [phase, setPhase] = useState("closed");
    const audioRef = useRef(null)

    const playAudio = () => {
        audioRef.current?.play().catch(() => {})
    }

    return (
        <main className="bg-black min-h-screen w-full">

            <div className="max-w-[375px] w-full bg-white relative mx-auto">

            <AudioButton audioRef={audioRef} />

            <HeroVideo onPlay={playAudio} phase={phase} setPhase={setPhase} />
         
             {phase === "ended" && (
                <>
             <ScratchDate />

            <CountDown target="2026-04-09T16:00:00" />

            <Venue />

            <ThankYou />
             </>)}
            

            </div>

        </main>
    )
}

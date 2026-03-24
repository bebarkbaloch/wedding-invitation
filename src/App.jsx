import HeroVideo from "./components/HeroVideo"
import ScratchDate from "./components/ScratchDate"
import CountDown from "./components/CountDown"
import Venue from "./components/Venue"
import ThankYou from "./components/ThankYou"
import AudioButton from "./components/AudioButton"
import {useRef,useState} from "react";
import { useLocation } from "react-router-dom";
import invitationText from "./content/invitationText.json";


export default function App() {
    const [phase, setPhase] = useState("closed");
    const audioRef = useRef(null)
    const { pathname } = useLocation();
    const eventKey = pathname.includes("baraat") ? "baraat" : "valima";
    const content = invitationText.events[eventKey];

    const playAudio = () => {
        audioRef.current?.play().catch(() => {})
    }

    return (
        <main className="bg-black min-h-screen w-full">

            <div className="max-w-[375px] w-full bg-white relative mx-auto">

            <AudioButton audioRef={audioRef} />

            <HeroVideo
                onPlay={playAudio}
                phase={phase}
                setPhase={setPhase}
                content={content.hero}
            />
         
             {phase === "ended" && (
                <>
             <ScratchDate content={content.scratchDate} />

            <CountDown
                target={content.countdown.target}
                title={content.countdown.title}
            />

            <Venue content={content.venue} />

            <ThankYou content={content.thankYou} />
             </>)}
            

            </div>
            
        </main>
    )
}

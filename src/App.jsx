import HeroVideo from "./components/HeroVideo"
import ScratchDate from "./components/ScratchDate"
import CountDown from "./components/CountDown"
import Venue from "./components/Venue"
import MehndiVenue from "./components/MehndiVenue"
import ThankYou from "./components/ThankYou"
import AudioButton from "./components/AudioButton"
import {useRef,useState} from "react";
import { useLocation } from "react-router-dom";
import invitationText from "./content/invitationText.json";


export default function App() {
    const [phase, setPhase] = useState("closed");
    const audioRef = useRef(null)
    const { pathname } = useLocation();
    const eventKey = pathname.includes("mehndi") ? "mehndi" : pathname.includes("baraat") ? "baraat" : "valima";
    const content = invitationText.events[eventKey];
    const primaryColor = content.theme?.primary ?? "#5C2018";
    const secondaryColor = content.theme?.secondary ?? "#FAF8F5";
    const shellColor = content.theme?.shell ?? "#000000";

    const playAudio = () => {
        audioRef.current?.play().catch(() => {})
    }

    return (
        <main className="min-h-screen w-full" style={{ backgroundColor: shellColor }}>

            <div className="max-w-[375px] w-full bg-white relative mx-auto" style={{ "--color-primary": primaryColor, "--color-secondary": secondaryColor }}>

            <AudioButton audioRef={audioRef} />

            <HeroVideo
                onPlay={playAudio}
                phase={phase}
                setPhase={setPhase}
                content={content.hero}
                isMehndi={eventKey === "mehndi"}
            />
         
             {phase === "ended" && (
                <>
             <ScratchDate content={content.scratchDate} />

            <CountDown
                target={content.countdown.target}
                title={content.countdown.title}
            />

            {eventKey === "mehndi" ? <MehndiVenue content={content.venue} /> : <Venue content={content.venue} />}

            <ThankYou content={content.thankYou} />
             </>)}
            

            </div>
            
        </main>
    )
}

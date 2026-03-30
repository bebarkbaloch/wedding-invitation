import { motion } from "framer-motion";
import ornateFrame from "../assets/ornate-frame-new-Dtm38pwt.png";
import venueIllustration from "../assets/finca-biniagual-illustration-v5DD0Tq2.png";

function formatUtcStamp(value) {
    if (!value) return "";
    return value.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function makeIcsFile({ title, start, end, location, description }) {
    const body = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        `DTSTAMP:${formatUtcStamp(new Date().toISOString())}`,
        `DTSTART:${formatUtcStamp(start)}`,
        `DTEND:${formatUtcStamp(end)}`,
        `SUMMARY:${title}`,
        `LOCATION:${location}`,
        `DESCRIPTION:${description}`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");

    return new Blob([body], { type: "text/calendar;charset=utf-8" });
}

export default function MehndiVenue({ content = {} }) {
    const title = content.title ?? "The Details";
    const subtitle = content.subtitle ?? "Everything you need to know";
    const sectionHeading = content.sectionHeading ?? "Location";
    const name = content.name ?? "The Saffron Courtyard";
    const timeText = content.timeText ?? "From 8:00 PM till late";
    const addressLine1 = content.addressLine1 ?? "Main Rashid Minhas Road";
    const addressLine2 = content.addressLine2 ?? "Gulshan-e-Iqbal, Karachi";
    const illustration = content.illustration ?? "/venue-illustration-DebdGS8I.png";
    const mapQuery = content.mapQuery ?? `${name} ${addressLine1} ${addressLine2}`;
    const mapsUrl = content.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
    const startIso = content.calendarStart ?? "2026-04-06T20:00:00Z";
    const endIso = content.calendarEnd ?? "2026-04-07T00:30:00Z";
    const primaryColor = content.theme?.primary ?? "#2e5e2c";

    const handleCalendarClick = () => {
        const calendarBlob = makeIcsFile({
            title: `Mehndi - ${name}`,
            start: startIso,
            end: endIso,
            location: `${addressLine1}, ${addressLine2}`,
            description: "Join us for a colorful Pakistani Mehndi evening.",
        });

        const downloadUrl = URL.createObjectURL(calendarBlob);
        const anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = "mehndi-invitation.ics";
        anchor.click();
        URL.revokeObjectURL(downloadUrl);
    };

    return (
        <section className={`bg-[${content.theme?.secondary ?? "#e8e5d9"}]`}>
            <div className="max-w-4xl mx-auto px-6 pt-0 pb-0">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <img src="/SimbaWithFlowers.png" alt="Couple dancing illustration" className="w-36 mx-auto mb-4"></img>
                    <h2 className="font-great-vibes text-5xl md:text-6xl mb-3 text-primary">{title}</h2>
                    <p className="text-sm font-lora tracking-widest uppercase text-primary/80">{subtitle}</p>
                </motion.div>
            </div>
             <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="w-full flex flex-col items-center"
            >
                <div className="relative w-full max-w-md mx-auto">
                    <img src={ornateFrame} alt="" className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0" />
                    <div className="relative z-10 m-[16%] bg-white/95 backdrop-blur-sm pt-5 pb-0 px-4 md:pt-6 md:px-5 rounded-[2.5rem] text-center overflow-hidden">
                        <h3 className="font-great-vibes text-4xl md:text-5xl mb-3 text-primary">{sectionHeading}</h3>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-lg uppercase tracking-widest text-primary">{name}</span>
                            </div>

                            <div className="flex items-center justify-center gap-2 mt-3 text-primary/70" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span className="font-lora text-sm font-semibold text-primary/80">{timeText}</span>
                            </div>

                            <p className="text-xs uppercase tracking-wider text-primary/80" >{addressLine1}</p>
                            <p className="text-xs uppercase tracking-wider text-primary/80" >{addressLine2}</p>
                        </div>

                        <div className="-mx-5 md:-mx-6">
                            <img src={venueIllustration} alt={`${name} illustration`} className="w-full" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-3 justify-center mt-6 mb-10 px-4">
                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary inline-flex items-center justify-center h-9 rounded-md px-3 gap-2 text-sm font-medium !text-white"
                    
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Google Maps
                    </a>

                    <button
                        type="button"
                        onClick={handleCalendarClick}
                        className="bg-primary inline-flex items-center justify-center h-9 rounded-md px-3 gap-2 text-sm font-medium bg-[#d79a21] hover:bg-[#d79a21]/90  !text-white"
                    
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path>
                        </svg>
                        Calendar
                    </button>
                </div>
            </motion.div>
        </section>
    );
}

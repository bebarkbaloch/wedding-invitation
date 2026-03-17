import useCountdown from "../hooks/useCountdown"

export default function CountDown({ target }) {

    const time = useCountdown(target)

    return (
        <section className="py-24 text-center">

            <h2 className="text-5xl text-primary mb-10">
                Countdown
            </h2>

            <div className="flex justify-center gap-6">

                {Object.entries(time).map(([key, val]) => (

                    <div key={key}>
                        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border rounded-lg mb-2 text-3xl text-primary">
                            {val}
                        </div>

                        <div className="uppercase text-xs mt-2 text-primary">
                            {key}
                        </div>
                    </div>

                ))}

            </div>

        </section>
    )
}

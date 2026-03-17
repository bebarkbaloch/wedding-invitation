// hooks/useCountdown.js

import { useEffect, useState } from "react"
import { differenceInSeconds } from "date-fns"

export default function useCountdown(targetDate) {

    const calculate = () => {

        const diff = differenceInSeconds(new Date(targetDate), new Date())

        return {
            days: Math.floor(diff / (3600 * 24)),
            hours: Math.floor(diff / 3600) % 24,
            minutes: Math.floor(diff / 60) % 60,
            seconds: diff % 60
        }
    }

    const [time, setTime] = useState(calculate())

    useEffect(() => {

        const interval = setInterval(() => {
            setTime(calculate())
        }, 1000)

        return () => clearInterval(interval)

    }, [])

    return time
}

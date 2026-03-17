import { motion } from "framer-motion"
import React from "react";

export default function Venue() {
    return (
        <section className="bg-white flex flex-col items-center justify-start pt-16 pb-20 px-6">

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center mb-6"
            >
                <p className="text-sm tracking-[0.2em] uppercase text-primary">
                    The celebration will take place at
                </p>
            </motion.div>

            {/* Illustration */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
                className="relative max-w-2xl w-full mb-10"
            >
                <img
                    src="/venue-illustration-DebdGS8I.png"
                    alt="Venue Illustration"
                    className="w-full h-auto"
                />

            </motion.div>

            {/* Venue Name */}
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl text-primary text-center mb-4"
            >
                The Grand Marquee
            </motion.h2>

            {/* Address */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center mb-6"
            >
                <p className="text-xs tracking-[0.2em] uppercase text-primary">
                    CL-7,14 Fatima Jinnah Rd, Civil Lines
                </p>

                <p className="text-xs tracking-[0.2em] uppercase text-primary">
                     Karachi Cantonment, Karachi
                </p>
            </motion.div>

            {/* Date */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl text-primary mb-4"
            >
                April 09, 2026
            </motion.p>

            {/* Reception text */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="text-3xl text-primary font-serif"
            >
                Reception to Follow
            </motion.p>

        </section>
    )
}

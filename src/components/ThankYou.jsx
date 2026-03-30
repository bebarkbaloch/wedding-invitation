import { motion } from "framer-motion"
import flowerBouquet from "../assets/flower-bouquet-Cd59z_hq.png"

export default function ThankYou({ content = {} }) {
    const title = content.title ?? "Thank You";
    const message = content.message ?? "For joining us on this special day. Your presence is the best gift we could receive.";
    const signature = content.signature ?? "Bebark & Hafsa";
    const caption = content.caption ?? "developed by Bebark";

    return (
        <section className="pt-20 bg-white flex items-center justify-center  flex-col px-6">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative max-w-md w-full"
            >

                {/* Outer card */}
                <div className="bg-primary rounded-3xl p-6">

                    {/* Inner card */}
                    <div className="bg-white rounded-2xl py-16 px-8 text-center">

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-4xl text-primary mb-6"
                        >
                            {title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-base text-primary mb-6 leading-relaxed"
                        >
                            {message}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="text-2xl text-primary font-serif"
                        >
                            {signature}
                        </motion.p>

                    </div>

                </div>

                <img
                    src={flowerBouquet}
                    alt="Flower bouquet decoration"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-3 z-10 w-46 md:w-46 pointer-events-none"
                />

            </motion.div>

            <p className="text-xs text-primary/70 text-center mt-10 mb-2 w-full">
                {caption}
            </p>

        </section>
    )
}

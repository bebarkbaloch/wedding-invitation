import { motion } from "framer-motion"

export default function ThankYou() {
    return (
        <section className="py-20 bg-white flex items-center justify-center px-6">

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
                            Thank You
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-base text-primary mb-6 leading-relaxed"
                        >
                            For joining us on this special day. Your presence is the best gift we could receive.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="text-2xl text-primary font-serif"
                        >
                            Bebark & Hafsa
                        </motion.p>

                    </div>

                </div>

            </motion.div>

        </section>
    )
}

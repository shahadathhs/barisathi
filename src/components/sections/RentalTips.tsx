"use client";

import { rentalTips } from "@/constant/rentalTips";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";

export default function RentalTips() {
  return (
    <section className="px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Tips for Renting</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {rentalTips.map((tip, index) => (
          <motion.div
            key={nanoid()}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: index * 0.4,
            }}
            className="p-5 shadow rounded-lg border-l-4 border-primary"
          >
            <h3 className="text-xl font-semibold">{tip.title}</h3>
            <p className="text-gray-400 mt-2">{tip.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

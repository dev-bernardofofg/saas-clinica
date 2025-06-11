"use client";

import { motion } from "framer-motion";
import React from "react";

interface FadeProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export const Fade = ({
  children,
  duration = 0.3,
  delay = 0,
  direction,
  distance = 50,
}: FadeProps) => {
  const getDirectionalAnimation = () => {
    if (!direction) return {};

    const directionMap = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
    };

    return directionMap[direction];
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...getDirectionalAnimation(),
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      exit={{
        opacity: 0,
        ...getDirectionalAnimation(),
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
      className="w-full space-y-4"
    >
      {children}
    </motion.div>
  );
};

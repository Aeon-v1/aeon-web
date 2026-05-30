"use client";

import React, { ElementType } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface TimelineContentProps {
  children: React.ReactNode;
  animationNum: number;
  customVariants?: any;
  timelineRef?: React.RefObject<HTMLDivElement>;
  className?: string;
  as?: ElementType;
}

export function TimelineContent({
  children,
  animationNum,
  customVariants,
  timelineRef,
  className,
  as: Component = "div",
}: TimelineContentProps) {
  const isInView = useInView(timelineRef as React.RefObject<HTMLElement>, {
    once: true,
    margin: "-10%",
  });

  const variants = customVariants || {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
    hidden: { y: 20, opacity: 0 },
  };

  const MotionComponent = motion(Component as any);

  return (
    <MotionComponent
      custom={animationNum}
      initial="hidden"
      animate="visible"
      variants={variants as Variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

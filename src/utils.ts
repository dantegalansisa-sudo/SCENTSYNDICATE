export const EASE = {
  premium: [0.76, 0, 0.24, 1],
  smooth: [0.25, 0.8, 0.25, 1],
  cinematic: [0.86, 0, 0.07, 1],
  out: [0.16, 1, 0.3, 1],
} as const;

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const rise = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE.out } },
};

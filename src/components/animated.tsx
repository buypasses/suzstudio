'use client'

import { motion, useInView } from 'motion/react'
import { useRef, ReactNode, useState, useEffect } from 'react'

// Cinematic easing curve used across all animations
const CINEMATIC_EASE: [number, number, number, number] = [0.25, 0.4, 0.25, 1]

// Custom hook that returns true if element is in view OR already visible/scrolled past
// Also returns whether we should skip animation (element was visible on mount)
// IMPORTANT: Returns skipAnimation=true by default to prevent layout issues on initial render
const useInViewOrPast = (ref: React.RefObject<HTMLElement>): { isVisible: boolean; skipAnimation: boolean } => {
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  // Start with skipAnimation=true to prevent layout shift on initial render
  const [mountState, setMountState] = useState<{ checked: boolean; shouldAnimate: boolean }>({
    checked: false,
    shouldAnimate: false // Default: don't animate (show content immediately)
  })

  useEffect(() => {
    // Check on mount if element is below the viewport (should animate in)
    if (ref.current && !mountState.checked) {
      const rect = ref.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      // Only animate if element is BELOW the viewport
      const isBelowViewport = rect.top > viewportHeight
      setMountState({
        checked: true,
        shouldAnimate: isBelowViewport
      })
    }
  }, [ref, mountState.checked])

  return {
    isVisible: isInView || !mountState.shouldAnimate,
    skipAnimation: !mountState.shouldAnimate
  }
}

// Cinematic fade-in from below
export const FadeInUp = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
}: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) => {
  const ref = useRef(null)
  const { isVisible, skipAnimation } = useInViewOrPast(ref)

  return (
    <motion.div
      ref={ref}
      initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: skipAnimation ? 0 : duration,
        delay: skipAnimation ? 0 : delay,
        ease: CINEMATIC_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Cinematic fade-in from left
export const FadeInLeft = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
}: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) => {
  const ref = useRef(null)
  const { isVisible, skipAnimation } = useInViewOrPast(ref)

  return (
    <motion.div
      ref={ref}
      initial={skipAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
      transition={{
        duration: skipAnimation ? 0 : duration,
        delay: skipAnimation ? 0 : delay,
        ease: CINEMATIC_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Cinematic fade-in from right
export const FadeInRight = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
}: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) => {
  const ref = useRef(null)
  const { isVisible, skipAnimation } = useInViewOrPast(ref)

  return (
    <motion.div
      ref={ref}
      initial={skipAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
      transition={{
        duration: skipAnimation ? 0 : duration,
        delay: skipAnimation ? 0 : delay,
        ease: CINEMATIC_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Cinematic scale reveal
export const ScaleReveal = ({
  children,
  delay = 0,
  duration = 1,
  className = '',
}: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) => {
  const ref = useRef(null)
  const { isVisible, skipAnimation } = useInViewOrPast(ref)

  return (
    <motion.div
      ref={ref}
      initial={skipAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        duration: skipAnimation ? 0 : duration,
        delay: skipAnimation ? 0 : delay,
        ease: CINEMATIC_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger children animation
export const StaggerContainer = ({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = '',
}: {
  children: ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
}) => {
  const ref = useRef(null)
  const { isVisible, skipAnimation } = useInViewOrPast(ref)

  return (
    <motion.div
      ref={ref}
      initial={skipAnimation ? 'visible' : 'hidden'}
      animate={isVisible ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: skipAnimation ? 0 : delay,
            staggerChildren: skipAnimation ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger item
export const StaggerItem = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: CINEMATIC_EASE,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Magnetic hover effect (desktop only to not interfere with mobile scroll)
export const MagneticHover = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`touch-manipulation ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Hero text animation with blur
export const HeroText = ({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 1,
        delay,
        ease: CINEMATIC_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Cinematic image reveal with mask
export const ImageReveal = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}) => {
  const ref = useRef(null)
  const { isVisible, skipAnimation } = useInViewOrPast(ref)

  const getInitialClip = () => {
    switch (direction) {
      case 'up':
        return 'inset(100% 0 0 0)'
      case 'down':
        return 'inset(0 0 100% 0)'
      case 'left':
        return 'inset(0 100% 0 0)'
      case 'right':
        return 'inset(0 0 0 100%)'
      default:
        return 'inset(100% 0 0 0)'
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={skipAnimation ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: getInitialClip() }}
      animate={isVisible ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: getInitialClip() }}
      transition={{
        duration: skipAnimation ? 0 : 1.2,
        delay: skipAnimation ? 0 : delay,
        ease: CINEMATIC_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated gradient border - smooth color cycling
export const AnimatedGradientBorder = ({
  children,
  className = '',
  borderRadius = 'rounded-2xl',
  padding = 'p-2 sm:p-3 lg:p-4',
}: {
  children: ReactNode
  className?: string
  borderRadius?: string
  padding?: string
}) => {
  return (
    <motion.div
      className={`relative ${borderRadius} ${padding} ${className}`}
      style={{
        background: 'linear-gradient(135deg, #FFC643, #D2B68A, #A29587, #FFC643)',
        backgroundSize: '300% 300%',
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.div>
  )
}

// Export motion for direct use
export { motion }

'use client'

import Link from 'next/link'
import { useRef, useEffect, useState, useCallback } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  ImageReveal,
  HeroText,
  MagneticHover,
} from '@/components/animated'

const workImages = [
  { src: '/images/gallery/IMG_0251.JPG', alt: 'Event Photo 1' },
  { src: '/images/gallery/IMG_0910.JPG', alt: 'Event Photo 2' },
  { src: '/images/gallery/IMG_0911.JPG', alt: 'Event Photo 3' },
  { src: '/images/gallery/IMG_0912.JPG', alt: 'Event Photo 4' },
  { src: '/images/gallery/IMG_0913.JPG', alt: 'Event Photo 5' },
  { src: '/images/gallery/IMG_0914.JPEG', alt: 'Event Photo 6' },
  { src: '/images/gallery/IMG_0915.JPEG', alt: 'Event Photo 7' },
  { src: '/images/gallery/IMG_0682.jpg', alt: 'Event Photo 8' },
]

const workVideos = [
  { src: '/images/videos/IMG_0680.MP4', alt: 'Event Highlight' },
  { src: '/images/videos/event-1.mp4', alt: 'Event Highlight' },
  { src: '/images/videos/event-2.mp4', alt: 'Event Highlight' },
  { src: '/images/videos/event-3.mp4', alt: 'Event Highlight' },
  { src: '/images/videos/event-4.mp4', alt: 'Event Highlight' },
  { src: '/images/videos/event-5.mp4', alt: 'Event Highlight' },
  { src: '/images/videos/event-6.mp4', alt: 'Event Highlight' },
  { src: '/images/videos/event-7.mp4', alt: 'Event Highlight' },
  { src: '/images/videos/event-8.mp4', alt: 'Event Highlight' },
  { src: '/images/videos/event-9.mp4', alt: 'Event Highlight' },
  { src: '/images/videos/event-10.mp4', alt: 'Event Highlight' },
  { src: '/images/videos/event-11.mp4', alt: 'Event Highlight' },
  { src: '/images/videos/event-12.mp4', alt: 'Event Highlight' },
]

function VideoGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  // Toggle pause/play for active video
  const togglePause = useCallback(() => {
    const currentVideo = videoRefs.current[activeIndex]
    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play()
        setIsPaused(false)
      } else {
        currentVideo.pause()
        setIsPaused(true)
      }
    }
  }, [activeIndex])

  // Toggle mute/unmute
  const toggleMute = useCallback(() => {
    const currentVideo = videoRefs.current[activeIndex]
    if (currentVideo) {
      currentVideo.muted = !currentVideo.muted
      setIsMuted(currentVideo.muted)
    }
  }, [activeIndex])

  // Check screen size for responsive carousel sizing
  const [screenWidth, setScreenWidth] = useState(0)
  useEffect(() => {
    const checkScreenSize = () => {
      setScreenWidth(window.innerWidth)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Handle video end - cycle to next
  const handleVideoEnd = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % workVideos.length)
  }, [])

  // Navigate to previous/next video
  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + workVideos.length) % workVideos.length)
  }, [])

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % workVideos.length)
  }, [])

  // Handle wheel scroll on carousel - only for horizontal scroll (trackpad), allow vertical page scroll
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Only handle horizontal scrolls, let vertical scrolls pass through for page scrolling
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
      e.preventDefault()
      if (e.deltaX > 0) goToNext()
      else goToPrev()
    }
    // Don't prevent default for vertical scrolls - allow page scrolling
  }, [goToNext, goToPrev])

  // Touch/drag handling - only for horizontal swipes, allow vertical scroll
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false)

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    } else {
      setDragStart({ x: e.clientX, y: e.clientY })
    }
    setIsDragging(true)
    setIsHorizontalSwipe(false)
  }, [])

  const handleDragMove = useCallback((e: React.TouchEvent) => {
    if (!dragStart || isHorizontalSwipe) return
    const deltaX = Math.abs(e.touches[0].clientX - dragStart.x)
    const deltaY = Math.abs(e.touches[0].clientY - dragStart.y)
    // If horizontal movement is greater, it's a swipe - prevent scroll
    if (deltaX > deltaY && deltaX > 10) {
      setIsHorizontalSwipe(true)
    }
  }, [dragStart, isHorizontalSwipe])

  const handleDragEnd = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart === null) return
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
    const diff = dragStart.x - clientX

    // Only navigate if it was a horizontal swipe
    if (isHorizontalSwipe && Math.abs(diff) > 50) {
      if (diff > 0) goToNext()
      else goToPrev()
    }

    setDragStart(null)
    setIsDragging(false)
    setIsHorizontalSwipe(false)
  }, [dragStart, isHorizontalSwipe, goToNext, goToPrev])


  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Manage video playback and audio based on active state
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return

      if (i === activeIndex) {
        // Active video: respect mute state, ensure playing unless paused
        video.muted = isMuted
        if (isVisible && !isPaused) {
          video.play().catch(() => {
            // Autoplay with sound might be blocked, try muted
            video.muted = true
            setIsMuted(true)
            video.play().catch(() => {})
          })
        }
      } else {
        // Non-active videos: keep playing but muted
        video.muted = true
        video.play().catch(() => {})
      }
    })
  }, [activeIndex, isVisible, isMuted, isPaused])

  // Reset pause state when changing videos
  useEffect(() => {
    setIsPaused(false)
  }, [activeIndex])

  // Calculate circular distance (for looping)
  const getCircularDistance = (index: number) => {
    const total = workVideos.length
    const directDistance = index - activeIndex

    // Calculate the shortest path (could go left or right around the circle)
    if (Math.abs(directDistance) <= total / 2) {
      return directDistance
    }
    // Wrap around
    if (directDistance > 0) {
      return directDistance - total
    }
    return directDistance + total
  }

  // Calculate opacity based on circular distance from active
  const getOpacity = (index: number) => {
    const distance = Math.abs(getCircularDistance(index))
    if (distance === 0) return 1
    if (distance === 1) return 0.6
    if (distance === 2) return 0.3
    return 0.15
  }

  // Calculate scale based on circular distance from active
  const getScale = (index: number) => {
    const distance = Math.abs(getCircularDistance(index))
    if (distance === 0) return 1
    if (distance === 1) return 0.9
    return 0.8
  }

  // Responsive video sizing based on screen width
  const getVideoWidth = () => {
    if (screenWidth < 480) return 225  // Very small mobile
    if (screenWidth < 640) return 260  // Small mobile
    if (screenWidth < 768) return 300  // Mobile
    if (screenWidth < 1024) return 375 // Tablet
    return 456 // Desktop (5% reduction from 480)
  }

  // Calculate X position for centered looping carousel
  const getXPosition = (index: number) => {
    const circularPos = getCircularDistance(index)
    const videoWidth = getVideoWidth() + 16 // width + gap
    return circularPos * videoWidth
  }

  // Responsive carousel height
  const getCarouselHeight = () => {
    if (screenWidth < 480) return 450
    if (screenWidth < 640) return 525
    if (screenWidth < 768) return 600
    if (screenWidth < 1024) return 750
    return 893 // Desktop (5% reduction from 940)
  }

  // Always show carousel view (removed mobile stacked view)
  // Render loading state while measuring screen
  if (screenWidth === 0) {
    return (
      <div className="relative h-[300px] flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  // Carousel view for all screen sizes
  return (
    <div ref={containerRef} className="relative">
      {/* Centered Looping Carousel */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ height: getCarouselHeight(), touchAction: 'pan-y' }}
        onWheel={handleWheel}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Navigation Arrows - hidden on small screens */}
        <button
          onClick={goToPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label="Previous video"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label="Next video"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleMute()
          }}
          className="absolute bottom-4 right-2 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>

        <div className="absolute inset-0 flex items-center justify-center">
          {workVideos.map((video, i) => {
            const xPos = getXPosition(i)
            const absDistance = Math.abs(getCircularDistance(i))
            // Only render videos within visible range (performance)
            if (absDistance > 4) return null

            return (
              <button
                key={i}
                onClick={() => {
                  if (isDragging) return
                  if (i === activeIndex) {
                    togglePause()
                  } else {
                    setActiveIndex(i)
                  }
                }}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  opacity: getOpacity(i),
                  transform: `translateX(${xPos}px) scale(${getScale(i)})`,
                  zIndex: 10 - absDistance,
                }}
              >
                <div
                  className={`relative aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-xl sm:shadow-2xl transition-all duration-500 ${
                    i === activeIndex ? 'ring-2 sm:ring-4 ring-gold/50' : ''
                  }`}
                  style={{ width: getVideoWidth() }}
                >
                  <video
                    ref={(el) => { videoRefs.current[i] = el }}
                    src={video.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onEnded={handleVideoEnd}
                  />

                  {/* Pause indicator for active video when paused */}
                  {i === activeIndex && isPaused && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Play indicator for non-active */}
                  {i !== activeIndex && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-1 sm:gap-1.5 mt-4 sm:mt-6 px-4">
        {workVideos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-gold w-5 sm:w-6' : 'bg-gold/40 w-1.5 sm:w-2 hover:bg-gold/60'
            }`}
            aria-label={`Go to video ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Work Gallery */}
      <section className="py-4 sm:py-6 lg:py-10 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <FadeInUp>
            <HeroText delay={0.1}>
              <h1 className="heading-display text-3xl sm:text-4xl lg:text-6xl text-center mb-2 sm:mb-4 text-[#263C29]">
                MY WORK
              </h1>
            </HeroText>
          </FadeInUp>

          {/* Video Gallery Section */}
          <FadeInUp delay={0.2}>
            <VideoGallery />
          </FadeInUp>

          {/* Photo Gallery Section */}
          <FadeInUp delay={0.3}>
            <h2 className="heading-display text-2xl lg:text-3xl text-center mt-10 mb-6 text-[#263C29] italic">
              PHOTO GALLERY
            </h2>
          </FadeInUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {workImages.map((image, i) => (
              <div
                key={i}
                className="relative aspect-[9/16] rounded-xl overflow-hidden bg-muted cursor-pointer hover:scale-105 transition-transform duration-500"
                role="img"
                aria-label={image.alt}
                style={{
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-8 lg:py-12 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <HeroText delay={0.1}>
              <h2 className="heading-display text-4xl lg:text-6xl text-[#263C29] italic mb-6">
                LET&apos;S CREATE TOGETHER
              </h2>
            </HeroText>
            <p className="text-lg text-[#263C29]/80 mb-8">
              Ready to capture your next event? Let&apos;s connect and bring your vision to life.
            </p>
            <MagneticHover>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-[#263C29] text-white font-medium tracking-wide rounded-lg hover:bg-[#1a2a1b] transition-colors duration-300"
              >
                GET IN TOUCH
              </Link>
            </MagneticHover>
          </FadeInUp>
        </div>
      </section>

      <Footer />
    </main>
  )
}

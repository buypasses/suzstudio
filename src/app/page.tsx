'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  FadeInLeft,
  FadeInRight,
  ScaleReveal,
  StaggerContainer,
  StaggerItem,
  HeroText,
  ImageReveal,
  MagneticHover,
  AnimatedGradientBorder,
} from '@/components/animated'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section - Text overlaid on image like suzstudio.live */}
      <section className="relative pt-2 pb-4 sm:pt-4 sm:pb-6 lg:pt-4 lg:pb-8">
        <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <ScaleReveal>
            {/* Animated gradient border wrapper */}
            <AnimatedGradientBorder>
              <div className="relative rounded-xl overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]">
                  <Image
                    src="/images/hero-main.jpg"
                    alt="Suzzy Ndiforchu"
                    fill
                    className="object-cover object-center scale-110 -translate-x-[5%]"
                    priority
                  />
                </div>

                {/* Text overlay */}
                <div className="absolute inset-0 p-3 sm:p-6 lg:p-10">
                  {/* Name surrounding head - positioned below face on mobile, beside on desktop */}
                  <div className="absolute left-[3%] sm:left-[5%] lg:left-[6%] right-[8%] sm:right-[4%] lg:right-[5%] top-[48%] sm:top-[38%] flex justify-between items-center">
                    <HeroText delay={0.2}>
                      <h1 className="heading-display text-2xl sm:text-5xl md:text-6xl lg:text-8xl gradient-text-animated gradient-text-stagger-1">
                        SUZZY
                      </h1>
                    </HeroText>
                    <HeroText delay={0.4}>
                      <h1 className="heading-display text-2xl sm:text-5xl md:text-6xl lg:text-8xl gradient-text-animated gradient-text-stagger-2 ml-2 sm:ml-6 lg:ml-8">
                        NDIFORCHU
                      </h1>
                    </HeroText>
                  </div>

                  {/* Lower-right: Tagline */}
                  <div className="absolute top-[75%] sm:top-[75%] right-3 sm:right-6 lg:right-10">
                    <HeroText delay={0.4}>
                      <div className="text-right">
                        <p className="text-cream text-[10px] sm:text-sm lg:text-base tracking-wider uppercase font-medium hero-text-shadow-sm">
                          Videography &amp;
                        </p>
                        <p className="text-cream text-[10px] sm:text-sm lg:text-base tracking-wider uppercase font-medium hero-text-shadow-sm">
                          Live Content Capture
                        </p>
                      </div>
                    </HeroText>
                  </div>
                </div>
              </div>
            </AnimatedGradientBorder>
          </ScaleReveal>
        </div>
      </section>

      {/* About Section */}
      <section className="pt-12 pb-8 lg:pt-20 lg:pb-12 px-6 lg:px-12 bg-[#263C29]">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              {/* Text Content */}
              <FadeInLeft className="lg:w-1/2">
                <div className="float-smooth">
                  <h2 className="heading-display text-4xl lg:text-5xl text-gold italic mb-8">
                    THE CREATOR
                  </h2>
                </div>
                <p className="text-cream/90 text-lg leading-relaxed mb-8">
                  I&apos;m Suzzy! A Los Angeles native currently creating in Washington, DC.
                  I&apos;m a videographer specializing in live content capture, bringing moments
                  to life in real time. I help DJs, event producers, and creatives turn their
                  experiences into high-performing social content that feels authentic,
                  energetic, and Instagram story, Reel, and TikTok ready.
                </p>

                <h3 className="heading-display text-3xl lg:text-4xl text-gold italic mb-6">
                  WHAT I OFFER
                </h3>
                <StaggerContainer staggerDelay={0.1} className="space-y-3 mb-8">
                  {[
                    'Real time posting for Instagram stories',
                    'Clear, quality short form content to reuse for social media (Instagram Reels, TikTok, YouTube Shorts, etc)',
                    'Crowd reactions, emotion and momentum shots',
                    'Quick turn around time for raw footage delivery (less than 24 hours)',
                    'Dropbox or IMessage delivery',
                  ].map((item, i) => (
                    <StaggerItem key={i}>
                      <li className="flex items-start gap-3 text-cream/80 text-lg list-none">
                        <span className="text-gold">•</span>
                        {item}
                      </li>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
                <MagneticHover className="inline-block mb-6">
                  <Link
                    href="/work"
                    className="inline-block text-gold text-xl tracking-wide font-medium border-b-2 border-gold pb-1 hover:text-accent-bright hover:border-accent-bright transition-all duration-300"
                  >
                    CHECK OUT MY WORK
                  </Link>
                </MagneticHover>
              </FadeInLeft>

              {/* Image - use work-portrait-2 which matches original site */}
              <FadeInRight className="lg:w-1/2" delay={0.2}>
                <ImageReveal direction="right">
                  <AnimatedGradientBorder>
                    <div className="relative rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src="/images/work-portrait-2.jpg"
                        alt="Suzzy at an event"
                        width={600}
                        height={750}
                        className="object-cover w-full hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </AnimatedGradientBorder>
                </ImageReveal>
              </FadeInRight>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

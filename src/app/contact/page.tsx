'use client'

import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  HeroText,
  ScaleReveal,
  MagneticHover,
  AnimatedGradientBorder,
} from '@/components/animated'

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Contact Section - Full Height Split */}
      <section className="flex-1 flex items-center justify-center py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Video */}
              <FadeInLeft className="h-full">
                <ScaleReveal className="h-full">
                  <AnimatedGradientBorder>
                    <div className="relative rounded-xl overflow-hidden h-full min-h-[280px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[500px]">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src="/videos/contact-video.mp4" type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                    </div>
                  </AnimatedGradientBorder>
                </ScaleReveal>
              </FadeInLeft>

              {/* Contact Info */}
              <FadeInRight className="flex flex-col items-center md:items-start" delay={0.2}>
                <div className="text-center md:text-left py-4 sm:py-6 md:py-0 flex flex-col h-full justify-evenly gap-6 sm:gap-8 md:gap-10">
                  {/* Heading */}
                  <div>
                    <div className="float-smooth">
                      <HeroText delay={0.1}>
                        <h1 className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#263C29] italic mb-2">
                          LET&apos;S
                        </h1>
                      </HeroText>
                    </div>
                    <div className="float-smooth-delayed">
                      <HeroText delay={0.2}>
                        <h1 className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#263C29] italic">
                          CONNECT!
                        </h1>
                      </HeroText>
                    </div>
                    <FadeInUp delay={0.3}>
                      <p className="text-foreground/70 text-base sm:text-lg max-w-sm mx-auto md:mx-0 mt-4">
                        Ready to capture your next event? Let&apos;s create something amazing together.
                      </p>
                    </FadeInUp>
                  </div>

                  <FadeInUp delay={0.4}>
                    <div className="section-card text-left">
                      <div className="space-y-4 sm:space-y-6">
                        <MagneticHover className="block">
                          <a
                            href="mailto:sndiforchu1@gmail.com"
                            className="group flex items-center gap-3 sm:gap-4"
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300 shadow-sm flex-shrink-0">
                              <Image
                                src="/icons/email-icon.png"
                                alt="Email"
                                width={24}
                                height={24}
                                className="sm:w-7 sm:h-7"
                              />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-xs sm:text-sm tracking-wide text-card-foreground/60 group-hover:text-card-foreground/80 transition-colors duration-300">
                                Email
                              </h3>
                              <span className="text-sm sm:text-lg lg:text-xl text-gold group-hover:text-accent-bright transition-colors duration-300 font-medium break-all">
                                sndiforchu1@gmail.com
                              </span>
                            </div>
                          </a>
                        </MagneticHover>

                        <MagneticHover className="block">
                          <a
                            href="https://instagram.com/suzndiforchu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 sm:gap-4"
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300 shadow-sm flex-shrink-0">
                              <Image
                                src="/icons/instagram-logo.png"
                                alt="Instagram"
                                width={24}
                                height={24}
                                className="sm:w-7 sm:h-7"
                              />
                            </div>
                            <div>
                              <h3 className="text-xs sm:text-sm tracking-wide text-card-foreground/60 group-hover:text-card-foreground/80 transition-colors duration-300">
                                Instagram
                              </h3>
                              <span className="text-sm sm:text-lg lg:text-xl text-gold group-hover:text-accent-bright transition-colors duration-300 font-medium">
                                @suzndiforchu
                              </span>
                            </div>
                          </a>
                        </MagneticHover>

                        <MagneticHover className="block">
                          <a
                            href="https://tiktok.com/@suzstudio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 sm:gap-4"
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300 shadow-sm flex-shrink-0">
                              <Image
                                src="/icons/tiktok-icon.svg"
                                alt="TikTok"
                                width={24}
                                height={24}
                                className="sm:w-7 sm:h-7"
                              />
                            </div>
                            <div>
                              <h3 className="text-xs sm:text-sm tracking-wide text-card-foreground/60 group-hover:text-card-foreground/80 transition-colors duration-300">
                                TikTok
                              </h3>
                              <span className="text-sm sm:text-lg lg:text-xl text-gold group-hover:text-accent-bright transition-colors duration-300 font-medium">
                                @suzstudio
                              </span>
                            </div>
                          </a>
                        </MagneticHover>
                      </div>
                    </div>
                  </FadeInUp>
                </div>
              </FadeInRight>
            </div>
          </div>
        </div>
      </section>

      <Footer className="mt-auto" />
    </main>
  )
}

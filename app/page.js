"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import AiCopilotSection from "@/components/landing/AiCopilotSection";
import ProductShowcase3D from "@/components/landing/ProductShowcase3D";
import ProjectWorkspace from "@/components/landing/ProjectWorkspace";
import AnalyticsSection from "@/components/landing/AnalyticsSection";
import PricingSection from "@/components/landing/PricingSection";
import FaqSection from "@/components/landing/FaqSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";
import CustomCursor from "@/components/animations/CustomCursor";
import LoadingScreen from "@/components/animations/LoadingScreen";
import AiVoiceGreeting from "@/components/landing/AiVoiceGreeting";
import ZoomRevealSection from "@/components/animations/ZoomRevealSection";
import Slide3DSection from "@/components/animations/Slide3DSection";
import StageFoldSection from "@/components/animations/StageFoldSection";
import TopDropSection from "@/components/animations/TopDropSection";
import PortalZoomSection from "@/components/animations/PortalZoomSection";
import Modal from "@/components/ui/Modal";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");

  const handleOpenAuth = (mode = "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleCloseAuth = () => {
    setAuthModalOpen(false);
  };

  const handleNavigate = (target) => {
    const id = typeof target === "string" ? target.replace("#", "") : target;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050b1a] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* 1. Fast Initial Loading Screen with Logo Particle Reveal */}
      <LoadingScreen />

      {/* 2. Desktop Cursor Interaction & Background Glow */}
      <CustomCursor />

      {/* 3. Floating Holographic AI Voice Greeting Engine */}
      <AiVoiceGreeting />

      {/* 4. Floating Sticky Navbar with Sound Toggle */}
      <Navbar onOpenAuth={handleOpenAuth} onNavigate={handleNavigate} />

      {/* Main Experience Journey */}
      <main className="w-full overflow-hidden">
        {/* CHAPTER 01: HERO (3D AI Core Centerpiece & Headline) */}
        <section id="hero" className="w-full relative">
          <HeroSection onOpenAuth={handleOpenAuth} />
        </section>

        {/* CHAPTER 02: STATS */}
        <section id="stats" className="w-full relative">
          <ZoomRevealSection className="w-full">
            <StatsSection />
          </ZoomRevealSection>
        </section>

        {/* CHAPTER 03: HOW IT WORKS */}
        <section id="how-it-works" className="w-full relative">
          <Slide3DSection direction="right" className="w-full">
            <HowItWorksSection onOpenAuth={handleOpenAuth} />
          </Slide3DSection>
        </section>

        {/* CHAPTER 04: FEATURES */}
        <section id="features" className="w-full relative">
          <Slide3DSection direction="left" className="w-full">
            <FeaturesSection onOpenAuth={handleOpenAuth} />
          </Slide3DSection>
        </section>

        {/* CHAPTER 05: AI COPILOT */}
        <section id="ai-copilot" className="w-full relative">
          <TopDropSection className="w-full">
            <AiCopilotSection onOpenAuth={handleOpenAuth} />
          </TopDropSection>
        </section>

        {/* CHAPTER 06: 3D SHOWCASE */}
        <section id="showcase-3d" className="w-full relative">
          <PortalZoomSection className="w-full">
            <ProductShowcase3D onOpenAuth={handleOpenAuth} />
          </PortalZoomSection>
        </section>

        {/* CHAPTER 07: WORKSPACE */}
        <section id="workspace" className="w-full relative">
          <Slide3DSection direction="right" className="w-full">
            <ProjectWorkspace onOpenAuth={handleOpenAuth} />
          </Slide3DSection>
        </section>

        {/* CHAPTER 08: ANALYTICS */}
        <section id="analytics" className="w-full relative">
          <Slide3DSection direction="left" className="w-full">
            <AnalyticsSection onOpenAuth={handleOpenAuth} />
          </Slide3DSection>
        </section>

        {/* CHAPTER 09: PRICING */}
        <section id="pricing" className="w-full relative">
          <ZoomRevealSection className="w-full">
            <PricingSection onOpenAuth={handleOpenAuth} />
          </ZoomRevealSection>
        </section>

        {/* CHAPTER 10: FAQ */}
        <section id="faq" className="w-full relative">
          <TopDropSection className="w-full">
            <FaqSection onOpenAuth={handleOpenAuth} />
          </TopDropSection>
        </section>

        {/* CHAPTER 11: LAUNCHPAD CTA */}
        <section id="cta" className="w-full relative">
          <PortalZoomSection className="w-full">
            <CtaSection onOpenAuth={handleOpenAuth} />
          </PortalZoomSection>
        </section>

        {/* CHAPTER 12: FOOTER */}
        <Footer onOpenAuth={handleOpenAuth} />
      </main>

      {/* Interactive Auth & Onboarding Modal */}
      <Modal
        isOpen={authModalOpen}
        onClose={handleCloseAuth}
        initialMode={authMode}
      />
    </div>
  );
}

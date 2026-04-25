// src/app/(main)/page.tsx
// Server Component — sin 'use client' deliberadamente
// Cada sección se importa como componente independiente

import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import IGDBSection from "@/components/home/IGDBSection";
import PricingSection from "@/components/home/PricingSection";

export default function Home() {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* 01 · Hero */}
      <HeroSection />

      {/* 02 · Funcionalidades */}
      <FeaturesSection />

      {/* 03 · Powered by IGDB */}
      <IGDBSection />

      {/* 04 · Planes */}
      <PricingSection />
    </main>
  );
}

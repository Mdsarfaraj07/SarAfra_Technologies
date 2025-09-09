import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import TechStackSection from '@/components/sections/tech-stack-section';
import ServicesSection from '@/components/sections/services-section';
import PortfolioSection from '@/components/sections/portfolio-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import AboutUsSection from '@/components/sections/about-us-section';
import TeamSection from '@/components/sections/team-section';
import CostEstimatorSection from '@/components/sections/cost-estimator-section';
import PaymentSection from '@/components/sections/payment-section';
import InvoiceHistorySection from '@/components/sections/invoice-history-section';
import AppointmentChatbotSection from '@/components/sections/appointment-chatbot-section';
import SocialMediaSection from '@/components/sections/social-media-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TechStackSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <AboutUsSection />
        <TeamSection />
        <CostEstimatorSection />
        <PaymentSection />
        <InvoiceHistorySection />
        <AppointmentChatbotSection />
        <SocialMediaSection />
      </main>
      <Footer />
    </div>
  );
}

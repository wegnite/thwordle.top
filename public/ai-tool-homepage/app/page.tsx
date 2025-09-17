import { AIToolSection } from '@/components/ai-tool-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { LandingContent } from '@/components/landing-content';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Block 1: Core Tool */}
      <main className="container mx-auto px-4 py-8">
        <AIToolSection />
      </main>

      {/* Block 2: Landing Page Content */}
      <section className="bg-card/50 py-16">
        <div className="container mx-auto px-4">
          <LandingContent />
        </div>
      </section>

      <Footer />
    </div>
  );
}

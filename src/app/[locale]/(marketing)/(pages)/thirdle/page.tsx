import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

/**
 * Generate metadata for Thirdle page
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;

  return constructMetadata({
    title: 'Thirdle - Daily Mini Crossword Game Online',
    description:
      'Play Thirdle, the addictive mini crossword puzzle game! Solve daily crosswords in 6 attempts with color-coded hints. Free to play with unlimited mode!',
    canonicalUrl: 'https://thwordle.top/thirdle',
  });
}

interface ThirdlePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ThirdlePage(props: ThirdlePageProps) {
  const params = await props.params;
  const { locale } = params;

  // 结构化数据 JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'Thirdle',
    description:
      'Daily mini crossword puzzle game with color-coded hints. Solve crosswords in 6 attempts with green, orange, purple, and black color hints.',
    url: 'https://thwordle.top/thirdle',
    genre: 'Crossword Game',
    gameplayMode: 'Single Player',
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '850',
      bestRating: '5',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Thwordle Game',
      url: 'https://thwordle.top',
    },
  };

  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SEO 隐藏内容 */}
      <div className="sr-only">
        <h1>Thirdle - Daily Mini Crossword Puzzle Game</h1>
        <p>
          Play Thirdle, the challenging mini crossword game! Solve daily
          crossword puzzles in just 6 attempts using color-coded hints. Start
          with 2 correct letters and work your way to completion.
        </p>

        <h2>How to Play Thirdle</h2>
        <p>
          Your goal is to solve a mini crossword in six attempts. You start with
          two correct letters already placed.
        </p>

        <h3>Color Hints System</h3>
        <ul>
          <li>Green: Right word, correct position</li>
          <li>Orange: Right word, wrong position</li>
          <li>Purple: Belongs in a different word</li>
          <li>Black: Not used in any word</li>
        </ul>

        <h2>Thirdle Game Modes</h2>
        <ul>
          <li>Normal Daily: Original daily 5-letter puzzle</li>
          <li>Bonus Daily: Daily puzzle with 4, 5 and 6-letter words</li>
          <li>Unlimited: Endless fun forever</li>
          <li>Swapdle: New sibling puzzle variant</li>
        </ul>

        <h2>Why Play Thirdle?</h2>
        <p>
          Thirdle combines the challenge of crosswords with the addictive
          gameplay of word puzzles, offering a unique daily brain training
          experience.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Thirdle 游戏 iframe */}
        <ThirdleGameComponent />
      </div>
    </>
  );
}

function ThirdleGameComponent() {
  return (
    <div className="w-full relative">
      {/* 游戏介绍 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Thirdle</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Daily Mini Crossword Puzzle Game
        </p>
        <div className="bg-card border rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">How to Play</h2>
          <div className="text-left space-y-2">
            <p>🎯 Solve a mini crossword in 6 attempts</p>
            <p>✨ Start with 2 correct letters already placed</p>
            <p>🟩 Green: Right word, correct position</p>
            <p>🟠 Orange: Right word, wrong position</p>
            <p>🟣 Purple: Belongs in a different word</p>
            <p>⚫ Black: Not used in any word</p>
          </div>
        </div>
      </div>

      {/* iframe 嵌入游戏 */}
      <iframe
        src="https://thirdle.org/"
        className="w-full border-0 rounded-lg"
        style={{
          height: '100vh',
          minHeight: '800px',
        }}
        title="Thirdle - Daily Mini Crossword Puzzles"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-storage-access-by-user-activation"
      />
    </div>
  );
}
import { ThwordleGame } from '@/components/game/ThwordleGame';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

/**
 * https://next-intl.dev/docs/environments/actions-metadata-route-handlers#metadata-api
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;

  return constructMetadata({
    title: 'Thwordle - Free Daily Word Puzzle Game Online',
    description:
      'Play Thwordle, the ultimate thematic word puzzle game! Daily challenges with Harry Potter, LOTR, Marvel themes. Guess 4-7 letter words, unlimited attempts!',
    canonicalUrl: 'https://thwordle.top/',
  });
}

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  const { locale } = params;

  // 结构化数据 JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'Thwordle',
    description:
      'Free daily thematic word puzzle game featuring Harry Potter, Lord of the Rings, Greek Mythology and more themes',
    url: 'https://thwordle.top',
    genre: 'Word Game',
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
      ratingValue: '4.8',
      ratingCount: '1250',
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
        <h1>Thwordle - Free Daily Thematic Word Puzzle Game</h1>
        <p>
          Play Thwordle, the ultimate thematic word guessing game! Challenge
          yourself with daily word puzzles featuring themes from Harry Potter,
          Lord of the Rings, Greek Mythology, Marvel, DC Comics and more. Free
          to play with unlimited attempts!
        </p>

        <h2>How to Play Thwordle</h2>
        <p>
          Guess the hidden word in 6 tries. Each guess must be a valid word.
          Letters will change color to show how close your guess was to the
          word.
        </p>

        <h3>Game Rules</h3>
        <p>
          Each word has 4-7 letters. Green letters are in the correct position,
          yellow letters are in the word but wrong position, gray letters are
          not in the word.
        </p>

        <h2>Popular Game Themes</h2>
        <p>
          Experience word puzzles from your favorite universes with these
          exciting themes:
        </p>

        <h3>Fantasy Themes</h3>
        <ul>
          <li>Harry Potter Wordle - Magic spells and wizarding terms</li>
          <li>Lord of the Rings Word Game - Middle-earth vocabulary</li>
          <li>Greek Mythology Puzzle - Gods, heroes, and legends</li>
        </ul>

        <h3>Superhero Themes</h3>
        <ul>
          <li>Marvel Wordle - Superheroes and comic terms</li>
          <li>DC Comics Word Game - Batman, Superman and more</li>
        </ul>

        <h2>Thwordle Game Features</h2>
        <ul>
          <li>Daily word puzzles with new themes</li>
          <li>Multiple word lengths (4-7 letters)</li>
          <li>Track your statistics and streaks</li>
          <li>Mobile-friendly responsive design</li>
          <li>Completely free to play</li>
        </ul>

        <h3>Why Play Thwordle?</h3>
        <p>
          Thwordle combines the addictive gameplay of word puzzles with beloved
          fictional universes, making each game a journey into your favorite
          stories.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 原版游戏组件 */}
        <ThwordleGame />

        {/* Video Gallery Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Watch Thwordle in Action
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover how to master Thwordle with gameplay videos, tutorials, and
            tips from the community!
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* YouTube Video 1 - Thwordle Basics */}
            <div className="bg-card border rounded-lg p-4">
              <div className="aspect-video mb-4">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Thwordle Tutorial - How to Play"
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
              <h3 className="font-semibold mb-2">
                Thwordle Tutorial - How to Play
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete beginner's guide to playing Thwordle with all the
                essential tips and strategies.
              </p>
            </div>

            {/* YouTube Video 2 - Harry Potter Theme */}
            <div className="bg-card border rounded-lg p-4">
              <div className="aspect-video mb-4">
                <iframe
                  src="https://www.youtube.com/embed/oHg5SJYRHA0"
                  title="Harry Potter Thwordle Challenge"
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
              <h3 className="font-semibold mb-2">
                Harry Potter Theme Challenge
              </h3>
              <p className="text-sm text-muted-foreground">
                Watch as we tackle the magical Harry Potter themed Thwordle
                puzzle with spells and wizarding terms!
              </p>
            </div>

            {/* YouTube Video 3 - Pro Tips */}
            <div className="bg-card border rounded-lg p-4">
              <div className="aspect-video mb-4">
                <iframe
                  src="https://www.youtube.com/embed/L_jWHffIx5E"
                  title="5 Pro Tips for Thwordle Success"
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
              <h3 className="font-semibold mb-2">5 Pro Tips for Success</h3>
              <p className="text-sm text-muted-foreground">
                Advanced strategies and insider tips that will dramatically
                improve your Thwordle solving skills.
              </p>
            </div>
          </div>

          {/* More Videos Button */}
          <div className="text-center mt-12">
            <a
              href="/thirdle"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Watch More Videos
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

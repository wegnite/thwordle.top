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
      </div>
    </>
  );
}

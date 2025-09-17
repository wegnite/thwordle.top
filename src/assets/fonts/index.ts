import {
  Bricolage_Grotesque,
  Noto_Sans,
  Noto_Sans_Mono,
  Noto_Serif,
} from 'next/font/google';

/**
 * 1. Fonts Documentation
 * https://mksaas.com/docs/fonts
 *
 * 2. This file shows how to customize the font by using local font or google font
 *
 * [1] use local font
 *
 * - Get font file from https://gwfh.mranftl.com/fonts
 * - Add font file to the assets/fonts folder
 * - Add font variable to the font object
 */
// https://gwfh.mranftl.com/fonts/bricolage-grotesque?subsets=latin
// export const fontBricolageGrotesque = localFont({
//   src: './Bricolage Grotesque-grotesque-v7-latin-regular.woff2',
//   variable: '--font-bricolage-grotesque',
// });

/**
 * [2] use google font
 *
 * - You can browser fonts at Google Fonts
 * https://fonts.google.com
 *
 * - CSS and font files are downloaded at build time and self-hosted with the rest of your static assets.
 * https://nextjs.org/docs/app/building-your-application/optimizing/fonts#google-fonts
 */
// 主要字体 - 用于游戏界面
export const fontNotoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
  weight: ['500', '600', '700'],
  preload: true, // 预加载主要字体
});

// 可选字体 - 仅在需要时加载
export const fontNotoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'optional', // 改为optional，提升首次加载速度
  variable: '--font-noto-serif',
  weight: ['400'],
  preload: false,
});

// 代码字体 - 仅开发页面使用
export const fontNotoSansMono = Noto_Sans_Mono({
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-noto-sans-mono',
  weight: ['400'],
  preload: false,
});

// 装饰字体 - 仅特殊场景使用
export const fontBricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-bricolage-grotesque',
  weight: ['600'], // 减少字重变体
  preload: false,
});

import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Routes } from '@/routes';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function ToolsSection() {
  const t = await getTranslations('ToolsPage');

  const items = [
    {
      title: t('items.wordGame.title'),
      desc: t('items.wordGame.description'),
      href: Routes.AIImage,
    },
    {
      title: t('items.wordLists.title'),
      desc: t('items.wordLists.description'),
      href: Routes.Blog,
    },
    {
      title: t('items.statistics.title'),
      desc: t('items.statistics.description'),
      href: Routes.AIImage,
    },
    {
      title: t('items.hints.title'),
      desc: t('items.hints.description'),
      href: Routes.AIImage,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12" id="tools">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {t('title')}
      </h2>
      <p className="mt-3 text-muted-foreground max-w-3xl">{t('description')}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title} className="p-6 space-y-2 border bg-card/50">
            <h3 className="font-medium text-lg">{it.title}</h3>
            <p className="text-sm text-muted-foreground">{it.desc}</p>
            <Link
              href={it.href}
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'mt-3'
              )}
            >
              {t('cta')}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}

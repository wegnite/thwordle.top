import { cn } from '@/lib/utils';
import Image from 'next/image';

export function MkSaaSLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/mksaas.png"
      alt="Logo of MkSaaS"
      title="Logo of MkSaaS"
      width={32}
      height={32}
      sizes="32px"
      className={cn('size-8 rounded-md', className)}
      loading="lazy"
    />
  );
}

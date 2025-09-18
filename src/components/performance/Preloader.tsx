'use client';

import { useEffect, useMemo } from 'react';

interface PreloaderProps {
  resources?: string[];
}

// 默认关键资源，定义在组件外避免每次重新创建
const DEFAULT_RESOURCES = ['/favicon.ico', '/logo.png'] as const;

export function Preloader({ resources = [] }: PreloaderProps) {
  // 使用 useMemo 避免每次渲染都创建新数组
  const criticalResources = useMemo(
    () => [...DEFAULT_RESOURCES, ...resources],
    [resources]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const addedLinks: HTMLLinkElement[] = [];

    const appendLink = (resource: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';

      if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (
        resource.match(/\.(jpg|jpeg|png|webp|svg)$/) ||
        resource.endsWith('.ico')
      ) {
        link.as = 'image';
      }

      link.href = resource;
      document.head.appendChild(link);
      addedLinks.push(link);
    };

    const schedule = (cb: () => void) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(cb, { timeout: 1500 });
      } else {
        setTimeout(cb, 0);
      }
    };

    schedule(() => {
      criticalResources.forEach(appendLink);

      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
      ];

      preconnectDomains.forEach((domain) => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
        addedLinks.push(link);
      });
    });

    return () => {
      addedLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [criticalResources]);

  return null;
}

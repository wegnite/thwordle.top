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
    const addedLinks: HTMLLinkElement[] = [];

    criticalResources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';

      if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.match(/\.(jpg|jpeg|png|webp|svg)$/)) {
        link.as = 'image';
      } else if (resource.endsWith('.ico')) {
        link.as = 'image';
      }

      link.href = resource;
      document.head.appendChild(link);
      addedLinks.push(link);
    });

    // DNS预连接到常用域名
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

    // 清理函数
    return () => {
      // 移除所有动态添加的链接
      addedLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [criticalResources]);

  return null;
}

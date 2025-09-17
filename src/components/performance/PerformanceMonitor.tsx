'use client';

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // 只在生产环境和客户端启用性能监控
    if (
      process.env.NODE_ENV !== 'production' ||
      typeof window === 'undefined'
    ) {
      return;
    }

    const reportWebVitals = (metric: any) => {
      // 可以发送到分析服务
      console.log(`[Performance] ${metric.name}:`, metric.value);

      // 可选：发送到分析服务（如Google Analytics, Vercel Analytics等）
      if (window.gtag) {
        window.gtag('event', metric.name, {
          custom_parameter_1: metric.value,
          custom_parameter_2: metric.id,
        });
      }
    };

    // 监控Core Web Vitals
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
      onINP(reportWebVitals); // INP替代了FID
    });

    // 监控页面加载时间
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`[Performance] Page loaded in: ${loadTime.toFixed(2)}ms`);
    });
  }, []);

  return null; // 这是一个隐式组件，不渲染任何UI
}

// 声明全局类型
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

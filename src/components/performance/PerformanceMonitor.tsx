'use client';

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (process.env.NODE_ENV !== 'production' || !isClient) {
      return;
    }

    const schedule = (cb: () => void) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(cb, { timeout: 2000 });
      } else {
        setTimeout(cb, 0);
      }
    };

    const startMonitoring = async () => {
      const reportWebVitals = (metric: any) => {
        console.log(`[Performance] ${metric.name}:`, metric.value);

        if (window.gtag) {
          window.gtag('event', metric.name, {
            custom_parameter_1: metric.value,
            custom_parameter_2: metric.id,
          });
        }
      };

      const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
      onCLS(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
      onINP(reportWebVitals);

      window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`[Performance] Page loaded in: ${loadTime.toFixed(2)}ms`);
      });
    };

    schedule(() => {
      void startMonitoring();
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

'use client';

import { useEffect, useState } from 'react';

export function ThwordleGame() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // iframe 加载完成后设置loading为false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full relative">
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 bg-background flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading Thwordle...</p>
          </div>
        </div>
      )}

      {/* 简单提示 */}
      {!isLoading && (
        <div className="mb-4 text-center">
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 max-w-md mx-auto">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 Select your theme and word length, then click PLAY to start the
              game!
            </p>
          </div>
        </div>
      )}

      {/* iframe 嵌入游戏 - 让竞对网站内部处理所有状态切换 */}
      <iframe
        src="https://www.thwordle.com/"
        className="w-full border-0 rounded-lg"
        style={{
          height: '100vh',
          minHeight: '800px',
        }}
        title="Thwordle - Daily Thematic Word Puzzles"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-storage-access-by-user-activation"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

export function ThwordleGame() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'selection' | 'game'>('selection');
  
  // 开始时显示选择页面，用户会看到竞对的主题选择弹窗
  const [iframeUrl, setIframeUrl] = useState('https://www.thwordle.com/');

  useEffect(() => {
    // iframe 加载完成后设置loading为false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 用户完成选择后切换到游戏页面
  const startGame = () => {
    setCurrentView('game');
    setIframeUrl('https://www.thwordle.com/index.html');
    setIsLoading(true);
  };

  // 返回选择页面
  const backToSelection = () => {
    setCurrentView('selection');
    setIframeUrl('https://www.thwordle.com/');
    setIsLoading(true);
  };

  return (
    <div className="w-full relative">
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 bg-background flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              {currentView === 'game' ? '加载游戏中...' : '加载主题选择...'}
            </p>
          </div>
        </div>
      )}

      {/* 状态指示器和提示 */}
      {!isLoading && (
        <div className="mb-4 text-center">
          <div className="text-sm text-muted-foreground mb-2">
            {currentView === 'game' ? '🎮 游戏进行中' : '🎯 选择您的主题和单词长度'}
          </div>
          
          {currentView === 'selection' && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 max-w-md mx-auto">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 在下面选择主题和单词长度，然后点击 PLAY 按钮。选择完成后点击下方的"开始游戏"按钮。
              </p>
            </div>
          )}
        </div>
      )}

      {/* iframe 嵌入游戏 */}
      <iframe
        key={iframeUrl} // 强制重新加载 iframe
        src={iframeUrl}
        className="w-full border-0 rounded-lg"
        style={{
          height: currentView === 'selection' ? '600px' : '100vh',
          minHeight: currentView === 'selection' ? '600px' : '800px',
        }}
        title="Thwordle - Daily Thematic Word Puzzles"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-storage-access-by-user-activation"
        onLoad={() => setIsLoading(false)}
      />

      {/* 控制按钮 */}
      <div className="mt-4 text-center space-x-4">
        {currentView === 'selection' && (
          <button
            onClick={startGame}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            🎮 开始游戏
          </button>
        )}
        
        {currentView === 'game' && (
          <button
            onClick={backToSelection}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            🔙 重新选择主题
          </button>
        )}
      </div>
    </div>
  );
}

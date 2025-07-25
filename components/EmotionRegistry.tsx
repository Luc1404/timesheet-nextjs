'use client';
import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from './createEmotionCache';

export default function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(() => createEmotionCache());
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  useServerInsertedHTML(() => {
    // Lấy tất cả các style đã được chèn từ cache
    const styles = Object.entries(cache.inserted)
      .filter(([key, value]) => typeof value === 'string')
      .map(([key, value]) => (
        <style
          key={key}
          data-emotion={`css ${key}`}
          dangerouslySetInnerHTML={{ __html: value as string }}
        />
      ));
    return <>{styles}</>;
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
} 
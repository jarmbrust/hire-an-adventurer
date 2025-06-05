'use client';

import { useEffect } from 'react';
import Button from '@/app/ui/button';

export default function AdventurerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Adventurer Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Failed to load specific adventurer!</h2>
      <Button
        onClick={reset}
        className="px-4 py-2"
      >
        Try again
      </Button>
    </div>
  );
}

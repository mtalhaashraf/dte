import { useCallback, useEffect, useState } from 'react';
import { Engagement } from '../types';

const STORAGE_KEY = 'dte_engagements';

export function useLocalStorage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getEngagement = useCallback((engagementId: string): Engagement | null => {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_${engagementId}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }, []);

  const saveEngagement = useCallback((engagement: Engagement): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(
        `${STORAGE_KEY}_${engagement.id}`,
        JSON.stringify(engagement)
      );
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, []);

  const clearEngagement = useCallback((engagementId: string): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(`${STORAGE_KEY}_${engagementId}`);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }, []);

  const getAllStoredEngagements = useCallback((): Record<string, Engagement> => {
    if (typeof window === 'undefined') return {};

    try {
      const result: Record<string, Engagement> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(STORAGE_KEY)) {
          const engagement = localStorage.getItem(key);
          if (engagement) {
            const parsed = JSON.parse(engagement);
            result[parsed.id] = parsed;
          }
        }
      }
      return result;
    } catch (error) {
      console.error('Error reading all from localStorage:', error);
      return {};
    }
  }, []);

  const resetAll = useCallback((): void => {
    if (typeof window === 'undefined') return;

    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(STORAGE_KEY)) {
          keys.push(key);
        }
      }
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error resetting localStorage:', error);
    }
  }, []);

  return {
    isClient,
    getEngagement,
    saveEngagement,
    clearEngagement,
    getAllStoredEngagements,
    resetAll
  };
}

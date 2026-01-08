import { useEffect, useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const useRecaptcha = () => {
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSiteKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-recaptcha-site-key');
        if (!error && data?.siteKey) {
          setSiteKey(data.siteKey);
          
          // Load reCAPTCHA script
          if (!document.querySelector('script[src*="recaptcha"]')) {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${data.siteKey}`;
            script.async = true;
            document.head.appendChild(script);
          }
        }
      } catch (error) {
        console.error('Failed to fetch reCAPTCHA site key:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiteKey();
  }, []);

  const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
    if (!siteKey) {
      console.warn('reCAPTCHA site key not available');
      return null;
    }

    return new Promise((resolve) => {
      const attemptExecute = () => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute(siteKey, { action });
              resolve(token);
            } catch (error) {
              console.error('reCAPTCHA execution error:', error);
              resolve(null);
            }
          });
        } else {
          setTimeout(attemptExecute, 500);
        }
      };
      attemptExecute();
    });
  }, [siteKey]);

  const verifyToken = useCallback(async (token: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-recaptcha', {
        body: { token },
      });
      
      if (error) {
        console.error('reCAPTCHA verification error:', error);
        return false;
      }
      
      return data?.success ?? false;
    } catch (error) {
      console.error('reCAPTCHA verification failed:', error);
      return false;
    }
  }, []);

  return { executeRecaptcha, verifyToken, isLoading, isReady: !!siteKey };
};

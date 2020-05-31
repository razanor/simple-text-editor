import { useState, useEffect } from 'react';

import ISynonym from './ISynonym';

const useSynonyms = (words: string[], wordIndex: number | null) => {
  const [data, setData] = useState<ISynonym[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentWord = wordIndex && words[wordIndex];

  useEffect(() => {
    setError(null);
    const abortController = new AbortController();
    if (currentWord) {
      (async () => {
        setLoading(true);
        const response = await fetch(
          `https://api.datamuse.com/words?rel_syn=${currentWord}`,
          {
            headers: { 'Content-Type': 'application/json' },
            signal: abortController.signal,
          }
        ).catch((err) => {
          err.code !== 20 && setError(err);
        });

        if (response) {
          if (response.status >= 400 && response.status < 600) {
            setError(await response.json());
          } else {
            setData(await response.json());
          }
        }
        setLoading(false);
      })();
    }

    return () => {
      abortController.abort();
    };
  }, [currentWord]);

  return { data, loading, error };
};

export default useSynonyms;

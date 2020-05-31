import { useState } from 'react';
import StyleOptions from './styleOptions';

function useTextEditor() {
  const [currentWord, setCurrentWord] = useState<null | number>(null);
  const [underlineWords, setUnderlineWords] = useState<number[]>([]);
  const [boldWords, setBoldWords] = useState<number[]>([]);
  const [italicWords, setItalicWords] = useState<number[]>([]);
  const [wordsColor, setWordsColor] = useState<{ [key: string]: string }>({});

  const handleWordSelect = (index: number) => {
    setCurrentWord(index);
  };

  const handleApplyStyles = (style: StyleOptions) => {
    switch (style) {
      case StyleOptions.Bold:
        setBoldWords((words) => toggleStyle(words));
        break;
      case StyleOptions.Underline:
        setUnderlineWords((words) => toggleStyle(words));
        break;
      case StyleOptions.Italic:
        setItalicWords((words) => toggleStyle(words));
        break;
      default:
        break;
    }
  };

  const toggleStyle = (words: number[]) => {
    return words.includes(currentWord as number)
      ? [...words.filter((word) => word !== currentWord)]
      : [...words, currentWord as number];
  };

  return {
    currentWord,
    underlineWords,
    boldWords,
    italicWords,
    wordsColor,
    setWordsColor,
    handleWordSelect,
    handleApplyStyles,
  };
}

export default useTextEditor;

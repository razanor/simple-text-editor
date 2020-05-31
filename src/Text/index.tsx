import React, { CSSProperties } from 'react';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/styles';

interface IText {
  wordsArray: string[];
  currentWord: number | null;
  boldWords: number[];
  underlineWords: number[];
  italicWords: number[];
  wordsColor: { [key: string]: string };
  handleWordSelect: (index: number) => void;
}
const Text: React.FC<IText> = ({
  wordsArray,
  currentWord,
  boldWords,
  underlineWords,
  italicWords,
  wordsColor,
  handleWordSelect,
}) => {
  const classes = useStyles();

  const styleConfig = (index: number): Partial<CSSProperties> => ({
    textDecoration: underlineWords.includes(index) ? 'underline' : 'none',
    fontWeight: boldWords.includes(index) ? 'bold' : 'inherit',
    fontStyle: italicWords.includes(index) ? 'italic' : 'normal',
    color: wordsColor[index] || 'inherit',
  });

  return (
    <>
      {wordsArray &&
        wordsArray.map((word, i) => (
          <Box
            component='span'
            key={i}
            onClick={(e) => handleWordSelect(i)}
            className={`${classes.word} ${
              currentWord === i ? classes.selectedWord : ''
            }`}
            style={styleConfig(i)}
          >
            {' '}
            {word}
          </Box>
        ))}
    </>
  );
};

const useStyles = makeStyles(() => ({
  word: {
    cursor: 'pointer',
    fontSize: '1.6rem',
    letterSpacing: '0.1px',
    borderRadius: '10px',
    padding: '1px',
    '&:hover': {
      backgroundColor: '#bde0e5',
    },
  },
  selectedWord: {
    background: '#e5e5e5',
  },
}));

export default Text;

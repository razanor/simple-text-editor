import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import { Theme, makeStyles } from '@material-ui/core/styles';

import StyleOptions from '../useTextEditor/styleOptions';

interface IControlPanel {
  currentWord: number | null;
  boldWords: number[];
  underlineWords: number[];
  italicWords: number[];
  handleApplyStyles: (style: StyleOptions) => void;
}

const ControlPanel: React.FC<IControlPanel> = ({
  currentWord,
  boldWords,
  underlineWords,
  italicWords,
  handleApplyStyles,
}) => {
  const classes = useStyles();

  const castedCurrentWord = currentWord as number;
  const isBoldApplied = boldWords.includes(castedCurrentWord);
  const isUnderlineApplied = underlineWords.includes(castedCurrentWord);
  const isItalicApplied = italicWords.includes(castedCurrentWord);

  const disabled = currentWord === null;

  return (
    <Box className={classes.container}>
      <Button
        variant='contained'
        color='primary'
        disabled={disabled}
        startIcon={isBoldApplied && <CheckIcon />}
        onClick={() => handleApplyStyles(StyleOptions.Bold)}
        className={classes.btn}
      >
        Bold
      </Button>
      <Button
        variant='contained'
        color='primary'
        disabled={disabled}
        startIcon={isUnderlineApplied && <CheckIcon />}
        onClick={() => handleApplyStyles(StyleOptions.Underline)}
        className={classes.btn}
      >
        Underline
      </Button>
      <Button
        variant='contained'
        color='primary'
        disabled={disabled}
        startIcon={isItalicApplied && <CheckIcon />}
        onClick={() => handleApplyStyles(StyleOptions.Italic)}
        className={classes.btn}
      >
        Italic
      </Button>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  btn: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default ControlPanel;

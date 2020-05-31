import React from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/styles';

import ISynonym from '../useSynonyms/ISynonym';

interface ISynonyms {
  synonymsArray: ISynonym[] | null;
  handleSynonymClick: (synonym: string) => void;
}

const Synonyms: React.FC<ISynonyms> = ({
  synonymsArray,
  handleSynonymClick,
}) => {
  const classes = useStyles();

  return (
    <Paper component='ul' className={classes.paper}>
      {synonymsArray &&
        synonymsArray.map(({ word }, i) => {
          return (
            <li key={i}>
              <Chip
                label={word}
                className={classes.chip}
                onClick={() => handleSynonymClick(word)}
              />
            </li>
          );
        })}
    </Paper>
  );
};

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: '1em',
    margin: 0,
    minHeight: '8em',
  },
  chip: {
    margin: '1em',
    backgroundColor: '#90cafa',
    fontSize: '1rem',
  },
}));

export default Synonyms;

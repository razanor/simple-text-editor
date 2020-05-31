import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Theme, makeStyles } from '@material-ui/core/styles';

import ControlPanel from './ControlPanel';
import ColorPicker from './ColorPicker';
import Text from './Text';
import Synonyms from './Synonyms';
import useTextEditor from './useTextEditor';
import useSynonyms from './useSynonyms';
import getMockText from './text.service';

const App: React.FC = () => {
  const classes = useStyles();
  const [wordsArray, setWordsArray] = useState<string[]>([]);
  const {
    currentWord,
    boldWords,
    underlineWords,
    italicWords,
    wordsColor,
    handleApplyStyles,
    handleWordSelect,
    setWordsColor,
  } = useTextEditor();
  const { data: synonymsArray } = useSynonyms(wordsArray, currentWord);

  useEffect(() => {
    getMockText().then((data) => setWordsArray(data.split(' ')));
  }, []);

  const handleSynonymClick = (synonym: string) => {
    const updatedWordsArray = wordsArray.map((word, index) =>
      index === currentWord ? synonym : word
    );
    setWordsArray(updatedWordsArray);
  };

  return (
    <Container>
      <header className={classes.header}>
        <Typography variant='h2' className={classes.headerText}>
          Simple Text Editor
        </Typography>
      </header>
      <section className={classes.synonymsContainer}>
        <Synonyms
          synonymsArray={synonymsArray}
          handleSynonymClick={handleSynonymClick}
        />
      </section>
      <section className={classes.controlContainer}>
        <ControlPanel
          currentWord={currentWord}
          boldWords={boldWords}
          underlineWords={underlineWords}
          italicWords={italicWords}
          handleApplyStyles={handleApplyStyles}
        />
      </section>
      <main>
        <Text
          wordsArray={wordsArray}
          currentWord={currentWord}
          boldWords={boldWords}
          underlineWords={underlineWords}
          italicWords={italicWords}
          wordsColor={wordsColor}
          handleWordSelect={handleWordSelect}
        />
      </main>
      <ColorPicker currentWord={currentWord} setWordsColor={setWordsColor} />
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    marginBottom: '2em',
  },
  headerText: {
    textAlign: 'center',
  },
  controlContainer: {
    display: 'flex',
    justifyContent: 'left',
    marginBottom: '2em',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  synonymsContainer: {
    marginBottom: '2em',
  },
}));

export default App;

import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { SketchPicker, ColorResult } from 'react-color';

interface IColorPicker {
  currentWord: number | null;
  setWordsColor: (
    value: React.SetStateAction<{
      [key: string]: string;
    }>
  ) => void;
}

const ColorPicker: React.FC<IColorPicker> = ({
  currentWord,
  setWordsColor,
}) => {
  const [color, setColor] = useState('#000');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePickerChange = (color: ColorResult) => {
    setColor(color.hex);
    if (currentWord) {
      setWordsColor((prevWordsColor) => ({
        ...prevWordsColor,
        [currentWord.toString()]: color.hex,
      }));
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Box mt='2em' textAlign='right'>
        <Button
          aria-describedby={id}
          variant='outlined'
          color='primary'
          onClick={handleClick}
          disabled={currentWord === null}
        >
          Color Picker
        </Button>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <SketchPicker color={color} onChangeComplete={handlePickerChange} />
      </Popover>
    </>
  );
};

export default ColorPicker;

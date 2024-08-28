'use client';
import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const LanguageButton = () => {
  const [language, setLanguage] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };
  setLanguage;

  return (
    <FormControl sx={{ marginRight: 1, minWidth: 120 }} size="small">
      <InputLabel id="label">Language</InputLabel>
      <Select labelId="select-label" id="select" value={language} label="Language" onChange={handleChange}>
        <MenuItem value={'en'}>en</MenuItem>
        <MenuItem value={'ru'}>ru</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageButton;

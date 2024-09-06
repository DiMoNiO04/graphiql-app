'use client';

import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Locale } from '@/src/types/localesTypes';
import { useTranslations } from 'next-intl';

const LanguageButton = () => {
  const router = useRouter();
  const locale = useLocale();
  const [, setLanguage] = useState<string>('en');
  const t = useTranslations('MainPage');

  const handleChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  };

  const handleItemClick = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <FormControl sx={{ marginRight: 1, minWidth: 120 }} size="small">
      <InputLabel id="label">{t('language')}</InputLabel>
      <Select labelId="select-label" id="select" value={locale} label="Language" onChange={handleChange}>
        <MenuItem value={'en'} selected={locale === 'en'} onClick={() => handleItemClick('en')}>
          en
        </MenuItem>
        <MenuItem value={'ru'} selected={locale === 'ru'} onClick={() => handleItemClick('ru')}>
          ru
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageButton;

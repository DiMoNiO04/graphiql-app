'use client';

import { MenuItem, IconButton, Menu, Box } from '@mui/material';
import { localeNames, locales, usePathname, useRouter, type Locale } from '../../../i18n/i18n.config';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Language } from '@mui/icons-material';

export default function LanguageButton() {
  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations('MainPage');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton sx={{ color: '#000000' }} onClick={handleClick}>
        <Language />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {locales.map((locale) => (
          <MenuItem key={locale} value={locale} onClick={() => handleItemClick(locale)}>
            {localeNames[locale]}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

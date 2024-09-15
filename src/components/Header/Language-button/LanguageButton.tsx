import { usePathname, useRouter, type Locale } from '../../../i18n/i18n.config';
import React from 'react';
import { Globe } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/src/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';

export default function LanguageButton() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('MainPage');

  const handleItemClick = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  useHotkeys('ctrl+e', () => handleItemClick('en'), [handleItemClick]);
  useHotkeys('ctrl+r', () => handleItemClick('ru'), [handleItemClick]);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="text-black cursor-pointer hover:bg-[#18181B]/80 transition-all duration-300 ease-in-out hover:text-white p-2 rounded-md flex items-center ">
            <Globe size={25} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel> {t('language-choose')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleItemClick('en')}>
              {t('english')}
              <DropdownMenuShortcut>Ctrl+E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleItemClick('ru')}>
              {t('russian')}
              <DropdownMenuShortcut>Ctrl+R</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

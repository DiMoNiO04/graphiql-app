import Button from '@mui/material/Button';
import React from 'react';
import Link from 'next/link';
const BaseButton = ({ children, href }: { children: React.ReactNode; href?: string }) => {
  return (
    <Link
      href={href ?? ''}
      className={`bg-[#18181B] text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-[#18181B]/80 transition-all duration-300 font-medium`}
    >
      {children}
    </Link>
  );
};

export default BaseButton;

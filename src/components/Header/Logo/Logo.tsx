import Link from 'next/link';
import LogoImage from './LogoImage';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/">
      <LogoImage height={80} />
    </Link>
  );
};

export default Logo;

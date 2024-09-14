import React from 'react';
import HeaderClient from './HeaderClient';
import { getSession } from '../../lib/auth/getUserData';

const Header = async () => {
  const session = await getSession();

  return <HeaderClient session={session} />;
};

export default Header;

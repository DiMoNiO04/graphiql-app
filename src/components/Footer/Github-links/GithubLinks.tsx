import Stack from '@mui/material/Stack';
import { Avatar, Link } from '@mui/material';
import { developers } from '../../../constants/constants';
import React from 'react';

const GithubLinks = () => {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      {developers.map(({ href, imgSrc, imgAlt }, index) => (
        <Link key={index} href={href} target="_blank">
          <Avatar variant="rounded" src={imgSrc} alt={imgAlt} />
        </Link>
      ))}
    </Stack>
  );
};

export default GithubLinks;

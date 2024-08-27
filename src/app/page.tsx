import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import Paragraph from '../components/Typography/Paragraph';
import Heading from '../components/Typography/Heading';
import { developers } from '../constants/constants';
import TeamMemberCard from '../components/TeamMemberCard/TeamMemberCard';
import { messages } from '../locales/en';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '4rem 2.5rem',
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          textAlign: 'center',
          fontSize: '3rem',
          fontWeight: '900',
          color: '#266db6',
          paddingBottom: '2rem',
        }}
      >
        {messages.mainPage.greeting}
      </Typography>
      <Stack spacing={3}>
        <Stack>
          <Heading>{messages.mainPage.headings.project}</Heading>
          <Paragraph>{messages.mainPage.info.p1}</Paragraph>
          <Paragraph>{messages.mainPage.info.p2}</Paragraph>
          <Paragraph>{messages.mainPage.info.p3}</Paragraph>
          <Paragraph>{messages.mainPage.info.p4}</Paragraph>
        </Stack>
        <Stack>
          <Heading>{messages.mainPage.headings.course}</Heading>
          <Paragraph>{messages.mainPage.info.p5}</Paragraph>
          <Paragraph>{messages.mainPage.info.p6}</Paragraph>
        </Stack>
        <Stack>
          <Heading sx={{ textAlign: 'center' }}>{messages.mainPage.headings.team}</Heading>
          <Stack direction="row" gap="1.5rem" flexWrap="wrap" justifyContent="center">
            {developers.map(({ imgSrc, imgAlt, nameOfPerson, contribute }, index) => (
              <TeamMemberCard key={index} src={imgSrc} alt={imgAlt} name={nameOfPerson} contribution={contribute} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

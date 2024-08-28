import { Box, ButtonGroup, Stack, Typography } from '@mui/material';
import React from 'react';
import Paragraph from '../components/ui/Paragraph';
import Heading from '../components/ui/Heading';
import { developers } from '../constants/constants';
import TeamMemberCard from '../components/TeamMemberCard/TeamMemberCard';
import { messages } from '../locales/en';
import { getSession } from '../lib/auth/getUserData';
import BaseButton from '../components/ui/Button';

export default async function Home() {
  const user = await getSession();
  const name = user?.name || 'User';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '4rem 2.5rem',
      }}
    >
      {user?.name ? (
        <>
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
            {`${messages.mainPage.greeting} Back, ${name}!`}
          </Typography>
          <ButtonGroup
            sx={{
              marginBottom: '2rem',
              justifyContent: 'flex-end',
            }}
          >
            <BaseButton href="/graphiQL-client">GraphiQL Client</BaseButton>
            <BaseButton href="/rest-client">REST Client</BaseButton>
            <BaseButton href="/history">History</BaseButton>
          </ButtonGroup>
        </>
      ) : (
        <>
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
            {`${messages.mainPage.greeting}!`}
          </Typography>
          <ButtonGroup
            sx={{
              marginBottom: '2rem',
              justifyContent: 'flex-end',
            }}
          >
            <BaseButton href="/signin">Sign In</BaseButton>
            <BaseButton href="/signup">Sign up</BaseButton>
          </ButtonGroup>
        </>
      )}
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

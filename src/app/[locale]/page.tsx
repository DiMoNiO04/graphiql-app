import { Box, ButtonGroup, Stack, Typography } from '@mui/material';
import React from 'react';
import Paragraph from '../../components/ui/Paragraph';
import Heading from '../../components/ui/Heading';
import { developers } from '../../constants/constants';
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';
import BaseButton from '../../components/ui/Button';
import { getTranslations } from 'next-intl/server';
import { getSession } from '@/src/lib/auth/getUserData';
import SessionHandler from '@/src/components/auth/SessionHandler';

export default async function Home() {
  const session = await getSession();
  const t = await getTranslations('MainPage');

  return session.expired ? (
    <SessionHandler />
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '4rem 2.5rem',
      }}
    >
      {session?.user?.name ? (
        <>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: 'inherit',
              textAlign: 'center',
              fontSize: '3.2rem',
              fontWeight: '900',
              color: '#266db6',
              paddingBottom: '2rem',
            }}
          >
            {t('greeting-auth')} {`, ${session?.user?.name}!`}
          </Typography>
          <ButtonGroup
            sx={{
              marginBottom: '2rem',
              justifyContent: 'flex-end',
              gap: '0.5rem',
            }}
          >
            <BaseButton href="/graphQL-client">{t('graphQL-client')}</BaseButton>
            <BaseButton href="/rest-client">{t('rest-client')}</BaseButton>
            <BaseButton href="/history">{t('history')}</BaseButton>
          </ButtonGroup>
        </>
      ) : (
        <>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              textAlign: 'center',
              fontSize: '3.2rem',
              fontWeight: '900',
              color: '#266db6',
              paddingBottom: '2rem',
            }}
          >
            {t('greeting')}
            {'!'}
          </Typography>
          <ButtonGroup
            sx={{
              marginBottom: '2rem',
              justifyContent: 'flex-end',
              gap: '0.5rem',
            }}
          >
            <BaseButton href="/signin">{t('sign-in')}</BaseButton>
            <BaseButton href="/signup">{t('sign-up')}</BaseButton>
          </ButtonGroup>
        </>
      )}
      <Stack spacing={3}>
        <Stack>
          <Heading>{t('project')}</Heading>
          <Paragraph>{t('p1')}</Paragraph>
          <Paragraph>{t('p2')}</Paragraph>
          <Paragraph>{t('p3')}</Paragraph>
          <Paragraph>{t('p4')}</Paragraph>
        </Stack>
        <Stack>
          <Heading>{t('course')}</Heading>
          <Paragraph>{t('p5')}</Paragraph>
          <Paragraph>{t('p6')}</Paragraph>
        </Stack>
        <Stack>
          <Heading sx={{ textAlign: 'center' }}>{t('team')}</Heading>
          <Stack direction="row" gap="1.5rem" flexWrap="wrap" justifyContent="center">
            <TeamMemberCard
              src={developers[0].imgSrc}
              alt={developers[0].imgAlt}
              name={t('name-Yuliya')}
              contribution={t('contribute-Yuliya')}
            />
            <TeamMemberCard
              src={developers[1].imgSrc}
              alt={developers[1].imgAlt}
              name={t('name-Dmitriy')}
              contribution={t('contribute-Dmitriy')}
            />
            <TeamMemberCard
              src={developers[2].imgSrc}
              alt={developers[2].imgAlt}
              name={t('name-Maksym')}
              contribution={t('contribute-Maksym')}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

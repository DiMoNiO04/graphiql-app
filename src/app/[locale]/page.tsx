import { Box, ButtonGroup, Stack, Typography } from '@mui/material';
import React from 'react';
import Paragraph from '../../components/ui/Paragraph';
import Heading from '../../components/ui/Heading';
import { developers } from '../../constants/constants';
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';
import { getSession } from '../../lib/auth/getUserData';
import BaseButton from '../../components/ui/Button';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const user = await getSession();
  const name = user?.name || 'User';
  const t = await getTranslations('MainPage');

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
            {t('greeting-auth')} {`, ${name}!`}
          </Typography>
          <ButtonGroup
            sx={{
              marginBottom: '2rem',
              justifyContent: 'flex-end',
            }}
          >
            <BaseButton href="/graphiQL-client">{t('graphiQL-client')}</BaseButton>
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
              fontSize: '3rem',
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
            }}
          >
            <BaseButton href="/signin">{t('auth.sign-in')}</BaseButton>
            <BaseButton href="/signup">{t('auth.sign-up')}</BaseButton>
          </ButtonGroup>
        </>
      )}
      <Stack spacing={3}>
        <Stack>
          <Heading>{t('headings.project')}</Heading>
          <Paragraph>{t('info.p1')}</Paragraph>
          <Paragraph>{t('info.p2')}</Paragraph>
          <Paragraph>{t('info.p3')}</Paragraph>
          <Paragraph>{t('info.p4')}</Paragraph>
        </Stack>
        <Stack>
          <Heading>{t('headings.course')}</Heading>
          <Paragraph>{t('info.p5')}</Paragraph>
          <Paragraph>{t('info.p6')}</Paragraph>
        </Stack>
        <Stack>
          <Heading sx={{ textAlign: 'center' }}>{t('headings.team')}</Heading>
          <Stack direction="row" gap="1.5rem" flexWrap="wrap" justifyContent="center">
            <TeamMemberCard
              src={developers[0].imgSrc}
              alt={developers[0].imgAlt}
              name={t('developers.names.Yuliya')}
              contribution={t('developers.contribute.Yuliya')}
            />
            <TeamMemberCard
              src={developers[1].imgSrc}
              alt={developers[1].imgAlt}
              name={t('developers.names.Dmitriy')}
              contribution={t('developers.contribute.Dmitriy')}
            />
            <TeamMemberCard
              src={developers[2].imgSrc}
              alt={developers[2].imgAlt}
              name={t('developers.names.Maksym')}
              contribution={t('developers.contribute.Maksym')}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

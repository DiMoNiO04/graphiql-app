'use client';

import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSignInSchema } from '../../../validation/authValidation';
import Link from 'next/link';
import { useSignInUser } from '../../../../lib/auth/useSignInUser';
import { useTranslations } from 'next-intl';

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSignInSchema),
    mode: 'all',
  });

  const t = useTranslations('MainPage');
  const { handleSignIn } = useSignInUser();

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          {t('greeting-auth')}
          {'!'}
        </Typography>
        <p
          style={{
            fontSize: '15px',
            fontWeight: 400,
            textAlign: 'center',
            marginTop: '10px',
            color: 'rgba(0, 0, 0, 0.54)',
          }}
        >
          {t('phrase')}
        </p>
        <Box component="form" noValidate onSubmit={handleSubmit(handleSignIn)} sx={{ mt: 1 }}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('email')}
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email ? <>{t(errors.email.message)}</> : null}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label={t('password')}
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password ? <>{t(errors.password.message)}</> : null}
              />
            )}
          />
          <Button
            type="submit"
            data-testid="button-submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              transition: 'all 0.4s ease',
              mb: 2,
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                color: 'black',
                backgroundColor: 'white',
              },
            }}
          >
            {t('sign-in')}
          </Button>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 400,
              textAlign: 'center',
              marginTop: '10px',
              color: 'rgba(0, 0, 0, 0.54)',
            }}
          >
            {t('no-account')}{' '}
            <Link href="/signup" style={{ color: 'black' }}>
              {t('sign-up')}
            </Link>
          </p>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;

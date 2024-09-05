'use client';

import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSignUpSchema } from '../../../validation/authValidation';
import { useSignUpUser } from '@/src/lib/auth/useSignUpUser';
import { useTranslations } from 'next-intl';
// import { useSignUpUser } from '@/src/lib/auth/useSignUpUser';

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSignUpSchema),
    mode: 'all',
  });

  const t = useTranslations('MainPage');
  const { onSubmit } = useSignUpUser();

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
          {t('auth.create-account')}
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
          {t('auth.journey')}
        </p>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="username"
                label={t('auth.username')}
                autoComplete="username"
                // autoFocus add or not?
                error={!!errors.username}
                helperText={errors.username ? <>{t(errors.username.message)}</> : null}
              />
            )}
          />
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
                label={t('auth.email')}
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
                label={t('auth.password')}
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password ? <>{t(errors.password.message)}</> : null}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label={t('auth.confirmPassword')}
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword ? <>{t(errors.confirmPassword.message)}</> : null}
              />
            )}
          />
          <Button
            type="submit"
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
            {t('auth.sign-up')}
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
            {t('auth.have-account')} {''}
            <Link href="/signin" style={{ color: 'black', textDecoration: 'none' }}>
              {t('auth.sign-in')}
            </Link>
          </p>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;

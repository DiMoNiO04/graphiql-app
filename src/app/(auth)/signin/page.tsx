'use client';

import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSignInSchema } from '../../validation/authValidation';
import { auth } from '@/src/app/firebase/config';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import Link from 'next/link';
import { AuthFormData } from '@/src/types/authTypes';
const SignIn = () => {
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSignInSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async (data: AuthFormData) => {
    console.log('handleSignIn called', data);
    const { email, password } = data;
    try {
      console.log('Attempting to sign in');
      const res = await signInWithEmailAndPassword(email, password);
      console.log('Sign in response:', res);
    } catch (e) {
      console.error('Error during sign in:', e);
    }
  };

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
          Welcome back!
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
          We are happy to see you again! Sign in to your account to continue
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
                label="Email Address"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
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
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password?.message}
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
            Sign In
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
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: 'black' }}>
              Sign Up
            </Link>
          </p>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;

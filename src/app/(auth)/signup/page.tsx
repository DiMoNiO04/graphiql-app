'use client';

import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSignUpSchema } from '../../validation/authValidation';
import { auth } from '@/src/app/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthFormData } from '@/src/types/authTypes';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSignUpSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: AuthFormData) => {
    console.log(data);
    try {
      const { email, password, username } = data;
      console.log(email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // await setDoc(doc(db, 'users', user.uid), {
      //   username,
      //   email,
      // });
      toast.success('Account created successfully');
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } catch (error) {
      console.log('Unexpected error:', error);
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
          Create an account
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
          New here? Sign up and begin your journey
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
                label="Username"
                autoComplete="username"
                // autoFocus add or not?
                error={!!errors.username}
                helperText={errors.username?.message}
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
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
            Sign Up
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
            Already have an account? {''}
            <Link href="/signin" style={{ color: 'black', textDecoration: 'none' }}>
              Sign In
            </Link>
          </p>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;

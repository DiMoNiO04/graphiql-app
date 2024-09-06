import * as yup from 'yup';

export const authSignUpSchema = yup.object().shape({
  username: yup.string().required('validation.user-required').min(3, 'validation.user-length'),
  email: yup.string().required('validation.email').email('validation.email-format'),
  password: yup.string().required('validation.password-required').min(8, 'validation.password-length'),
  confirmPassword: yup
    .string()
    .required('validation.confirm-required')
    .oneOf([yup.ref('password')], 'validation.passwords-match'),
});

export const authSignInSchema = yup.object().shape({
  email: yup.string().required('validation.email').email('validation.email-format'),
  password: yup.string().required('validation.password-required').min(8, 'validation.password-length'),
});

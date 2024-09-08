import * as yup from 'yup';

export const authSignUpSchema = yup.object().shape({
  username: yup.string().required('user-required').min(3, 'user-length'),
  email: yup.string().required('email-required').email('email-format'),
  password: yup.string().required('password-required').min(8, 'password-length'),
  confirmPassword: yup
    .string()
    .required('confirm-required')
    .oneOf([yup.ref('password')], 'passwords-match'),
});

export const authSignInSchema = yup.object().shape({
  email: yup.string().required('email-required').email('email-format'),
  password: yup.string().required('password-required').min(8, 'password-length'),
});
